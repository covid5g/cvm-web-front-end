import React, {useRef} from "react";
import GoogleMapReact from "google-map-react";
import useSupercluster from "use-supercluster";
import LoadingAnimation from "./LoadingAnimation";
import {usePosition} from "../hooks/usePosition";
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import clsx from 'clsx';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {green, orange, red} from "@material-ui/core/colors";
import {AppState} from "../store";
import {connect} from "react-redux";
import {MapState} from "../reducers/map";
import {setMapBounds, setMapPosition, setMapZoom} from "../actions/map";
import {fetchMapMarkersThunk, fetchPlacesThunk} from "../thunks/map";
import PersonPinIcon from '@material-ui/icons/PersonPin';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';
import LocalPharmacyIcon from '@material-ui/icons/LocalPharmacy';

// @ts-ignore
// noinspection JSUnusedLocalSymbols
const Marker = ({children, lat, lng}) => children;

// noinspection TypeScriptValidateJSTypes
const useStyles = makeStyles(theme => ({
    mapIcon: {
        width: 25
    },
    cluster: {
        color: theme.palette.text.primary,
        background: orange.A700,
        borderRadius: "50%",
        padding: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    mapIconSafe: {
        color: green.A700
    },
    mapIconDanger: {
        color: red.A700,
    },
    mapIconWarning: {
        color: orange.A700,
    },
    mapIconUser: {
        color: theme.palette.primary.main
    }
}));

interface MapProps {
    map: MapState
    dispatch: (arg0: any) => void
}

const Map = ({map, dispatch}: MapProps) => {
    const classes = useStyles();
    const mapRef = useRef();
    const {latitude, longitude, error} = usePosition(true, {
        maximumAge: 10000,
        timeout: Infinity,
        enableHighAccuracy: true
    });

    if (map.markersLoaded === false && latitude !== null && longitude !== null && error === null) {
        dispatch(setMapPosition({latitude, longitude}));
        dispatch(fetchMapMarkersThunk({latitude, longitude}));
    }

    if (map.placesLoaded === false && latitude !== null && longitude !== null && error === null) {
        dispatch(fetchPlacesThunk({latitude, longitude}));
    }

    // @ts-ignore
    const points = map.markers.map(marker => ({
        type: "Feature",
        properties: {cluster: false, isDanger: marker.isDanger, isUser: false, category: "infection"},
        geometry: {
            type: "Point",
            coordinates: [
                marker.longitude,
                marker.latitude
            ]
        }
    }));

    let userMarker = null;
    if (latitude !== null && longitude !== null && error === null) {
        userMarker = {
            type: "Feature",
            properties: {cluster: false, isDanger: false, category: "user"},
            geometry: {
                type: "Point",
                coordinates: [
                    longitude,
                    latitude
                ]
            }
        };
    }

    const {clusters, supercluster} = useSupercluster({
        points,
        bounds: map.bounds,
        zoom: map.zoom,
        options: {radius: 75, maxZoom: 20}
    });

    const apiKey = process.env.REACT_APP_GOOGLE_KEY || '';
    //"https://www.google.com/maps/dir/?api=1&travelmode=driving&layer=traffic&destination=[YOUR_LAT],[YOUR_LNG]"
    if (!error && map.markers.length && latitude && longitude) {
        return (
            <GoogleMapReact
                bootstrapURLKeys={{key: apiKey}}
                defaultCenter={{lat: latitude, lng: longitude}}
                defaultZoom={map.zoom}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({map}) => {
                    mapRef.current = map;
                }}
                onChange={({zoom, bounds}) => {
                    dispatch(setMapZoom(zoom));
                    dispatch(setMapBounds([
                        bounds.nw.lng,
                        bounds.se.lat,
                        bounds.se.lng,
                        bounds.nw.lat
                    ]));
                }}
            >
                {clusters.map((cluster, key) => {
                    const [longitude, latitude] = cluster.geometry.coordinates;
                    const {
                        isDanger,
                        cluster: isCluster,
                        point_count: pointCount
                    } = cluster.properties;

                    if (isCluster) {
                        return (
                            <Marker
                                lat={latitude}
                                lng={longitude}
                                key={`cluster-${cluster.id}`}
                            >
                                <div
                                    className={classes.cluster}
                                    style={{
                                        width: `${10 + (pointCount / points.length) * 20}px`,
                                        height: `${10 + (pointCount / points.length) * 20}px`
                                    }}
                                    onClick={() => {
                                        const expansionZoom = Math.min(
                                            supercluster.getClusterExpansionZoom(cluster.id),
                                            20
                                        );
                                        // @ts-ignore
                                        mapRef.current.setZoom(expansionZoom);
                                        // @ts-ignore
                                        mapRef.current.panTo({lat: latitude, lng: longitude});
                                    }}
                                >
                                    {pointCount}
                                </div>
                            </Marker>
                        );
                    }

                    return (
                        <Marker
                            lat={latitude}
                            lng={longitude}
                            key={key}
                        >
                            <NewReleasesIcon
                                className={clsx(classes.mapIcon, !isDanger && classes.mapIconWarning, isDanger && classes.mapIconDanger)}/>
                        </Marker>
                    );
                })}
                {userMarker !== null && <Marker
                    lat={userMarker.geometry.coordinates[1]}
                    lng={userMarker.geometry.coordinates[0]}
                    key={"user-icon"}
                >
                    <PersonPinIcon className={clsx(classes.mapIcon, classes.mapIconUser)}/>
                </Marker>}

                {map.hospitals !== null && map.hospitals.map((entry) => {
                    return (
                        <Marker
                            lat={entry.geometry.location.lat}
                            lng={entry.geometry.location.lng}
                            key={entry.place_id}
                        >
                            <LocalHospitalIcon
                                className={clsx(classes.mapIcon, entry.iconStatus === "ok" && classes.mapIconSafe, entry.iconStatus === "some" && classes.mapIconWarning, entry.iconStatus === "crowded" && classes.mapIconDanger)}/>
                        </Marker>
                    );
                })}
                {map.stores !== null && map.stores.map((entry) => {
                    return (
                        <Marker
                            lat={entry.geometry.location.lat}
                            lng={entry.geometry.location.lng}
                            key={entry.place_id}
                        >
                            <LocalGroceryStoreIcon
                                className={clsx(classes.mapIcon, entry.iconStatus === "ok" && classes.mapIconSafe, entry.iconStatus === "some" && classes.mapIconWarning, entry.iconStatus === "crowded" && classes.mapIconDanger)}/>
                        </Marker>
                    );
                })}
                {map.pharmacies !== null && map.pharmacies.map((entry) => {
                    return (
                        <Marker
                            lat={entry.geometry.location.lat}
                            lng={entry.geometry.location.lng}
                            key={entry.place_id}
                        >
                            <LocalPharmacyIcon
                                className={clsx(classes.mapIcon, entry.iconStatus === "ok" && classes.mapIconSafe, entry.iconStatus === "some" && classes.mapIconWarning, entry.iconStatus === "crowded" && classes.mapIconDanger)}/>
                        </Marker>
                    );
                })}
            </GoogleMapReact>
        );
    }

    return <LoadingAnimation/>
};

const mapStateToProps = (state: AppState) => ({
    map: state.map
});

export default connect(mapStateToProps)(Map);

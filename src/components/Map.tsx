import React, {useState, useRef} from "react";
import GoogleMapReact from "google-map-react";
import useSupercluster from "use-supercluster";
import axios from "axios";
// @ts-ignore
import LoadingAnimation from "./LoadingAnimation";
import "./Map.css"
import {usePosition} from "../hooks/usePosition";

// @ts-ignore
const Marker = ({children, lat, lng}) => children;

export default function Map() {
    const mapRef = useRef();
    const [crimes, setCrimes] = useState(null);
    const [bounds, setBounds] = useState([] as Array<Number>);
    const [zoom, setZoom] = useState(10);
    const {latitude, longitude} = usePosition(true, {maximumAge: 10000, timeout: Infinity, enableHighAccuracy: false});
    console.log(latitude, longitude);

    const url =
        "https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=2019-10";

    if (crimes === null) {
        axios.get(url).then(response => setCrimes(response.data.slice(0, 2000)));
    }

    // @ts-ignore
    const points = crimes !== null ? crimes.map(crime => ({
        type: "Feature",
        properties: {cluster: false, crimeId: crime.id, category: crime.category},
        geometry: {
            type: "Point",
            coordinates: [
                parseFloat(crime.location.longitude),
                parseFloat(crime.location.latitude)
            ]
        }
    })) : [];

    const {clusters, supercluster} = useSupercluster({
        points,
        bounds,
        zoom,
        options: {radius: 75, maxZoom: 20}
    });

    const apiKey = process.env.REACT_APP_GOOGLE_KEY || '';

    if (crimes && latitude && longitude) {
        return (
            <GoogleMapReact
                bootstrapURLKeys={{key: apiKey}}
                defaultCenter={{lat: latitude, lng: longitude}}
                defaultZoom={10}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({map}) => {
                    mapRef.current = map;
                }}
                onChange={({zoom, bounds}) => {
                    setZoom(zoom);
                    setBounds([
                        bounds.nw.lng,
                        bounds.se.lat,
                        bounds.se.lng,
                        bounds.nw.lat
                    ]);
                }}
            >
                {clusters.map(cluster => {
                    const [longitude, latitude] = cluster.geometry.coordinates;
                    const {
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
                                    className="cluster-marker"
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
                            key={`crime-${cluster.properties.crimeId}`}
                        >
                            <button className="crime-marker">
                                <img src="/custody.svg" alt="crime doesn't pay"/>
                            </button>
                        </Marker>
                    );
                })}
            </GoogleMapReact>
        );
    }

    return <LoadingAnimation/>
}

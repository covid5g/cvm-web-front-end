import React, {useState, useRef} from "react";
import useSwr from "swr";
import GoogleMapReact from "google-map-react";
import useSupercluster from "use-supercluster";
import axios from "axios";
// @ts-ignore
import {usePosition} from 'use-position';
import LoadingAnimation from "./LoadingAnimation";
import "./Map.css"

const fetcher = (url: string) => axios.get(url).then(response => response.data);

// @ts-ignore
const Marker = ({children, lat, lng}) => children;

export default function Map() {
    const mapRef = useRef();
    const [bounds, setBounds] = useState([] as Array<Number>);
    const [zoom, setZoom] = useState(10);
    const positionData = usePosition(true, {maximumAge: 0, timeout: 0, enableHighAccuracy: true});

    const url =
        "https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=2019-10";
    const {data, error} = useSwr(url, {fetcher});
    // @ts-ignore
    console.log(data);
    const crimes = data && !error ? data.slice(0, 2000) : [];
    // @ts-ignore
    const points = crimes.map(crime => ({
        type: "Feature",
        properties: {cluster: false, crimeId: crime.id, category: crime.category},
        geometry: {
            type: "Point",
            coordinates: [
                parseFloat(crime.location.longitude),
                parseFloat(crime.location.latitude)
            ]
        }
    }));

    const {clusters, supercluster} = useSupercluster({
        points,
        bounds,
        zoom,
        options: {radius: 75, maxZoom: 20}
    });

    const apiKey = process.env.REACT_APP_GOOGLE_KEY || '';

    if (positionData.latitude && positionData.longitude) {
        return (
            <GoogleMapReact
                bootstrapURLKeys={{key: apiKey}}
                defaultCenter={{lat: positionData.latitude, lng: positionData.longitude}}
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

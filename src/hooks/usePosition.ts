import {useState, useEffect} from 'react';

interface Position {
    latitude: number | null,
    longitude: number | null,
    accuracy: number | null,
}

const defaultSettings = {
    enableHighAccuracy: false,
    timeout: Infinity,
    maximumAge: 0,
};

export const usePosition = (watch = false, settings = defaultSettings) => {
    const [position, setPosition] = useState<Position>({latitude: null, longitude: null, accuracy: null});
    const [error, setError] = useState<null | string>(null);

    useEffect(() => {
        // @ts-ignore
        const onChange = ({coords}) => {
            if (position.latitude !== coords.latitude || position.longitude !== coords.longitude) {
                console.log("Changes");
                setPosition({
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                    accuracy: coords.accuracy,
                });
            }
        };

        // @ts-ignore
        const onError = (error) => {
            setError(error.message);
        };

        const geo = navigator.geolocation;
        if (!geo) {
            setError('Geolocation is not supported');
            return;
        }

        // @ts-ignore
        let watcher = null;
        if (watch) {
            watcher = geo.watchPosition(onChange, onError, settings);
        } else {
            geo.getCurrentPosition(onChange, onError, settings);
        }

        // @ts-ignore
        return () => watcher && geo.clearWatch(watcher);
    }, [position.latitude, position.longitude, settings, watch]);

    return {...position, error};
};
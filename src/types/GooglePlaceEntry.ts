export interface LatLong {
    lat: number,
    lng: number
}

export interface Geometry {
    location: LatLong
}

export interface GooglePlaceEntry {
    geometry: Geometry
    name: string,
    place_id: string
}
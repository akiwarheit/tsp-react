import { useEffect, useState } from "react";
import { LatLng } from "./useTodo";

export default function useReverseGeocode(latlng: LatLng) {
    const [address, setAddress] = useState(`${latlng.lat}, ${latlng.lng}`)

    useEffect(() => {
        fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latlng.lat}&lon=${latlng.lng}`,
            {
                method: 'GET',
                headers: {
                    'User-Agent': 'Travelling Salesman Problem',
                },
            }
        ).then(async res => {
            const data = await res.json()
            setAddress(data["display_name"])
        }).catch(error => {
            console.error("something went wrong")
        })
    }, [latlng.lat, latlng.lng])

    return address
}
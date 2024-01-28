'use client'

import { Todo } from "@/hooks/useTodo"
import { LatLng } from "leaflet"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import "leaflet/dist/leaflet.css"
import { MapContainer, Marker, TileLayer } from "react-leaflet"

export default function Map(props: { position: LatLng, zoom: number, todos: Todo[] }) {
    const { position, zoom, todos } = props

    return <MapContainer center={position} zoom={zoom} scrollWheelZoom={false}
        style={{
            height: '60vh',
            width: '60vw'
        }}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {todos.map((todo, idx) => <Marker key={idx} position={todo.location} />)}
    </MapContainer>
}
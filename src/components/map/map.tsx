'use client'

import { Todo } from "@/hooks/useTodo"
import { LatLng, LeafletMouseEvent } from "leaflet"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import "leaflet/dist/leaflet.css"
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet"

interface AddTodoProps {
    onClick: (latlng: LatLng) => void
}

function AddTodo({ onClick }: AddTodoProps) {
    const map = useMapEvents({
        click(event: LeafletMouseEvent) {
            if (event.latlng) {
                onClick(event.latlng)
            }
        }
    })

    return null
}

export default function Map(props: { position: LatLng, zoom: number, todos: Todo[], onClick: (latlng: LatLng) => void }) {
    const { position, zoom, todos, onClick } = props

    return <MapContainer center={position} zoom={zoom} scrollWheelZoom={false}
        style={{
            height: '70vh',
            width: '93vw'
        }}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {todos.map((todo, idx) => <Marker key={idx} position={todo.location} />)}
        <AddTodo onClick={onClick} />
    </MapContainer>
}
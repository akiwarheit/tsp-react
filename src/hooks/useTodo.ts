interface LatLng {
    lat: number;
    lng: number;
}

export interface Todo {
    description: string
    location: LatLng;
}

const examples = require("./todo.json")

export default function useTodo() {
    return examples;
}
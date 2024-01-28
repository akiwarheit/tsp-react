import { useCallback, useState } from "react";

interface LatLng {
    lat: number;
    lng: number;
}

export interface Todo {
    description: string
    location: LatLng;
    status: "scheduled" | "todo" | "done"
}

const examples = require("./todo.json") as Todo[]

export default function useTodo() {
    const [todos, setTodos] = useState(examples)

    const add = useCallback((todo: Todo) => {
        const newTodos = [...todos, todo]
        setTodos(newTodos)
    }, [todos])

    const remove = useCallback((todo: Todo) => {
        const newTodos = todos.filter(p => p.description !== todo.description && p.location.lat !== todo.location.lat && p.location.lng !== todo.location.lng && p.status !== todo.status)
        setTodos(newTodos)
    }, [todos])


    return {
        todos,
        remove,
        add
    };
}
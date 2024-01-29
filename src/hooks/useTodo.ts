import { useCallback, useState } from "react";
import { v1 as uuid } from "uuid";

export interface LatLng {
    lat: number;
    lng: number;
}

export interface Todo {
    id: string;
    description: string
    location: LatLng;
    status: "scheduled" | "todo" | "done"
}

const examples = require("./todo.json") as Todo[]

export default function useTodo() {
    const [todos, setTodos] = useState(examples)

    const add = useCallback((todo: Partial<Todo>) => {
        const newTodos = [...todos, { ...todo, id: uuid() }]
        setTodos(newTodos as Todo[])
    }, [todos])

    const remove = useCallback((todo: Todo) => {
        const newTodos = todos.filter(pred => pred.id !== todo.id)
        setTodos(newTodos)
    }, [todos])

    const edit = useCallback((todo: Partial<Todo>) => {
        const { id } = todo
        const newTodos = todos.filter(pred => pred.id !== id)
        setTodos([...newTodos, todo] as Todo[])
    }, [todos])


    return {
        todos,
        remove,
        add,
        edit
    };
}
import { Todo } from "@/hooks/useTodo";
import { Button, Card, Col, Flex, Grid, Text, Title, Tracker } from "@tremor/react";
import { User } from "firebase/auth";
import { useMemo } from "react";


interface Props {
    user: User;
    todos: Todo[];
    onSignOut: () => void;
}

const COLOR_STATUS_MAP = {

    "done": "emerald",
    "todo": "rose",
    "scheduled": "yellow"
}

export default function Header({ user, todos, onSignOut }: Props) {
    const data = useMemo(() => {
        return todos.map(todo => ({ color: COLOR_STATUS_MAP[todo.status], tooltip: `${todo.description} - ${todo.status}` }))
    }, [todos])

    const completion = useMemo(() => {
        return todos.filter(todo => todo.status !== "done").length / todos.length * 100
    }, [todos])

    return <Flex flexDirection="row" className="mb-4 p-5">
        <Title>Welcome, {user.displayName}</Title>
        <Button variant="secondary" onClick={onSignOut}>Sign Out</Button>
    </Flex>
}
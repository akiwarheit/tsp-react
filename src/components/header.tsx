import { Todo } from "@/hooks/useTodo";
import { Card, Col, Flex, Grid, Text, Title, Tracker } from "@tremor/react";
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

    return <Grid numItems={6}>
        <Col numColSpan={6} className="mb-10 p-5">
            <Flex flexDirection="row">
                <Title>Welcome, {user.displayName}</Title>
                <button onClick={onSignOut}>Sign Out</button>
            </Flex>
        </Col>
        <Col numColSpan={6}>
            <Card>
                <Title>Status</Title>
                <Text>{new Date().toLocaleDateString('en-AU')}</Text>
                <Flex justifyContent="end" className="mt-4">
                    <Text>{completion}%</Text>
                </Flex>
                <Tracker data={data} className="mt-2" />
            </Card>
        </Col>
    </Grid>
}
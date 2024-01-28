import { Todo } from "@/hooks/useTodo";
import { Badge, BadgeDelta, Card, Flex, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Title } from "@tremor/react";
import { useMemo } from "react";

interface Props {
    todos: Todo[]
    remove: (todo: Todo) => void
}

function Status({ status }: { status: string }) {
    const type = useMemo(() => {
        if (status === 'scheduled') {
            return 'yellow'
        } else if (status === 'done') {
            return 'green'
        } else if (status === 'todo') {
            return 'orange'
        }
    }, [status])

    return <Badge color={type}>{status}</Badge>
}


export default function TodosList({ todos, remove }: Props) {
    return <Card>
        <Flex flexDirection="row" className="mb-6">
            <Title>Todos List</Title>
            <a className="hover:cursor-pointer mr-6">Add</a>
        </Flex>
        <Table>
            <TableHead>
                <TableRow>
                    <TableHeaderCell>Description</TableHeaderCell>
                    <TableHeaderCell>Location</TableHeaderCell>
                    <TableHeaderCell>Status</TableHeaderCell>
                    <TableHeaderCell>Control</TableHeaderCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {todos.map((todo: Todo, idx: number) => (
                    <TableRow key={idx}>
                        <TableCell>{todo.description}</TableCell>
                        <TableCell>{`${todo.location.lat}, ${todo.location.lng}`}</TableCell>
                        <TableCell><Status status={todo.status} /></TableCell>
                        <TableCell><button onClick={() => remove(todo)}>Delete</button></TableCell>
                    </TableRow>)
                )}
            </TableBody>
        </Table>
    </Card>
}
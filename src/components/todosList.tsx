import { Todo } from "@/hooks/useTodo";
import { Badge, BadgeDelta, Card, Flex, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Title } from "@tremor/react";
import { useEffect, useMemo, useState } from "react";

interface Props {
    todos: Todo[]
    remove: (todo: Todo) => void
    edit: (todo: Todo) => void
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

function Row({ todo, remove, idx, edit }: { todo: Todo, remove: (todo: Todo) => void, idx: number, edit: (todo: Todo) => void }) {
    const [friendlyAddress, setFriendlyAddress] = useState(`${todo.location.lat}, ${todo.location.lng}`)
    useEffect(() => {
        fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${todo.location.lat}&lon=${todo.location.lng}`).then(async res => {
            const data = await res.json()
            console.log(data)
            setFriendlyAddress(data["display_name"])
        }).catch(error => {
            console.log("something went wrong")
        })
    }, [todo.location.lat, todo.location.lng])

    return <TableRow key={idx}>
        <TableCell>{todo.description}</TableCell>
        <TableCell className="truncate">{friendlyAddress}</TableCell>
        <TableCell><Status status={todo.status} /></TableCell>
        <TableCell>
            <Flex flexDirection="row" justifyContent="start">
                <button onClick={() => edit(todo)} className="mr-5">Edit</button>
                <button onClick={() => remove(todo)}>Delete</button>
            </Flex>
        </TableCell>
    </TableRow>
}


export default function TodosList({ todos, remove, edit }: Props) {
    return <Card>
        <Flex flexDirection="row" className="mb-6">
            <Title>Tasks</Title>
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
                {todos.map((todo: Todo, idx: number) => <Row key={idx} todo={todo} idx={idx} remove={remove} edit={edit} />)}
            </TableBody>
        </Table>
    </Card>
}
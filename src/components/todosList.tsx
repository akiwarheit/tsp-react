import useReverseGeocode from "@/hooks/useReverseGeocode";
import { Todo } from "@/hooks/useTodo";
import { Button, Card, Flex, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Title } from "@tremor/react";
import Status from "./status";
import { TrashIcon, PencilIcon } from "@heroicons/react/outline";

interface Props {
    todos: Todo[]
    remove: (todo: Todo) => void
    edit: (todo: Todo) => void
}

function Row({ todo, remove, idx, edit }: { todo: Todo, remove: (todo: Todo) => void, idx: number, edit: (todo: Todo) => void }) {
    const friendlyAddress = useReverseGeocode(todo.location)
    return <TableRow key={idx}>
        <TableCell>{todo.description}</TableCell>
        <TableCell className="truncate">{friendlyAddress}</TableCell>
        <TableCell><Status status={todo.status} /></TableCell>
        <TableCell>
            <Flex flexDirection="row" justifyContent="start">
                <Button icon={PencilIcon} variant="light" size="xs" onClick={() => edit(todo)} className="mr-5">Edit</Button>
                <Button icon={TrashIcon} variant="light" size="xs" onClick={() => remove(todo)}>Delete</Button>
            </Flex>
        </TableCell>
    </TableRow>
}

export default function TodosList({ todos, remove, edit }: Props) {
    return <Table>
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
}
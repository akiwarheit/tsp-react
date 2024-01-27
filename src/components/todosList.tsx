import { Todo } from "@/hooks/useTodo";
import { Card, Flex, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Title } from "@tremor/react";

interface Props {
    todos: Todo[]
}


export default function TodosList({ todos }: Props) {
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
                    <TableHeaderCell>Control</TableHeaderCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {todos.map((todo: Todo, idx: number) => (
                    <TableRow key={idx}>
                        <TableCell>{todo.description}</TableCell>
                        <TableCell>{`${todo.location.lat}, ${todo.location.lng}`}</TableCell>
                        <TableCell><a href="#">Delete</a></TableCell>
                    </TableRow>)
                )}
            </TableBody>
        </Table>
    </Card>
}
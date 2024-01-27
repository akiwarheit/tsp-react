import TodosList from "@/components/todosList";
import useTodo, { Todo } from "@/hooks/useTodo";
import { Card, Col, Flex, Grid, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Title } from "@tremor/react";
import { randomUUID } from "crypto";
import dynamic from "next/dynamic";
import { useMemo } from "react";

export default function Home() {
  const todos = useTodo()

  /**
   * Workaround
   */
  const Map = useMemo(() => dynamic(
    () => import('@/components/map'),
    {
      loading: () => <p>Loading</p>,
      ssr: false
    }
  ), [])

  return (
    <main className="flex min-h-screen flex-col p-6">
      <Grid numItems={6} className="gap-6">
        <Col numColSpan={2}>
          <TodosList todos={todos} />
        </Col>
        <Col numColSpan={4} >
          <Card>
            <Title>Maps</Title>
            <Map position={todos[0].location} zoom={12} todos={todos} />
          </Card>
        </Col>
      </Grid>
    </main>
  );
}

"use client"

import Authentication from "@/components/authentication";
import TodosList from "@/components/todosList";
import useAuthentication from "@/hooks/useAuthentication";
import useTodo from "@/hooks/useTodo";
import { Card, Col, Grid, Title } from "@tremor/react";
import dynamic from "next/dynamic";
import { useEffect, useMemo } from "react";

export default function Home() {
  const { user, signInWithGoogle, initialise } = useAuthentication()

  useEffect(() => {
    initialise()
  }, [initialise])

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

  if (!user) {
    return <main
      className="flex min-h-screen flex-col p-6 justify-center align-middle place-items-center"
    >
      <Authentication onClick={signInWithGoogle} />
    </main>
  }


  return (
    <main className="flex min-h-screen flex-col p-6">
      {
        user && <Grid numItems={6} className="gap-6">
          <Col numColSpan={2}>
            <TodosList todos={todos} />
          </Col>
          <Col numColSpan={4} >
            <Card>
              <Title className="mb-6">Todo Map</Title>
              <Map position={todos[0].location} zoom={12} todos={todos} />
            </Card>
          </Col>
        </Grid>
      }
    </main >
  );
}

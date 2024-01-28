"use client"

import Authentication from "@/components/authentication";
import Header from "@/components/header";
import TodosList from "@/components/todosList";
import useAuthentication from "@/hooks/useAuthentication";
import useTodo from "@/hooks/useTodo";
import { Card, Col, Grid, Title } from "@tremor/react";
import { LatLng } from "leaflet";
import dynamic from "next/dynamic";
import { useEffect, useMemo } from "react";

export default function Home() {
  const { user, signInWithGoogle, initialise, signOutFromApp } = useAuthentication()

  useEffect(() => {
    initialise()
  }, [initialise])

  const { todos, remove } = useTodo()

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

  const position = useMemo(() => {
    return new LatLng(-36.8698114, 174.7782284)
  }, [])


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
          <Col numColSpan={6}>
            <Header user={user} todos={todos} onSignOut={signOutFromApp} />
          </Col>
          <Col numColSpan={2}>
            <TodosList todos={todos} remove={remove} />
          </Col>
          <Col numColSpan={4} >
            <Card>
              <Title className="mb-6">Todo Map</Title>
              <Map position={position} zoom={12} todos={todos} />
            </Card>
          </Col>
        </Grid>
      }
    </main >
  );
}

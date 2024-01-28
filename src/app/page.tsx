"use client"

import Authentication from "@/components/authentication";
import Header from "@/components/header";
import Task from "@/components/task";
import TodosList from "@/components/todosList";
import useAuthentication from "@/hooks/useAuthentication";
import useTodo, { Todo } from "@/hooks/useTodo";
import { Card, Col, Grid, Subtitle, Title } from "@tremor/react";
import { LatLng } from "leaflet";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useState } from "react";


export default function Home() {
  const [prompt, setPrompt] = useState(false)

  const [edit, setEdit] = useState(false)
  const { user, signInWithGoogle, initialise, signOutFromApp } = useAuthentication()
  // For new task
  const [latlng, setLatLng] = useState<LatLng | undefined>(undefined)
  const { todos, remove, add, edit: editTodo } = useTodo()

  const [todoToEdit, setTodoToEdit] = useState<Todo | undefined>(undefined)

  useEffect(() => {
    initialise()
  }, [initialise])


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

  const promptNewTodo = useCallback((latlng: LatLng) => {
    setPrompt(true)
    setLatLng(latlng)
  }, [])

  const promptEditTodo = useCallback((todo: Todo) => {
    setTodoToEdit(todo)
    setEdit(true)
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
      <Task title="Create a new task" latlng={latlng} setPrompt={setPrompt} prompt={prompt} defaultTaskName="New Task" onSubmit={add} />
      {todoToEdit && <Task title="Edit task" latlng={todoToEdit.location} setPrompt={setEdit} prompt={edit} defaultTaskName={todoToEdit?.description} defaultStatus={todoToEdit.status} onSubmit={editTodo} id={todoToEdit.id} />}
      <Grid numItems={6} className="gap-6">
        {user && <Col numColSpan={6}>
          <Header user={user} todos={todos} onSignOut={signOutFromApp} />
        </Col>}
        <Col numColSpan={3} >
          <Card>
            <Title>Task Map</Title>
            <Subtitle className="mb-6">Click on a location in the map to add a new todo.</Subtitle>
            <Map position={position} zoom={12} todos={todos} onClick={promptNewTodo} />
          </Card>
        </Col>
        <Col numColSpan={3}>
          <TodosList todos={todos} remove={remove} edit={promptEditTodo} />
        </Col>
      </Grid>
    </main >
  );
}

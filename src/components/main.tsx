"use client"



import useAuthentication from "@/hooks/useAuthentication"
import useRecommendedPath from "@/hooks/useRecommendedPath"
import useTodo, { LatLng, Todo } from "@/hooks/useTodo"
import { useState, useEffect, useMemo, useCallback } from "react"
import Authentication from "./authentication"
import { ChartBarIcon, MapIcon, ClipboardCheckIcon } from "@heroicons/react/outline"
import { Card, TabGroup, TabList, Tab, TabPanels, TabPanel, Grid, Col, Metric, Title, DonutChart, BarChart, Subtitle } from "@tremor/react"
import Header from "./header"
import RecommendedPath from "./recommendedPath"
import Status from "./status"
import Task from "./task"
import TodosList from "./todosList"
import Map from "@/components/map"


export default function Main() {
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


    const position = useMemo(() => {
        return { lat: -36.877765266887586, lng: 174.7519683837891 }
    }, [])

    const promptNewTodo = useCallback((latlng: LatLng) => {
        setPrompt(true)
        setLatLng(latlng)
    }, [])

    const promptEditTodo = useCallback((todo: Todo) => {
        setTodoToEdit(todo)
        setEdit(true)
    }, [])

    const { bestRoute } = useRecommendedPath(todos)

    const taskChartData = useMemo(() => {
        return [
            {
                name: "Todo",
                count: todos.filter(t => t.status === "todo").length
            },
            {
                name: "Scheduled",
                count: todos.filter(t => t.status === "scheduled").length
            },
            {
                name: "Done",
                count: todos.filter(t => t.status === "done").length
            }
        ]

    }, [todos])



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
            <Header user={user} todos={todos} onSignOut={signOutFromApp} />
            <Card>
                <TabGroup>
                    <TabList className="mt-2">
                        <Tab icon={ChartBarIcon}>Insights</Tab>
                        <Tab icon={MapIcon}>Map</Tab>
                        <Tab icon={ClipboardCheckIcon}>Todos List</Tab>
                    </TabList>
                    <TabPanels className="p-4">
                        <TabPanel>
                            <Grid numItems={12} className="gap-6">
                                <Col numColSpan={4}>
                                    <Card>
                                        <Status status="todo" />
                                        <Metric>{taskChartData[0].count}</Metric>
                                    </Card>
                                </Col>
                                <Col numColSpan={4}>
                                    <Card>
                                        <Status status="scheduled" />
                                        <Metric>{taskChartData[1].count}</Metric>
                                    </Card>
                                </Col>
                                <Col numColSpan={4}>
                                    <Card>
                                        <Status status="done" />
                                        <Metric>{taskChartData[2].count}</Metric>
                                    </Card>
                                </Col>
                                <Col numColSpan={4}>
                                    <Card>
                                        <Title className="mb-6">Status Distribution</Title>
                                        <DonutChart
                                            data={taskChartData}
                                            variant="pie"
                                            index="name"
                                            category="count"
                                            colors={["yellow", "orange", "green"]}
                                            showAnimation={true}
                                            animationDuration={1500}
                                        />
                                    </Card>
                                </Col>
                                <Col numColSpan={5}>
                                    <Card>
                                        <Title className="mb-6">Status Count</Title>
                                        <BarChart
                                            data={taskChartData}
                                            index="name"
                                            categories={["count"]}
                                            showAnimation={true}
                                            animationDuration={1500}
                                        />
                                    </Card>
                                </Col>
                                <Col numColSpan={3}>
                                    <RecommendedPath todos={todos} recommendedOrder={bestRoute} />
                                </Col>
                            </Grid>
                        </TabPanel>
                        <TabPanel>
                            <Title>Todos Map View</Title>
                            <Subtitle className="mb-6">Click on a location in the map to add a new todo.</Subtitle>
                            <Map position={position as any} zoom={12} todos={todos} onClick={promptNewTodo} />
                        </TabPanel>
                        <TabPanel>
                            <TodosList todos={todos} remove={remove} edit={promptEditTodo} />
                        </TabPanel>
                    </TabPanels>
                </TabGroup>
            </Card>
        </main >
    );
}
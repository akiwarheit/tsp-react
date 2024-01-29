import { Todo } from "@/hooks/useTodo";
import { Card, Flex, Icon, Title } from "@tremor/react";
import { CashIcon } from "@heroicons/react/outline";
import Status from "./status";

interface Props {
    todos: Todo[],
    recommendedOrder: number[];
}

function Task({ todo }: { todo: Todo }) {
    return <li>
        <div className="relative pb-8">
            <span className="absolute left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
            <div className="relative flex items-start space-x-3">
                <div>
                    <div className="relative px-1">
                        <div className="h-8 w-8 bg-blue-500 rounded-full ring-8 ring-white flex items-center justify-center">
                            <svg className="text-white h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="min-w-0 flex-1 py-0">
                    <div className="text-md text-gray-500">
                        <Flex flexDirection="row">
                            <Title className="mr-2">{todo.description}</Title>
                            <Status status={todo.status} />
                        </Flex>
                        <span className="whitespace-nowrap text-sm">{`${todo.location.lat}, ${todo.location.lng}`}</span>
                    </div>
                </div>
            </div>
        </div>
    </li>
}

export default function RecommendedPath({ todos, recommendedOrder }: Props) {
    return <Card>
        <Title>Recommended Order</Title>
        <div className="max-w-xl mx-auto p-8">
            <div className="flow-root">
                <ul className="-mb-8">
                    {recommendedOrder.map((val, idx) => <Task key={idx} todo={todos[val]} />)}
                </ul>
            </div>
        </div>
    </Card>
}
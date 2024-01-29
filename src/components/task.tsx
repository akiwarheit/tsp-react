import useReverseGeocode from "@/hooks/useReverseGeocode";
import { Todo } from "@/hooks/useTodo";
import { Button, Card, Flex, Icon, Select, SelectItem, Text, TextInput, Title } from "@tremor/react";
import { LatLng } from "leaflet";
import { useCallback, useState } from "react";
import { XIcon } from "@heroicons/react/solid";

interface Props {
    title: string;
    latlng?: Partial<LatLng>
    setPrompt: (val: boolean) => void;
    defaultTaskName: string;
    prompt: boolean;
    onSubmit: (todo: Partial<Todo>) => void

    defaultDescription?: string;
    defaultStatus?: string;
    id?: string
}

export default function Task({ latlng, setPrompt, defaultTaskName, prompt, onSubmit, defaultStatus = "todo", defaultDescription = "", title, id }: Props) {
    const [description, setDescription] = useState(defaultDescription)
    const [status, setStatus] = useState(defaultStatus)

    const onCreate = useCallback(() => {
        const newTask = {
            id,
            description,
            status,
            location: {
                lat: latlng?.lat,
                lng: latlng?.lng
            }
        }

        onSubmit(newTask as unknown as Todo)
        setPrompt(false)
    }, [id, description, status, latlng?.lat, latlng?.lng, onSubmit, setPrompt])

    const address = `${latlng?.lat}, ${latlng?.lng}`

    if (!prompt) {
        return null;
    }

    return <div id="loading-overlay" className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-60" style={{ zIndex: 9000 }}>
        <Card className="w-1/2">
            <Flex flexDirection="row" className="w-full mb-6">
                <Title>{title}</Title>
                <Icon icon={XIcon} className="self-end hover:cursor-pointer" onClick={() => setPrompt(false)} />
            </Flex>
            <TextInput name="description" placeholder="Description (Task Name)" defaultValue={defaultTaskName} className="mb-2" onValueChange={setDescription} />
            {latlng && <TextInput name="latlng" placeholder="LatLng" value={address} disabled={true} className="mb-1" />}
            <Text className="mb-2">Location is not editable. Use the map view to create a new todo.</Text>
            <Select defaultValue={defaultStatus || "todo"} className="mb-6" onValueChange={setStatus}>
                <SelectItem value="todo">Todo</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="done">Done</SelectItem>
            </Select>

            <Flex flexDirection="row" className="w-full justify-end">
                <Button variant="primary" className="p-2" onClick={onCreate}>Confirm</Button>
            </Flex>
        </Card>
    </div>
}
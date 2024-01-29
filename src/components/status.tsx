import { Badge } from "@tremor/react"
import { useMemo } from "react"

export default function Status({ status }: { status: string }) {
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
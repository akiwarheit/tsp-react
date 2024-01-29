import { useEffect, useMemo, useState } from "react";
import { LatLng, Todo } from "./useTodo";


import { evolveOnDistances } from "../../functions/ga"

function calculateDistance(location1: LatLng, location2: LatLng) {
    const lat1 = location1.lat;
    const lng1 = location1.lng;
    const lat2 = location2.lat;
    const lng2 = location2.lng;

    const radLat1 = (Math.PI * lat1) / 180;
    const radLng1 = (Math.PI * lng1) / 180;
    const radLat2 = (Math.PI * lat2) / 180;
    const radLng2 = (Math.PI * lng2) / 180;

    const deltaLat = radLat2 - radLat1;
    const deltaLng = radLng2 - radLng1;

    const distance = Math.sqrt(deltaLat * deltaLat + deltaLng * deltaLng);

    return distance;
}

function createDistanceMatrix(todos: Todo[]) {
    const distancMatrix: number[][] = []
    for (let i = 0; i < todos.length; i++) {
        const task1 = todos[i];

        const per_task_distances = []
        for (let j = 0; j < todos.length; j++) {
            const task2 = todos[j];
            const distance = calculateDistance(task1.location, task2.location);

            per_task_distances.push(distance)
        }

        distancMatrix.push(per_task_distances)
    }

    return distancMatrix
}


export default function useRecommendedPath(todos: Todo[]) {
    const distanceMatrix = useMemo(() => createDistanceMatrix(todos), [todos])
    const bestRoute = useMemo(() => {
        if (todos.length === 0) {
            return []
        }

        return evolveOnDistances(distanceMatrix)
    }, [distanceMatrix, todos.length])

    return { bestRoute, distanceMatrix }
}
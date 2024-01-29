"use client"

import dynamic from 'next/dynamic'

const Map = dynamic(
    () => import('./map'),
    {
        loading: () => <p>Loading</p>,
        ssr: false
    }
)

export default Map
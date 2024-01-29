"use client"
import Image from 'next/image'

import { Card, Icon } from "@tremor/react";
interface Props {
    onClick: () => void
}

export default function Authentication({ onClick }: Props) {
    return <div className="w-1/4">
        <Card>
            <Image width={128} height={128} className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4" src="https://www.lego.com/cdn/cs/set/assets/blta636ffccc87fdf4b/60367.png?format=webply&fit=bounds&quality=75&width=1200&height=1200&dpr=1" alt="" />
            <button onClick={onClick} type="button" className="text-white w-full bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
                <svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                    <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                </svg>
                Sign in with Google
                <div />
            </button>
        </Card>
    </div>
}
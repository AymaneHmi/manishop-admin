'use client';

import { Loader2 } from "lucide-react";

interface LoaderProps {
    isLoading: boolean;
    size?: number;
}

const Loader = ({isLoading, size}: LoaderProps) => {

    if(!isLoading) return null;

    return (
        <Loader2
            className="animate-spin text-xurrent"
            size={size ? size : 18}
        />
    )
}

export default Loader
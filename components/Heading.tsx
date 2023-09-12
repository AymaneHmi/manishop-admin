'use client';

import React from "react";

interface HeadingProps {
    title: string;
    subtitle?: string;
    center?: boolean;
    small?: boolean;
}

const Heading: React.FC<HeadingProps> = ({
    title,
    subtitle,
    center,
    small
}) => {
    return (
        <div className={`flex flex-col 
        ${center ? 'items-center' : 'items-left'}`}>
            <h1 className={`font-bold ${small ? 'text-xl' : 'text-3xl'}`}>{title}</h1>
            <h2 className="font-light">{subtitle}</h2>
        </div>
    )
}

export default Heading;
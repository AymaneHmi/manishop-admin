'use client';

import Heading from "./Heading";

interface EmptyStateProps {
    title: string;
    subtitle: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
    title,
    subtitle
}) => {
    return (
        <div className="flex flex-col items-center justify-center h-[70vh] w-full">
            <Heading 
                title={title} 
                subtitle={subtitle} 
                center
            />
        </div>
    )
}

export default EmptyState;
'use client';

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import Blogs from "./Blogs";
import { getBlogs } from "@/actions/getBlogs";
import { Separator } from "@/components/ui/separator";
import useModal from "@/hooks/use-modal";

const blogsPage = () => {
    const {onOpen} = useModal();
    const blogs = getBlogs();

    const handleCreateCategory = () => {
        onOpen('createBlog');

    }
    return (
        <section className="flex flex-col gap-4">
            <div className="flex flex-row items-center justify-between">
                <Heading
                    title={`Blogs (${blogs?.length})`}
                    subtitle="Manage your website blogs."
                />
                <Button className="w-fit" onClick={handleCreateCategory}>
                    Create a blog
                </Button>
            </div>
            <Separator />
            <Blogs blogs={blogs} />
        </section>
    )
}

export default blogsPage;
import { blog } from "@/lib/types";
import { useFetch } from "@/hooks/use-fetch";

const blogsApi: any = process.env.NEXT_PUBLIC_BLOGS_API;

export function getBlogs () {
    const blogs = useFetch<blog>(blogsApi);
    return blogs;
}
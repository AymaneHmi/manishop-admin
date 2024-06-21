import Loader from "@/components/ui/loader";

export default function dashBoardLoading () {
    return (
        <div className="w-screen h-screen flex flex-col items-center my-4">
            <div className="w-14 h-14 flex items-center justify-center rounded shadow-lg rounded-full">
                <Loader isLoading size={30} />
            </div>
        </div>
    )
}
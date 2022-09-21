import Video from "./Video";
import { useGetVideosQuery } from "../../feachers/api/apiSlice";
import VideoLoader from "../ui/loaders/VideoLoader";
import Error from "../ui/Error";

export default function Videos() {
    const { data: videos, isLoading, isError } = useGetVideosQuery();

    //deside what to render
    let content = null;
    if (isLoading) {
        content = (
            <>
                <VideoLoader />
                <VideoLoader />
                <VideoLoader />
                <VideoLoader />
            </>
        );
    }
    if (!isLoading && isError) {
        content = <Error message="there was an error" />;
    }
    if (!isLoading && !isError && videos?.length === 0) {
        content = <Error message="no videos found!!!" />;
    }
    if (!isLoading && !isError && videos?.length > 0) {
        content = videos.map((video) => <Video key={video.id} video={video} />);
    }
    return content;
}

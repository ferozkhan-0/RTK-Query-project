import { useGetRelatedVideosQuery } from "../../../feachers/api/apiSlice";
import RelatedVideo from "./RelatedVideo";
import RelatedVideoLoader from "../../ui/loaders/RelatedVideoLoader";
import Error from "../../ui/Error";
export default function RelatedVideos({ id, title }) {
    const {
        data: relatedVideos,
        isLoading,
        isError,
    } = useGetRelatedVideosQuery({ id, title });
    //deside what to render
    let content = null;
    if (isLoading) {
        content = (
            <>
                <RelatedVideoLoader />
                <RelatedVideoLoader />
                <RelatedVideoLoader />
                <RelatedVideoLoader />
            </>
        );
    }
    if (!isLoading && isError) {
        content = <Error message="there was an error" />;
    }
    if (!isLoading && !isError && relatedVideos?.length === 0) {
        content = <Error message="no videos found!!!" />;
    }
    if (!isLoading && !isError && relatedVideos?.length > 0) {
        content = relatedVideos.map((video) => (
            <RelatedVideo key={video.id} video={video} />
        ));
    }
    return (
        <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">
            {content}
        </div>
    );
}

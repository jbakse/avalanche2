import { PostData, UserData } from "../../data/data";
import {
  users,
  getHeadshotURL,
  getVideoThumbnailURL,
  getImageThumbnailURL,
} from "../../data/data";

interface PostProps extends PostData {
  onUserChange?: (newActiveUser: UserData | null) => void;
  onPostChange?: (newActivePost: PostData | null) => void;
}

export const Post = (data: PostProps) => {
  // format like December 31 at 12:00 am
  const created_at = new Date(data.createdAt).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const renderMedia = () => {
    const playButton = (
      <div className="absolute inset-0 flex items-center justify-center border">
        <svg
          className="h-20 drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]"
          viewBox="0 0 5 6"
        >
          <path
            strokeLinejoin="round"
            strokeWidth={0.5}
            stroke="white"
            fill="white"
            d="M1 1 l3 2 l-3 2 z"
          />
        </svg>
      </div>
    );

    const mediaThumb = (
      mediaInfo: { type: string; thumb: string },
      widthClass = "w-full",
      aspectClass = "aspect-square"
    ) => (
      <div className={`${widthClass} ${aspectClass} relative`}>
        <img className="w-full h-full object-cover" src={mediaInfo.thumb} />
        {mediaInfo.type === "video" && playButton}
      </div>
    );

    const mediaInfos = data.cloudinaryMedia.map((o) => {
      if (o.resourceType === "video") {
        // video
        return {
          type: "video",
          thumb: getVideoThumbnailURL(o.publicId),
        };
      } else {
        // image
        return {
          type: "image",
          thumb: getImageThumbnailURL(o.publicId),
        };
      }
    });

    if (mediaInfos.length === 0) return null;

    if (mediaInfos.length === 1) {
      return <>{mediaThumb(mediaInfos[0], "w-full", "aspect-square")}</>;
    }

    if (mediaInfos.length === 2) {
      return (
        <>
          {mediaThumb(mediaInfos[0])}
          {mediaThumb(mediaInfos[1], "w-full", "aspect-[2/1]")}
        </>
      );
    }

    if (mediaInfos.length >= 3) {
      return (
        <>
          {mediaThumb(mediaInfos[0], "w-full", "aspect-square")}
          {mediaThumb(mediaInfos[1], "w-1/2", "aspect-square")}
          {mediaThumb(mediaInfos[2], "w-1/2", "aspect-square")}
        </>
      );
    }
  };

  return (
    <div
      className="w-80 h-full bg-white border border-gray-300 rounded shadow-md"
      onClick={() => data.onPostChange?.(data)}
    >
      {/* media */}
      <div className="flex flex-wrap relative">{renderMedia()}</div>

      <div className="p-4 font-sans">
        {/* emoji */}
        {data.votes.length > 0 && (
          <div className="tracking-[.33em] mb-3">
            {data.votes.map((vote) => vote.content).join(" ")}
          </div>
        )}

        {/* code url */}
        {data.code && (
          <a
            className="block mb-3 text-xs text-purple-600 hover:underline visited:text-purple-900"
            href="#"
          >
            View Code
          </a>
        )}

        {/* description */}
        <div className="mb-4">{elide(data.description, 100)}</div>

        <div className="flex">
          <img
            className="rounded-full w-8 h-8 inline-block cursor-pointer"
            src={getHeadshotURL(data.authorHeadshotId, "small")}
            onClick={() =>
              data.onUserChange?.(
                users.find((u) => u._id === data.authorId) ?? null
              )
            }
          />
          <span className="text-xs uppercase flex items-center ml-3">
            {data.authorName}
          </span>
          <span className="text-xs ml-auto flex items-center">
            {created_at}
          </span>
        </div>
      </div>
    </div>
  );
};

function elide(str: string, max: number) {
  return str.length > max ? str.slice(0, max).trim() + "…" : str;
}

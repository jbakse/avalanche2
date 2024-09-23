import { Post as PostData } from "../../data/data";

export type PostProps = PostData;

export const Post = (data: PostProps) => {
  // format like December 31 at 12:00 am
  const created_at = new Date(data.created_at).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const renderMedia = () => {
    // example video thumb url
    // https://res.cloudinary.com/compform2023spring/video/upload/w_350/avalanche2023spring/iezbyqnfdvl9rvaoyank.jpg

    // example image thumb url
    //https://res.cloudinary.com/compform2023spring/image/upload/c_fill,f_auto,q_auto:best,w_350/v1/avalanche2023spring/v2agzd39fbrclj7urnve

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

    const mediaInfos = data.cloudinary_media.map((o) => {
      if (o.resource_type === "video") {
        // video
        return {
          type: "video",
          thumb: `https://res.cloudinary.com/compform2023spring/video/upload/w_350/${o.public_id}.jpg`,
        };
      } else {
        // image
        return {
          type: "image",
          thumb: `https://res.cloudinary.com/compform2023spring/image/upload/c_fill,f_auto,q_auto:best,w_350/v1/${o.public_id}`,
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
    <div className="w-80 border border-gray-300 shadow-md rounded bg-white">
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
            className="rounded-full w-8 h-8 inline-block"
            src={`https://res.cloudinary.com/compform2023spring/image/upload/c_fill,f_auto,q_auto:best,w_64/v1/${data.author_headshot}`}
          />
          <span className="text-xs uppercase flex items-center ml-3">
            {data.author}
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

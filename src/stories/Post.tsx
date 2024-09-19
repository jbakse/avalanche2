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

  const renderImgs = () => {
    const imgSrcs = data.cloudinary_media
      .filter((o) => o.resource_type === "image")
      .map(
        (o) =>
          `https://res.cloudinary.com/compform2023spring/image/upload/c_fill,f_auto,q_auto:best,w_350/v1/${o.public_id}`
      );

    if (imgSrcs.length === 0) return null;
    if (imgSrcs.length === 1) {
      return (
        <img className="w-full aspect-square object-cover" src={imgSrcs[0]} />
      );
    }
    if (imgSrcs.length === 2) {
      return (
        <>
          <img className="w-full aspect-square object-cover" src={imgSrcs[0]} />
          <img className="w-full aspect-[2/1]  object-cover" src={imgSrcs[1]} />
        </>
      );
    }
    if (imgSrcs.length >= 3) {
      return (
        <>
          <img className="w-full aspect-square object-cover" src={imgSrcs[0]} />
          <img className="w-1/2  aspect-square object-cover" src={imgSrcs[1]} />
          <img className="w-1/2  aspect-square object-cover" src={imgSrcs[2]} />
        </>
      );
    }
  };
  return (
    <div className="w-80 border border-gray-300 shadow-md rounded bg-white">
      {/* images */}
      <div className="flex  flex-wrap">{renderImgs()}</div>

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

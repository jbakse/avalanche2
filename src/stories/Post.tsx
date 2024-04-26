export interface PostProps {
  author?: string;
  emojis?: string;
  description?: string;
  date: Date;
  codeUrl?: string; // url of the attached code, if any
  imageUrls: string[]; // urls of the post's primary images
  avatarUrl: string; // url of the author's avatar
}

export const Post = ({
  author = "unknown",
  emojis = "",
  description = "",
  date,
  avatarUrl,
  codeUrl,
  imageUrls = [],
  ...props
}: PostProps) => {
  // format like December 31 at 12:00 am
  const formattedDate = date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const renderImages = () => {
    if (imageUrls.length === 0) return null;
    if (imageUrls.length === 1) {
      return (
        <img className="w-full aspect-square object-cover" src={imageUrls[0]} />
      );
    }
    if (imageUrls.length === 2) {
      return (
        <>
          <img
            className="w-full aspect-square object-cover"
            src={imageUrls[0]}
          />
          <img
            className="w-full aspect-[2/1] object-cover"
            src={imageUrls[1]}
          />
        </>
      );
    }
    if (imageUrls.length >= 3) {
      return (
        <>
          <img
            className="w-full aspect-square object-cover"
            src={imageUrls[0]}
          />
          <img
            className="w-1/2 aspect-square object-cover"
            src={imageUrls[1]}
          />
          <img
            className="w-1/2 aspect-square object-cover"
            src={imageUrls[2]}
          />
        </>
      );
    }
  };
  return (
    <div className="w-80 border border-gray-300 shadow-md rounded bg-white">
      <div className="flex  flex-wrap">{renderImages()}</div>
      <div className="p-4 font-sans">
        {/* emoji */}
        {emojis && <div className="tracking-[.33em] mb-3">{emojis}</div>}

        {/* code url */}
        {codeUrl && (
          <a
            className="block mb-3 text-xs text-purple-600 hover:underline visited:text-purple-900"
            href={codeUrl}
          >
            View Code
          </a>
        )}
        {description && <div className="mb-4">{elide(description, 100)}</div>}
        <div className="flex">
          <img className="rounded-full w-8 h-8 inline-block" src={avatarUrl} />
          <span className="text-xs uppercase flex items-center ml-3">
            {author}
          </span>
          <span className="text-xs ml-auto flex items-center">
            {formattedDate}
          </span>
        </div>
      </div>
    </div>
  );
};

function elide(str: string, max: number) {
  return str.length > max ? str.slice(0, max).trim() + "…" : str;
}

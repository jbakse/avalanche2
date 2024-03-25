interface PostProps {
  author: string;
  emojis: string;
  description: string;
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
  // format like December 31, 12:00 am
  const formattedDate = date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return (
    <div className="w-96 border border-gray-300 shadow-md rounded">
      <div>
        {imageUrls[0] && <img className="w-full" src={imageUrls[0]} />}
        <img className="w-1/2 inline-block" src={imageUrls[1]} />
        <img className="w-1/2 inline-block" src={imageUrls[2]} />
      </div>
      <div className="p-4 font-sarala">
        {/* todo: make font work */}
        <div className="tracking-[.33em]">{emojis}</div>
        {codeUrl ? (
          <a
            className="block mt-3 text-xs text-purple-600 hover:underline visited:text-purple-900"
            href={codeUrl}
          >
            View Code
          </a>
        ) : null}
        <div className="mt-2">{elide(description, 100)}</div>
        <div className="mt-4 flex">
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
  return str.length > max ? str.slice(0, max) + "…" : str;
}

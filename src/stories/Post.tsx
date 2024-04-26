export interface PostProps {
  imageUrls: string[];
  emojis: string;
  codeUrl: string;
  description: string;
  avatarUrl: string;
  author: string;
  date: Date;
}

interface CloudinaryMedia {
  public_id: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
}

interface Vote {
  category: string;
  voter_id: string;
  created_at: string;
}

interface Comment {
  comment: string;
  commenter_id: string;
  created_at: string;
}

export interface PostData {
  _id: string;
  author_id: string;
  author: string;
  created_at: string;
  posted: boolean;
  lesson: string;
  description: string;
  code: string;
  cloudinary_media: CloudinaryMedia[];
  votes: Vote[];
  comments: Comment[];
}

const emojisLookup: { [key: string]: string } = {
  funny: "😂",
  nerdy: "🤓",
  pretty: "😍",
};

export const Post = (data: PostData) => {
  console.log("data", data);
  // format like December 31 at 12:00 am
  const created_at = new Date(data.created_at).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const emojis = data.votes.map((vote) => emojisLookup[vote.category]).join("");

  const renderImages = () => {
    const imageUrls = data.cloudinary_media.map(
      (o) =>
        `https://res.cloudinary.com/compform2023spring/image/upload/c_fill,f_auto,q_auto:best,w_350/v1/${o.public_id}`
    );

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
      {/* images */}
      <div className="flex  flex-wrap">{renderImages()}</div>

      <div className="p-4 font-sans">
        {/* emoji */}
        {emojis && <div className="tracking-[.33em] mb-3">{emojis}</div>}

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
          <img className="rounded-full w-8 h-8 inline-block" src="#" />
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

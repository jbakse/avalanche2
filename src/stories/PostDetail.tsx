import { marked } from "marked";

import { Dateline, formatDate } from "./Post";

import {
  PostData,
  getImageURL,
  getVideoURL,
  getAudioURL,
} from "../../data/data";

interface PostDetailProps {
  postData: PostData;
  onClose: () => void;
}

const xButton = (
  <svg
    className="h-full w-full"
    viewBox="0 0 10 10"
    fill="none"
    stroke="black"
    strokeWidth={1}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1={4} y1={4} x2={6} y2={6} />
    <line x1={6} y1={4} x2={4} y2={6} />
  </svg>
);

export const PostDetail = ({
  postData: postData,
  onClose,
}: PostDetailProps) => {
  //todo: this is a thing

  return (
    <>
      <div
        className="fixed inset-0 cursor-pointer bg-black bg-opacity-50"
        onClick={onClose}
      ></div>
      <div className="fixed inset-10 flex rounded-lg bg-white shadow-md">
        {/* left column */}
        <div className="custom-scroll flex flex-1 flex-col items-center space-y-10 overflow-y-auto bg-black p-10">
          {/* media */}
          {postData.cloudinaryMedia.map((media) => {
            if (media.resourceType === "audio") {
              return (
                // getAudioURL(media.publicId)
                <audio controls>
                  <source src={getAudioURL(media.publicId)} type="audio/mp3" />
                </audio>
              );
            }
            if (media.resourceType === "image") {
              return (
                <img
                  className="h-auto max-w-full"
                  src={getImageURL(media.publicId)}
                />
              );
            }
            if (media.resourceType === "video") {
              return (
                <video className="h-auto max-w-full" controls>
                  <source src={getVideoURL(media.publicId)} type="video/mp4" />
                </video>
              );
            }
            return <></>;
          })}
        </div>

        {/* right column */}
        <div className="w-[400px] bg-white px-4 py-16">
          {/* close */}
          <button className="absolute right-0 top-0 h-8 w-8" onClick={onClose}>
            {xButton}
          </button>

          {/* dateline */}
          <Dateline postData={postData} />

          {/* emoji */}
          {postData.votes.length > 0 && (
            <div className="mb-3 py-4 tracking-[.33em]">
              {postData.votes.map((vote) => vote.content).join("")}
            </div>
          )}

          {/* description */}
          <p
            className="user-content mb-6 text-lg font-light"
            dangerouslySetInnerHTML={{
              __html: marked.parse(postData.description, { async: false }),
            }}
          ></p>

          {/* comments */}
          <div className="space-y-4">
            {postData.comments.map((comment) => (
              <div key={comment.content} className="">
                {/* comment dateline */}
                <div className="flex">
                  <span className="text-xs uppercase">
                    {comment.authorName}
                  </span>
                  <span className="ml-auto text-xs">
                    {formatDate(comment.createdAt)}
                  </span>
                </div>

                {/* comment content */}
                <p
                  className="user-content mt-2 text-lg font-light"
                  dangerouslySetInnerHTML={{
                    __html: marked.parse(comment.content, { async: false }),
                  }}
                ></p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

import React from "react";
import { Dateline, formatDate } from "./Post";

import { PostData, getImageURL, getVideoURL } from "../../data/data";

interface PostDetailProps {
  post: PostData;
  onClose: () => void;
}

export const PostDetail: React.FC<PostDetailProps> = ({
  post: postData,
  onClose,
}) => {
  return (
    <div className="fixed inset-5 bg-white shadow-xl rounded-lg flex overflow-hidden border border-blue-500">
      <div className="flex-1 bg-black p-10 flex flex-col items-center space-y-4 overflow-y-auto">
        {/* media */}
        {postData.cloudinaryMedia.map((media) => {
          if (media.resourceType === "image") {
            return (
              <img
                className="max-w-full h-auto"
                src={getImageURL(media.publicId)}
              />
            );
          }
          if (media.resourceType === "video") {
            return (
              <video className="max-w-full h-auto" controls>
                <source src={getVideoURL(media.publicId)} type="video/mp4" />
              </video>
            );
          }

          return <></>;
        })}
      </div>
      <div className="w-[400px] bg-white py-16 px-4">
        {/* close */}
        <button
          className="absolute top-0 right-0 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 "
          onClick={onClose}
        >
          Close
        </button>

        {/* emoji */}
        <Dateline postData={postData} />

        {/* emoji */}
        {postData.votes.length > 0 && (
          <div className="tracking-[.33em] mb-3 py-4">
            {postData.votes.map((vote) => vote.content).join("")}
          </div>
        )}

        {/* description */}
        <p className="mb-6">{postData.description}</p>

        {/* comments */}
        <div className="space-y-4">
          {postData.comments.map((comment) => (
            <div key={comment.content} className="">
              <div className="flex">
                <span className="text-xs uppercase">{comment.authorName}</span>
                <span className="text-xs ml-auto">
                  {formatDate(comment.createdAt)}
                </span>
              </div>

              <p className="mt-2">{comment.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

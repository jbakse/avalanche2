import { marked } from "marked";
import React from "react";
import { Dateline, formatDate } from "./Post";

import { PostData, getImageURL, getVideoURL } from "../../data/data";

interface PostDetailProps {
  postData: PostData;
  onClose: () => void;
}

const xButton = (
  <svg
    className="w-full h-full"
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

export const PostDetail: React.FC<PostDetailProps> = ({
  postData: postData,
  onClose,
}) => {
  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 cursor-pointer"
        onClick={onClose}
      ></div>
      <div className="fixed inset-10 bg-white shadow-md rounded-lg flex">
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
          <button className="absolute top-0 right-0 w-8 h-8" onClick={onClose}>
            {xButton}
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
          <p
            className="mb-6 font-light text-lg user-content"
            dangerouslySetInnerHTML={{
              __html: marked.parse(postData.description, { async: false }),
            }}
          ></p>

          {/* comments */}
          <div className="space-y-4">
            {postData.comments.map((comment) => (
              <div key={comment.content} className="">
                <div className="flex">
                  <span className="text-xs uppercase">
                    {comment.authorName}
                  </span>
                  <span className="text-xs ml-auto">
                    {formatDate(comment.createdAt)}
                  </span>
                </div>

                {/* <p className="mt-2">{comment.content}</p> */}

                <p
                  className="mt-2 font-light text-lg user-content"
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

import React from "react";
import {
  PostData,
  getHeadshotURL,
  getImageThumbnailURL,
  getVideoThumbnailURL,
} from "../../data/data";

interface PostDetailProps {
  post: PostData;
  onClose: () => void;
}

export const PostDetail: React.FC<PostDetailProps> = ({ post, onClose }) => {
  return (
    <div className="fixed inset-5 bg-white shadow-xl rounded-lg flex overflow-hidden border border-blue-500">
      <div className="flex-grow bg-blue-200">left</div>
      <div className="w-[400px] bg-pink-200">
        <div className="flex items-center mb-4">
          <img
            src={getHeadshotURL(post.authorHeadshotId)}
            alt={post.authorName}
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <h2 className="text-xl font-bold">{post.authorName}</h2>
            <p className="text-sm text-gray-500">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="mb-4">
          <span className="text-lg font-semibold">
            {post.votes.length} votes
          </span>
        </div>
        <p className="mb-6">{post.description}</p>
        <div className="space-y-4">
          {post.comments.map((comment, index) => (
            <div key={index} className="bg-gray-100 p-3 rounded">
              <p className="font-semibold">{comment.authorName}</p>
              <p>{comment.content}</p>
            </div>
          ))}
        </div>
        <button
          className="absolute top-0 right-0 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 "
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

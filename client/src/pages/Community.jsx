import React, { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { Heart, MessageCircle } from "lucide-react";
import toast from "react-hot-toast";
import { dummyCommunityPosts } from "../assets/assets";

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const { getToken } = useAuth();

  // Fetch posts from backend
  const fetchPosts = async () => {
    setLoading(false);
    setPosts(dummyCommunityPosts);
  };

  // Like/Unlike a post
  const toggleLike = async (postId) => {
    // To be implemented with backend
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return !loading ? (
    <div className="flex-1 h-full flex flex-col gap-4 p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">Community</h1>

      <div className="bg-white h-full w-full rounded-xl p-3 sm:p-4 overflow-y-auto">
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-3 sm:p-4 mb-4 shadow-sm"
            >
              {/* Author Info */}
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={post.author.imageUrl || "/default-avatar.png"}
                  alt={post.author.name}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                />
                <div>
                  <h2 className="font-semibold text-sm sm:text-base">
                    {post.author.name || "Anonymous"}
                  </h2>
                  <p className="text-xs text-gray-500">{post.createdAt}</p>
                </div>
              </div>

              {/* Post Content */}
              <p className="text-gray-800 mb-2 text-sm sm:text-base">
                {post.content}
              </p>
              {post.image && (
                <div className="w-full mb-3 flex ">
                  <img
                    src={post.image}
                    alt="Post"
                    className="w-100 h-auto rounded-md object-contain border border-gray-200"
                  />
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center mt-3 gap-6 text-gray-600 text-sm">
                <div
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={() => toggleLike(post.id)}
                >
                  <Heart
                    className={`w-5 h-5 hover:scale-110 transition ${
                      post.likes.includes(user.id)
                        ? "fill-red-500 text-red-600"
                        : "text-gray-500"
                    }`}
                  />
                  <span>{post.likes.length}</span>
                </div>
                <div className="flex items-center gap-1 cursor-pointer">
                  <MessageCircle className="w-5 h-5" />
                  <span>{post.comments.length}</span>
                </div>
              </div>

              {/* Comments */}
              {post.comments.length > 0 && (
                <div className="mt-3 pl-3 border-l border-gray-200">
                  {post.comments.map((comment, cIdx) => (
                    <p
                      key={cIdx}
                      className="text-xs sm:text-sm text-gray-700 mb-1"
                    >
                      <span className="font-semibold">{comment.user}:</span>{" "}
                      {comment.text}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center text-sm sm:text-base">
            <b>No posts yet. Be the first to share!</b>
          </p>
        )}
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center h-full">
      <span className="w-8 h-8 sm:w-10 sm:h-10 my-1 rounded-full border-2 border-primary border-t-transparent animate-spin"></span>
    </div>
  );
};

export default Community;

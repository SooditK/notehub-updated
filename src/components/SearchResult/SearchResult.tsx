import { Likes, Post, Subject, User } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { BiLinkAlt } from "react-icons/bi";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { trpc } from "../../utils/trpc";
import { AiFillLike } from "react-icons/ai";

interface SearchResultProps {
  search: string;
  posts: (Post & {
    Subject: Subject | null;
    Likes: Likes[];
    author: User | null;
  })[];
  setResult: (
    result: (Post & {
      Subject: Subject | null;
      Likes: Likes[];
      author: User | null;
    })[]
  ) => void;
}

const SearchResult = ({ posts, search, setResult }: SearchResultProps) => {
  const utils = trpc.useContext();
  const { data: session } = useSession();
  const userIdFromSession = trpc.useQuery([
    "post.getuserfromid",
    {
      email: session?.user?.email!,
    },
  ]);
  const likePost = trpc.useMutation(["likes.createlike"]);
  const unlikePost = trpc.useMutation(["likes.deletelike"]);
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap justify-center items-center">
            {posts.map((post) => {
              const isLiked = post.Likes.find(
                (like) => like.userId === userIdFromSession?.data?.id
              );
              return (
                <div className="p-4 lg:w-1/3" key={post.id}>
                  <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-8 pb-12 rounded-lg overflow-hidden text-center relative">
                    <h2 className="tracking-widest text-sm title-font font-medium text-indigo-700 mb-1">
                      {post.Subject?.name}{" "}
                      <span className="bg-indigo-100 text-indigo-700 px-2 rounded-xl">
                        {post.Subject?.code}
                      </span>
                    </h2>
                    <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                      {post.title}
                    </h1>
                    <p className="leading-relaxed mb-3">{post.description}</p>
                    <Link href={post.link}>
                      <a className="text-indigo-500 gap-x-2 justify-center inline-flex items-center">
                        Link
                        <span>
                          <BiLinkAlt />
                        </span>
                      </a>
                    </Link>
                    <div className="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4">
                      <div className="text-gray-400 mr-3 gap-x-1 flex justify-center items-center leading-none text-sm pr-3 py-1">
                        <span className="text-lg">{post.Likes.length}</span>
                        <button>
                          {isLiked ? (
                            <AiFillLike
                              className="text-red-500 h-6 w-6"
                              color="red"
                              onClick={(e) => {
                                e.preventDefault();
                                // check if user is logged in
                                {
                                  session === null || session === undefined
                                    ? toast.error("Please login")
                                    : unlikePost.mutate(
                                        {
                                          postid: isLiked?.id,
                                        },
                                        {
                                          onSuccess: () => {
                                            utils
                                              .fetchQuery([
                                                "search.notes",
                                                { text: search },
                                              ])
                                              .then((data) => {
                                                setResult(data);
                                              });
                                            toast.success(
                                              "Unliked, Please refresh"
                                            );
                                          },
                                        }
                                      );
                                }
                              }}
                            />
                          ) : (
                            <AiFillLike
                              className="text-gray-500 h-6 w-6"
                              onClick={(e) => {
                                e.preventDefault();
                                {
                                  session === null || session === undefined
                                    ? toast.error("Please Login")
                                    : likePost.mutate(
                                        {
                                          postid: post.id,
                                        },
                                        {
                                          onSuccess: (data) => {
                                            utils
                                              .fetchQuery([
                                                "search.notes",
                                                { text: search },
                                              ])
                                              .then((data) => {
                                                setResult(data);
                                              });
                                            toast.success(
                                              "Liked, Please refresh"
                                            );
                                          },
                                        }
                                      );
                                }
                              }}
                            />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="flex gap-x-4 items-center justify-center bottom-0 right-0 w-full px-4 py-2">
                      <img
                        className="w-8 h-8 rounded-full"
                        src={`https://avatars.dicebear.com/api/miniavs/${post.author?.image}.svg`}
                        alt={`${post.author?.name}'s avatar`}
                      />
                      <span className="text-gray-800 mt-1 text-sm">
                        {post.author?.name}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default SearchResult;

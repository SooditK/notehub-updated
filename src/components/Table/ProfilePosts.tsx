import Link from "next/link";
import React from "react";
import { trpc } from "../../utils/trpc";
import UpdatePost from "../UpdatePost/UpdatePost";
import { FiExternalLink } from "react-icons/fi";

const ProfilePosts = () => {
  const utils = trpc.useContext();
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState({
    id: "",
    title: "",
    description: "",
    link: "",
    subjectname: "",
    subjectcode: "",
    university: "",
  });
  const { data: posts } = trpc.useQuery(["post.allposts"]);
  const deletePost = trpc.useMutation(["post.deletepost"]);
  return (
    <div className="container p-2 mx-auto sm:p-4 text-gray-100">
      <h2 className="mb-4 text-2xl font-semibold leading-tight">Your Notes</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs">
          <thead className="bg-gray-700">
            <tr className="text-left">
              <th className="p-3">Title</th>
              <th className="p-3">Description</th>
              <th className="p-3">Link</th>
              <th className="p-3">Subject Name</th>
              <th className="p-3">Subject Code</th>
              <th className="p-3">University Name</th>
              <th className="p-3">Update Note</th>
              <th className="p-3">Delete Note</th>
            </tr>
          </thead>
          <tbody>
            {posts &&
              posts.posts.length > 0 &&
              posts?.posts.map((post) => (
                <tr
                  className="border-b text-white border-opacity-20 border-gray-700 bg-gray-900"
                  key={post.id}
                >
                  <td className="p-3">
                    <p>{post.title}</p>
                  </td>
                  <td className="p-3">
                    <p>{post.description}</p>
                  </td>
                  <td className="p-3">
                    <p>
                      <Link href={post.link}>
                        <a className="text-red-300 flex justify-center items-center gap-x-2 hover:underline">
                          Link <FiExternalLink />
                        </a>
                      </Link>
                    </p>
                  </td>
                  <td className="p-3">
                    <p>{post.Subject?.name}</p>
                  </td>
                  <td className="p-3">
                    <p>{post.Subject?.code}</p>
                  </td>
                  <td className="p-3">
                    <p>{post.university}</p>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={(e) => {
                        setData({
                          title: post.title,
                          description: post.description,
                          id: post.id,
                          link: post.link,
                          subjectname: post.Subject?.name!,
                          subjectcode: post.Subject?.code!,
                          university: post.university!,
                        });
                        setOpen(true);
                      }}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Update
                    </button>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        deletePost.mutate(
                          { id: post.id },
                          {
                            onSuccess(data) {
                              utils.invalidateQueries(["post.allposts"]);
                            },
                          }
                        );
                      }}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <UpdatePost open={open} setOpen={setOpen} data={data} setData={setData} />
    </div>
  );
};

export default ProfilePosts;

import React from "react";
import { Fragment, useState } from "react";
import { trpc } from "../../utils/trpc";
import toast from "react-hot-toast";
import { Dialog, Transition } from "@headlessui/react";

export default function Example({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [data, setData] = useState({
    title: "",
    description: "",
    link: "",
    subjectname: "",
    subjectcode: "",
    university: "",
  });
  const utils = trpc.useContext();
  const submitData = trpc.useMutation(["post.createpost"]);
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="bg-white max-w-[40rem] min-w-[15rem] rounded-lg shadow-xl m-4 px-8 py-4">
                <div className="relative gap-5">
                  <label htmlFor="title" className="text-gray-700 flex mb-2">
                    Post Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    className=" rounded-lg border-gray-600 flex-1 appearance-none border w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    name="title"
                    value={data.title}
                    onChange={(e) =>
                      setData({ ...data, title: e.target.value })
                    }
                    placeholder="Title of Post"
                  />
                  <label
                    htmlFor="description"
                    className="text-gray-700 flex mt-5 mb-2"
                  >
                    Post Description
                  </label>
                  <textarea
                    id="description"
                    className=" rounded-lg border border-gray-600 flex-1 appearance-none w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    name="description"
                    value={data.description}
                    onChange={(e) =>
                      setData({ ...data, description: e.target.value })
                    }
                    placeholder="Description of Post"
                  />
                  <label
                    htmlFor="link"
                    className="text-gray-700 flex mb-2 mt-5"
                  >
                    Link for the Post
                  </label>
                  <input
                    type="text"
                    id="link"
                    className=" rounded-lg flex-1 appearance-none border border-gray-600 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    name="link"
                    value={data.link}
                    onChange={(e) => setData({ ...data, link: e.target.value })}
                    placeholder="Link to the Post"
                  />
                  <label
                    htmlFor="subjectname"
                    className="text-gray-700 flex mb-2 mt-5"
                  >
                    Subject Name
                  </label>
                  <input
                    type="text"
                    id="subjectname"
                    className=" rounded-lg flex-1 appearance-none border border-gray-600 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    name="subjectname"
                    value={data.subjectname}
                    onChange={(e) =>
                      setData({ ...data, subjectname: e.target.value })
                    }
                    placeholder="Name of the Subject"
                  />
                  <label
                    htmlFor="subjectcode"
                    className="text-gray-700 flex mb-2 mt-5"
                  >
                    Subject Code
                  </label>
                  <input
                    type="text"
                    id="subjectcode"
                    className=" rounded-lg flex-1 appearance-none border border-gray-600 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    name="subjectcode"
                    value={data.subjectcode}
                    onChange={(e) =>
                      setData({ ...data, subjectcode: e.target.value })
                    }
                    placeholder="Subject Code"
                  />
                  <label
                    htmlFor="subjectcode"
                    className="text-gray-700 flex mb-2 mt-5"
                  >
                    University Name
                  </label>
                  <input
                    type="text"
                    id="university"
                    className=" rounded-lg flex-1 appearance-none border border-gray-600 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    name="university"
                    value={data.university}
                    onChange={(e) =>
                      setData({ ...data, university: e.target.value })
                    }
                    placeholder="University"
                  />
                  <div className="px-4 py-3 mt-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={(e) => {
                        e.preventDefault();
                        if (
                          !data.title ||
                          !data.description ||
                          !data.link ||
                          !data.subjectcode ||
                          !data.subjectname
                        ) {
                          alert("Please fill all the fields");
                        } else {
                          submitData.mutate(
                            {
                              ...data,
                            },
                            {
                              onSuccess(data) {
                                utils.invalidateQueries(["post.allposts"]);
                                setOpen(false);
                                toast.success("Post Created Successfully");
                              },
                            }
                          );
                        }
                      }}
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

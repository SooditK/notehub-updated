import { Likes, Post, Subject, User } from "@prisma/client";
import React from "react";
import { trpc } from "../../utils/trpc";
import { AiOutlineSearch } from "react-icons/ai";
import SearchResult from "../SearchResult/SearchResult";

const Hero = () => {
  const utils = trpc.useContext();
  const [search, setSearch] = React.useState("");
  const mutation = trpc.useQuery(["search.notes", { text: search }]);
  const [result, setResult] = React.useState<
    (Post & { Subject: Subject | null; Likes: Likes[]; author: User | null })[]
  >([]);

  return (
    <section className="bg-white ">
      <div className="container px-6 py-16 mx-auto text-center">
        <div className="max-w-lg mx-auto">
          <h1 className="font-extrabold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
            Welcome to NotesHub
          </h1>
          <p className="mt-6 text-gray-700">
            A simple app to keep & share your notes. Create, edit, delete and
            share them all in one place.
          </p>
          <div className="w-full flex max-w-xl mx-auto mt-6 bg-transparent border rounded-md dark:border-gray-700 focus-within:border-blue-400 focus-within:ring focus-within:ring-blue-300 dark:focus-within:border-blue-300 focus-within:ring-opacity-40">
            <input
              className="w-full p-2 text-gray-900 "
              placeholder="Search notes"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button
              className="px-3 text-gray-900 bg-indigo-400 border-0"
              onClick={(e) => {
                e.preventDefault();
                utils
                  .fetchQuery(["search.notes", { text: search }])
                  .then((data) => {
                    setResult(data);
                  });
              }}
            >
              <AiOutlineSearch
                style={{
                  fontSize: "1.5rem",
                  color: "white",
                }}
              />
            </button>
          </div>
        </div>
        <div className="my-3 text-gray-600">
          TIP: You can search for Subject Name, Subject Code, University Name
          <br />
          For e.g: Sample, SM101, Sample University
        </div>
      </div>
      <SearchResult search={search} posts={result} setResult={setResult} />
    </section>
  );
};

export default Hero;

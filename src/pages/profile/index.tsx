import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';
import { authOptions } from '../api/auth/[...nextauth]';
import { unstable_getServerSession } from 'next-auth/next';
import Header from '../../components/Header/Header';
import React from 'react';
import { MdOutlineCreateNewFolder } from 'react-icons/md';
import ProfilePosts from '../../components/Table/ProfilePosts';
import CreatePost from '../../components/CreatePost/CreatePost';

const Profile = () => {
  const [open, setOpen] = React.useState(false);
  const { data: session } = useSession();
  return (
    <>
      <Header />
      <div className="flex justify-center items-center flex-col gap-4">
        <div className="mx-auto mt-4 max-w-xs bg-white rounded-lg shadow-lg dark:bg-gray-800">
          <img
            className="w-full rounded-lg h-56 object-cover"
            src={`https://avatars.dicebear.com/api/miniavs/${session?.user?.name}.svg`}
            alt={session?.user?.name!}
          />
          <div className="py-5 text-center">
            <a
              href="#"
              className="block text-2xl font-bold text-gray-800 dark:text-white"
            >
              {session?.user?.name!}
            </a>
            <span className="text-sm text-gray-700 dark:text-gray-200">
              {session?.user?.email!}
            </span>
          </div>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="flex items-center px-2 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
        >
          <MdOutlineCreateNewFolder className="w-6 h-6 mr-2" />
          <span className="mx-1">Create Notes</span>
        </button>
        <ProfilePosts />
        <CreatePost open={open} setOpen={setOpen} />
      </div>
    </>
  );
};

export default Profile;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

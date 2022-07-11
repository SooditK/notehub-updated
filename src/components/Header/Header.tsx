import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { useSession, signOut } from "next-auth/react";
import { RiBook2Fill } from "react-icons/ri";
import Dropdown from "./Dropdown";
import Link from "next/link";

export default function Header() {
  const { data: session } = useSession();
  return (
    <Disclosure as="nav" className="bg-white shadow">
      <>
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex justify-between h-16">
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0 flex items-center">
                <RiBook2Fill className="block lg:hidden h-8 w-auto" />
                <RiBook2Fill className="hidden lg:block h-8 w-auto" />
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link href="/">
                  <a className="border-transparent text-black inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    NotesHub
                  </a>
                </Link>
                <Link href="/profile">
                  <a className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Dashboard
                  </a>
                </Link>
                <Link href="https://github.com/SooditK/noteshub-2.0">
                  <a className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Github
                  </a>
                </Link>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* Profile dropdown */}
              {session ? (
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={String(session?.user?.image)}
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        <Link href="/profile">
                          <a className="block px-4 py-2 text-sm text-gray-700">
                            Your Profile
                          </a>
                        </Link>
                      </Menu.Item>
                      <Menu.Item>
                        <Link href="https://github.com/SooditK/noteshub-2.0">
                          <a className="block px-4 py-2 text-sm text-gray-700">
                            Github
                          </a>
                        </Link>
                      </Menu.Item>
                      <Menu.Item>
                        <button
                          onClick={() => signOut()}
                          className="block px-4 py-2 text-sm text-gray-700"
                        >
                          Sign out
                        </button>
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              ) : (
                <Dropdown />
              )}
            </div>
          </div>
        </div>
      </>
    </Disclosure>
  );
}

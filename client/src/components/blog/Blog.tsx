import Image from "next/image";
import { Search } from "lucide-react";
import { CustomMenu, Posts, tag } from "@/constants/Blog";
import Link from "next/link";

export default function Blog() {
  return (
    <section className="py-24   bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-[0.8fr_2.5fr] gap-8 ">
          <div className="space-y-8">
            <div className="border border-gray-300 px-6 py-6 space-y-2">
              <h1 className="text-2xl font-bold font-lato">Search</h1>
              <div className="relative w-full ">
                <input
                  type="text"
                  placeholder="Search our store"
                  className="w-full  p-1 border border-gray-300 outline-none text-[var(--select-color)]"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 ">
                  <Search className="h-3 w-3 font-bold" />
                </button>
              </div>
            </div>

            <div className="border border-gray-300 px-6 py-6 space-y-2">
              <h1 className="text-xl font-medium font-lato">Custome Memu</h1>
              <div className="space-y-4  ">
                {CustomMenu.map((item, index) => (
                  <Link
                    href={item.href}
                    key={index}
                    className="text-[var(--text-muted)] flex flex-col hover:text-[var(--color-accent)] "
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="border border-gray-300 px-6 py-6 space-y-2">
              <h3 className="text-lg font-semibold mb-3">Recent Post</h3>
              <ul className="space-y-4">
                {Posts.slice(0, 3).map((post, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 border-b pb-3 last:border-none"
                  >
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={60}
                      height={60}
                      className="object-cover"
                    />
                    <div>
                      <Link
                        href={post.title}
                        className="font-bold font-lato text-sm text-black line-clamp-1 hover:text-[var(--color-accent)]"
                      >
                        {post.title}
                      </Link>
                      <p className="text-xs text-muted">jan 21,2019</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-gray-300 px-6 py-6 space-y-2">
              <h1 className="text-xl font-medium font-lato">Archive</h1>
              <h1 className="text-sm font-medium font-lato">January 2019</h1>
              <div className="space-y-4 ">
                {Posts.map((item, index) => (
                  <Link
                    href={item.title}
                    key={index}
                    className="text-[var(--text-muted)] flex flex-col hover:text-[var(--color-accent)] "
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
              <h1 className="text-sm font-medium font-lato mt-4">
                January 2018
              </h1>
              <div className="space-y-4 ">
                {Posts.map((item, index) => (
                  <Link
                    href={item.title}
                    key={index}
                    className="text-[var(--text-muted)] flex flex-col hover:text-[var(--color-accent)] "
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>

            <div className="border border-gray-300 px-6 py-6 space-y-2">
              <h1 className="text-xl font-medium font-lato">Tags</h1>
              <div className="space-y-4 space-x-2">
                {tag.map((item, index) => (
                  <button
                    key={index}
                    className="border border-gray-300 text-muted rounded px-2 text-md "
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 ">
            {Posts.map((post, index) => (
              <div key={index}>
                <div className="aspect-auto flex items-center justify-center pb-3 ">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={400}
                    height={257}
                    className="object-cover transition-colors duration-300 hover:brightness-50"
                  />
                </div>
                <div className="pb-3">
                  <h3 className="text-xl font-light text-gray-900 font-rubik px-2">
                    {post.title}
                  </h3>
                </div>
                <div className="pb-3 flex items-center">
                  <h3 className="text-sm font-light text-gray-900 font-rubik px-2 flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                      className="w-4 h-4"
                    >
                      <path d="M18 20a6 6 0 0 0-12 0" />
                      <circle cx="12" cy="10" r="4" />
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                    Pataku Demo Admin
                  </h3>
                  <span>/</span>
                  <h3 className="text-sm font-light text-gray-900 font-rubik px-2 flex gap-2 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4"
                    >
                      <path d="M8 2v4" />
                      <path d="M16 2v4" />
                      <rect width="18" height="18" x="3" y="4" rx="2" />
                      <path d="M3 10h18" />
                      <path d="M8 14h.01" />
                      <path d="M12 14h.01" />
                      <path d="M16 14h.01" />
                      <path d="M8 18h.01" />
                      <path d="M12 18h.01" />
                      <path d="M16 18h.01" />
                    </svg>{" "}
                    January 21, 2019
                  </h3>
                </div>
                <div className="pb-3 px-2">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Sed, ipsum deleniti repellendus nam deserunt vitae ullam
                    amet quos! Nesciunt, quo....
                  </p>
                </div>
                <div className="pt-0">
                  <button className="px-2 text-gray-600 hover:text-gray-900">
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import { Posts } from "@/constants/Blog";

export default function BlogPosts() {
  const posts = Posts;

  return (
    <section className="py-6 ">
      <div className="mx-auto xl:max-w-6xl lg:max-w-4xl md:max-w-2xl px-4 sm:px-6 lg:px-0">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-[32px] font-bold font-lato text-black mb-2">
            Our{" "}
            <span className="italic text-[32px] font-light font-lato text-black">
              Blog
            </span>{" "}
            Posts
          </h2>
          <p className="text-muted font-rubik font-light text-base">
            Do you want to present posts in the best way to highlight
            interesting moments of your blog?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.slice(0, 3).map((post, index) => (
            <div key={index} className="overflow-hidden ">
              <div className="aspect-[4/3] flex items-center justify-center ">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={400}
                  height={300}
                  className="object-contain transition-colors duration-300 hover:brightness-50"
                />
              </div>

              <div className="pb-3">
                <h3 className="text-black font-rubik font-light text-base text-hover cursor-pointer">
                  {post.title}
                </h3>
              </div>
              <div className="border border-color w-12  cursor-pointer "></div>
              <div className="pt-2">
                <button className="text-muted font-rubik font-light text-sm text-hover cursor-pointer">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import { HomefeaturedCategories } from "@/constants";

export default function FeaturedCategories() {
  return (
    <section className="py-8 bg-white">
      <div className="mx-auto xl:max-w-6xl lg:max-w-4xl md:max-w-2xl px-4 sm:px-6 lg:px-0">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-[32px] font-bold font-lato text-black mb-2">
            Featured{" "}
            <span className="italic text-[32px] font-light font-lato text-black">
              Categories
            </span>
          </h2>
          <p className="text-muted font-rubik font-light text-base">
            Show all featured categories with products on home page.
          </p>
        </div>

        <div className=" grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full ">
            <Image
              src={HomefeaturedCategories[0].image}
              alt={HomefeaturedCategories[0].name}
              fill
              className="object-contain bg-white cursor-pointer "
            />
            <p className="absolute bottom-4 xl:left-4 lg:left-6 md:left-24 left-16 text-black font-rubik font-light text-[22px] cursor-pointer text-hover">
              {HomefeaturedCategories[0].name}
            </p>
          </div>

          {/* Right column */}
          <div className="grid grid-rows-[auto_1fr] gap-4 md:gap-6">
            {/* Top image */}
            <div className="relative aspect-[4/2]">
              <Image
                src={HomefeaturedCategories[1].image}
                alt={HomefeaturedCategories[1].name}
                fill
                className="object-contain bg-white"
              />
              <p className="absolute bottom-4 left-4 text-black  font-rubik font-light text-[22px] cursor-pointer text-hover">
                {HomefeaturedCategories[1].name}
              </p>
            </div>

            {/* Bottom two images */}
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {HomefeaturedCategories.slice(2).map((category, idx) => (
                <div key={idx} className="relative aspect-square">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-contain bg-white"
                  />
                  <p className="absolute bottom-4 left-4 text-black font-rubik font-light text-[22px] cursor-pointer text-hover">
                    {category.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

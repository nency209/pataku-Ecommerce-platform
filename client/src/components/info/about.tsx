import Image from "next/image";
import {
  aboutSections,
  featuresLeft,
  featuresRight,
  bannerimages,
} from "@/constants/pages";

export default function About() {
  return (
    <div className="mx-auto xl:max-w-6xl lg:max-w-4xl md:max-w-2xl px-4 sm:px-6 lg:px-0 py-6">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Image */}
        <div className="col-span-1">
          <Image
            src="/img/about-banner.jpg"
            width={800}
            height={517}
            alt="About banner"
            className="object-contain w-full"
          />
        </div>

        {/* Right Text */}
        <div className="col-span-1 space-y-12">
          <div className="px-0 sm:px-4 space-y-6">
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold">
              WELCOME TO PATAKU.
            </p>
            <p className="text-sm leading-relaxed">
              PATAKU provide how all this mistaken idea of denouncing pleasure
              and sing pain was born and will give you a complete account of the
              system, and expound the actual teachings of the great explorer of
              the truth, the master of human.
            </p>
          </div>

          <div className="px-0 sm:px-4 space-y-4">
            <p className="text-lg sm:text-xl font-bold">WELCOME TO PATAKU.</p>
            <p className="text-sm leading-relaxed">
              PATAKU provide how all this mistaken idea of denouncing pleasure
              and sing pain was born and will give you a complete account of the
              system, and expound the actual teachings of the great explorer of
              the truth, the master of human.
            </p>
          </div>
        </div>
      </div>

      {/* Banner Images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-8">
        {bannerimages.map((product, index) => (
          <Image
            key={index}
            src={product.image}
            alt={`banner-${index}`}
            width={380}
            height={230}
            className="w-full object-cover border rounded-md"
          />
        ))}
      </div>

      {/* About Sections */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        {aboutSections.map((section, i) => (
          <div key={i} className="space-y-3">
            <p className="text-xl md:text-2xl font-lato font-bold">
              {section.title}
            </p>
            <p className="text-sm font-rubik font-light leading-relaxed">
              {section.text}
            </p>
          </div>
        ))}
      </div>

      {/* Heading Section */}
      <div className="space-y-3 mb-8">
        <p className="text-lg sm:text-xl md:text-2xl font-lato font-bold">
          YOU CAN CHOOSE US BECAUSE <br className="hidden sm:block" />
          WE ALWAYS PROVIDE IMPORTANCE...
        </p>
        <p className="text-sm font-rubik font-light leading-relaxed">
          PATAKU provide how all this mistaken idea of denouncing pleasure and
          sing pain was born <br className="hidden sm:block" />
          will give you a complete account of the system, and expound the actual
        </p>
      </div>

      {/* Features + Right Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.7fr] gap-12 lg:gap-20">
        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div className="space-y-6">
            {featuresLeft.map((leftsec, i) => (
              <div key={i} className="space-y-2">
                <p className="text-base sm:text-lg font-bold font-lato">
                  {leftsec.title}
                </p>
                <p className="text-sm font-light font-rubik leading-relaxed">
                  {leftsec.text}
                </p>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            {featuresRight.map((rightsec, i) => (
              <div key={i} className="space-y-2">
                <p className="text-base sm:text-lg font-bold font-lato">
                  {rightsec.title}
                </p>
                <p className="text-sm font-light font-rubik leading-relaxed">
                  {rightsec.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Image */}
        <div className="relative w-full h-64 sm:h-80 lg:h-auto border rounded-md">
          <Image
            src="/img/home3-banner8.jpg"
            fill
            alt="About banner"
            className="object-cover rounded-md"
          />
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";

export default function PromotionalBanner() {
  return (
    <section className="py-8 ">
      <div className="relative w-full">
        {/* Background Image */}
        <div className="relative w-full h-[280px] sm:h-[360px] md:h-[420px]">
          <Image
            src="/img/fullwidth-banner-1.jpg"
            alt="promotional banner"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
            priority
          />
        </div>

        {/* Text content */}
        <div
          className="
            absolute
            top-12 sm:top-16 lg:top-24 
            left-1/2 -translate-x-1/2 
            xl:left-96 xl:translate-x-0
            lg:left-20 lg:translate-x-0
            md:left-20 md:translate-x-0
            xl:w-[40%] md:w-[60%] sm:w-[90%] w-[100%]
          "
        >
          <div className="space-y-6 text-center lg:text-left">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-light font-rubik text-[#434343] italic">
              It&apos;s your job to have the idea. It&apos;s{" "}
              <br className="hidden lg:block" />
              ours to make it happen.
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted font-rubik">
              We are a Melbourne based furniture maker helping{" "}
              <br className="hidden sm:block" />
              people bring their ideas to life.
            </p>
            <button className="text-base sm:text-lg font-light font-rubik border-t border-black text-[#434343] cursor-pointer text-hover justify-center items-center flex py-3 sm:py-4">
              View our products
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 28 28"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

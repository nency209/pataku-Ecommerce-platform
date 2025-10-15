import Image from "next/image";

export default function LivingRoomBanner() {
  return (
    <section className="">
      <div className=" max-w-6xl mx-auto ">
        <div className="relative w-full ">
          <div className="relative w-full h-[200px] lg:h-[200px]">
            <Image
              src="/img/container-width-banner-notext.jpg"
              alt="promotional banner"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Right side - Text content */}
          <div className="absolute top-4 right-32   space-y-2  ">
            <p className="text-2xl font-bold text-[#949494] leading-tight">
              Living Room Furniture
            </p>
            <p className="text-4xl  font-normal text-[#C16B6A]">
              Up to 50% Off
            </p>
            <button className="w-full border border-b-black py-2 sm:w-auto text-[#949494] font-normal">
              Shop The Latest Style
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

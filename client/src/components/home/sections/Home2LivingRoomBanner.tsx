import Image from "next/image";

export default function Home2LivingRoomBanner() {
  return (
   <section className="py-6 ">
      <div className="mx-auto xl:max-w-6xl lg:max-w-4xl md:max-w-2xl px-4 sm:px-6 lg:px-0">
        <div className="relative w-full ">
          <div className="relative w-full h-[100px] lg:h-[200px] xl:h-[200px] ">
            <Image
              src="/img/img3_home2.jpg"
              alt="promotional banner"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

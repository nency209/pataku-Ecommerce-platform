import Image from "next/image";

export default function Home2Banner() {
  return (
    <section className=" py-6 ">
      <div className="mx-auto xl:max-w-6xl lg:max-w-4xl md:max-w-2xl px-4 sm:px-6 lg:px-0">
        <div className="relative w-full grid grid-cols-1 xl:grid-cols-2 gap-4 ">
          <div className="relative w-full h-[170px]">
            <Image
              src="/img/home2-banner6.jpg"
              alt="promotional banner"
              fill
              className="object-cover"
              priority
            />
          </div>

           <div className="relative w-full h-[170px] ">
            <Image
              src="/img/home2-banner7.jpg"
              alt="promotional banner"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

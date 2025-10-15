import Image from "next/image";

export default function Home2Brand() {
  return (
    <section className=" py-6 ">
      <div className="mx-auto xl:max-w-6xl lg:max-w-4xl md:max-w-2xl px-4 sm:px-6 lg:px-0">
        <div className="relative w-full grid grid-cols-2 md:grid-cols-3  lg:grid-cols-3 xl:grid-cols-6 gap-4 border py-8 mb-20">
          <div className="relative w-full h-16  ">
            <Image
              src="/img/brand_1.jpg"
              alt="promotional banner"
              fill
              className="object-contain"
              priority
            />
          </div>

           <div className="relative w-full h-16">
            <Image
              src="/img/brand_2.jpg"
              alt="promotional banner"
              fill
              className="object-contain"
              priority
            />
          </div>

          <div className="relative w-full h-16">
            <Image
              src="/img/brand_3.jpg"
              alt="promotional banner"
              fill
              className="object-contain"
              priority
            />
          </div>

           <div className="relative w-full h-16">
            <Image
              src="/img/brand_4.jpg"
              alt="promotional banner"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="relative w-full h-16">
            <Image
              src="/img/brand_5.jpg"
              alt="promotional banner"
              fill
              className="object-contain"
              priority
            />
          </div>

           <div className="relative w-full h-16">
            <Image
              src="/img/brand_5.jpg"
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

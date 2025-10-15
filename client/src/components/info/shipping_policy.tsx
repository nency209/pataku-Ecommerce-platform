import { shippingPolicy } from "@/constants/pages";
export default function ShippingPolicy() {
  return (
    <div className="mx-auto xl:max-w-6xl lg:max-w-4xl md:max-w-2xl px-4 sm:px-6 lg:px-0 space-y-8 py-6">
      <h2 className="text-3xl  font-bold font-rubik mb-8">
        Shipping policy for our store
      </h2>
      {shippingPolicy.map((section, index) => {
        if (section.type === "paragraph") {
          return <p key={index} className="text-sm  font-lato light">{section.content}</p>;
        }

        if (section.type === "list") {
          return (
            <ul
              key={index}
              className="text-sm space-y-2 list-[circle] list-inside font-lato light"
            >
              {(section.content as string[]).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          );
        }
      })}
    </div>
  );
}

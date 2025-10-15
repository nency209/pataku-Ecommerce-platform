export default function SizeChart() {
  const sizes = {
    UK: [18, 20, 22, 24, 26],
    European: [46, 48, 50, 52, 54],
    USA: [14, 16, 18, 20, 22],
    Australia: [28, 10, 12, 14, 16],
    Canada: [24, 18, 14, 42, 36],
  };

  const sizeKeys = Object.keys(sizes) as (keyof typeof sizes)[];

  return (
   <div className="mx-auto xl:max-w-6xl lg:max-w-4xl md:max-w-2xl px-4 sm:px-6 lg:px-0">
      <h2 className="text-3xl  font-bold font-lato mb-4">Size Chart</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-color ">
          <tbody>
            {sizeKeys.map((region) => (
              <tr key={region}>
                <td className="px-4 py-3 border font-rubik font-light text-sm border-color  ">
                  {region}
                </td>
                {sizes[region].map((val, idx) => (
                  <td
                    key={idx}
                    className="px-4 py-2 border border-color  font-lato font-light text-sm"
                  >
                    {val}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

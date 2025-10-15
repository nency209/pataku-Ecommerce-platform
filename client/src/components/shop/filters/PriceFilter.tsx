export default function PriceFilter({ filters, setFilters }: any) {
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setFilters((f: any) => {
      let min = Math.max(0, value);
      let max = f.price[1];
      if (min > max) max = min;
      return { ...f, price: [min, max] };
    });
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setFilters((f: any) => {
      let min = f.price[0];
      let max = Math.max(value, min);
      return { ...f, price: [min, max] };
    });
  };

  return (
    <div className="border border-color flex flex-col justify-center items-center space-y-2 py-6">
      <h4 className="font-medium font-rubik text-xl">Price</h4>
      <div className="flex items-center gap-2 text-sm font-rubik text-muted">
        <span>₹</span>
        <input
          type="number"
          min={0}
          value={filters.price[0]}
          onChange={handleMinChange}
          className="w-20 border border-color p-1 rounded"
        />
        <span>-</span>
        <span>₹</span>
        <input
          type="number"
          min={0}
          value={filters.price[1]}
          onChange={handleMaxChange}
          className="w-20 border border-color p-1 rounded"
        />
      </div>

      <button
        onClick={() => setFilters((f: any) => ({ ...f, price: [0, 50000] }))}
        className="text-xs text-blue-600 hover:underline mt-2"
      >
        Reset
      </button>
    </div>
  );
}

export default function AvailabilityFilter({ filters, setFilters }: any) {
  const handleChange = (value: string) => {
    setFilters((f: any) => ({
      ...f,
      availability: f.availability === value ? "" : value, // toggle off
    }));
  };

  return (
    <div className="border border-color flex flex-col justify-center items-center space-y-2 py-6">
      <h4 className="font-medium font-rubik text-xl">Availability</h4>
      <div className="space-y-2 text-sm font-rubik text-muted">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={filters.availability === "in"}
            onChange={() => handleChange("in")}
          />
          In Stock
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={filters.availability === "low"}
            onChange={() => handleChange("low")}
          />
          Low Stock
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={filters.availability === "out"}
            onChange={() => handleChange("out")}
          />
          Out of Stock
        </label>
      </div>
    </div>
  );
}

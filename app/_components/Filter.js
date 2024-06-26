"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter() {
  const searchParams = useSearchParams();

  const router = useRouter();

  const pathname = usePathname();

  const activeFilter = searchParams.get("capacity") ?? "all";

  const handleFilterChange = (filter) => {
    const params = new URLSearchParams(searchParams);

    params.set("capacity", filter);

    router.push(pathname + "?" + params, { scroll: false });
  };

  return (
    <div className="border border-primary-800 flex">
      <Button
        filter="all"
        handleFilterChange={handleFilterChange}
        activeFilter={activeFilter}
      >
        All Cabins
      </Button>
      <Button
        filter="small"
        handleFilterChange={handleFilterChange}
        activeFilter={activeFilter}
      >
        2-3 guests
      </Button>
      <Button
        filter="medium"
        handleFilterChange={handleFilterChange}
        activeFilter={activeFilter}
      >
        4-7 guests
      </Button>
      <Button
        filter="large"
        handleFilterChange={handleFilterChange}
        activeFilter={activeFilter}
      >
        8-12 guests
      </Button>
    </div>
  );
}

function Button({ filter, handleFilterChange, activeFilter, children }) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${
        activeFilter === filter ? "bg-primary-600" : ""
      }`}
      onClick={() => handleFilterChange(filter)}
    >
      {children}
    </button>
  );
}

export default Filter;

"use client";

import { createContext, useContext, useState } from "react";

const DateContext = createContext();

function DateProvider({ children }) {
  const [range, setRange] = useState({
    from: undefined,
    to: undefined,
  });

  const resetRange = function () {
    setRange({
      from: undefined,
      to: undefined,
    });
  };
  return (
    <DateContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </DateContext.Provider>
  );
}

const useDate = function () {
  const data = useContext(DateContext);

  if (data === undefined)
    throw new Error("Date Context used outside the provider");

  return data;
};

export { useDate };

export default DateProvider;

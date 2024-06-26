"use client";

import { differenceInDays } from "date-fns";
import { useDate } from "./DateContext";
import { createBooking } from "../_lib/actions";
import Image from "next/image";
import { Button } from "./Button";

function ReservationForm({ cabin, user }) {
  // CHANGE
  const { _id: cabinId, maxCapacity, regularPrice, discount } = cabin;

  const { range } = useDate();

  const startDate = range.from;
  const endDate = range.to;

  const numNights = differenceInDays(endDate, startDate);

  const cabinPrice = numNights * (regularPrice - discount);

  const { resetRange } = useDate();

  return (
    <div className="scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center ">
        <p>Logged in as</p>

        <div className=" flex gap-3 items-center ">
          <Image
            // Important to display google profile images
            referrerPolicy="no-referrer"
            className="h-8 rounded-full "
            src={user.image}
            alt={user.name}
            height={30}
            width={30}
          />
          <p>{user.name}</p>
        </div>
      </div>

      <form
        className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
        action={(data) => {
          createBooking({
            observations: data.get("observations"),
            numGuests: data.get("numGuests"),
            startDate,
            endDate,
            numNights,
            cabinPrice,
            cabin: cabinId,
            guest: user.guestId,
          });

          resetRange();
        }}
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <p className="text-primary-300 text-base">Start by selecting dates</p>

          <Button updating="Reserving.." buttonname="Reserve Now" />
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;

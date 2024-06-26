"use client";

import { TrashIcon } from "@heroicons/react/24/solid";
import { deleteBooking } from "../_lib/actions";
import { useFormStatus } from "react-dom";
import { useTransition } from "react";

function DeleteReservation({ bookingId }) {
  const [pending, startTransition] = useTransition();

  const handleClick = () => startTransition(deleteBooking(bookingId));

  return (
    <button
      onClick={handleClick}
      className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
      disabled={pending}
    >
      <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
      <span className="mt-1">{pending ? "Deleting.." : "Delete"}</span>
    </button>
  );
}

export default DeleteReservation;

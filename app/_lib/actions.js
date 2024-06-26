"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const baseUrl = process.env.BASE_URL;

const { signIn, signOut, auth } = require("./auth");

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateGuest(formData) {
  const session = await auth();

  if (!session) throw new Error("You must be logged in");

  const [nationality, countryFlag] = formData.get("nationality").split("%");
  const nationalId = formData.get("nationalID");

  const res = await fetch(baseUrl + "guests/" + session.user.guestId, {
    method: "PATCH",
    body: JSON.stringify({
      nationalId,
      nationality,
      countryFlag,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  revalidatePath("/account/profile");
}

export async function deleteBooking(id) {
  const res = await fetch(baseUrl + "bookings/" + id, {
    method: "DELETE",
  });

  const data = await res.json();

  redirect("/account/reservations");
}
export async function createBooking(booking) {
  const res = await fetch(baseUrl + "bookings/", {
    method: "POST",
    body: JSON.stringify(booking),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();

  revalidatePath("/cabins/" + booking.cabin);
  revalidatePath("/account/reservations");
  redirect("/account/reservations");
}

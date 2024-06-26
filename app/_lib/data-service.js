import { eachDayOfInterval } from "date-fns";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";
import { revalidate } from "../about/page";

/////////////
// GET

const baseUrl = process.env.BASE_URL;

export async function getCabin(id) {
  const res = await fetch(baseUrl + "cabins/" + id, {
    method: "GET",
  });

  const data = await res.json();

  if (data.status == "error") notFound();

  return data;
}

export async function getCabinPrice(id) {
  const { data, error } = await supabase
    .from("cabins")
    .select("regularPrice, discount")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
  }

  return data;
}

export const getCabins = async function () {
  const res = await fetch(baseUrl + "cabins/", {
    method: "GET",
  });

  const data = await res.json();

  return data;
};

// Guests are uniquely identified by their email address
export async function getUserFromEmail(email) {
  const res = await fetch(baseUrl + "guests/" + email, {
    method: "GET",
  });

  const { data } = await res.json();

  // No error here! We handle the possibility of no guest in the sign in callback
  return data;
}

export async function getBooking(id) {
  const res = await fetch(baseUrl + "bookings/user/" + id, {
    method: "GET",
  });

  const data = await res.json();

  return data;
}

export async function getBookedDatesByCabinId(cabinId) {
  let today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  today = today.toISOString();

  // Getting all bookings
  const res = await fetch(baseUrl + "bookings", {
    method: "GET",
  });

  const { data: bookings, status } = await res.json();

  if (status === "error") {
    throw new Error("Bookings could not get loaded");
  }

  const data = bookings.filter((booking) => booking.cabin._id === cabinId);

  // Converting to actual dates to be displayed in the date picker
  const bookedDates = data
    .map((booking) => {
      return eachDayOfInterval({
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
      });
    })
    .flat();

  return bookedDates;
}

export async function getSettings() {
  const res = await fetch(baseUrl + "settings/", {
    method: "GET",
  });

  const { data: settings, status } = await res.json();

  if (status == "error") {
    throw new Error("Settings could not be loaded");
  }

  return settings;
}

export async function getCountries() {
  try {
    const res = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,flag"
    );
    const countries = await res.json();

    return countries;
  } catch {
    throw new Error("Could not fetch countries");
  }
}

/////////////
// CREATE

export async function createGuest(newGuest) {
  const res = await fetch(baseUrl + "guests/", {
    method: "POST",
    body: JSON.stringify(newGuest),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  return data;
}

export async function createBooking(newBooking) {
  const { data, error } = await supabase
    .from("bookings")
    .insert([newBooking])
    // So that the newly created object gets returned!
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }

  return data;
}

/////////////
// UPDATE

// The updatedFields is an object which should ONLY contain the updated data
export async function updateGuest(id, updatedFields) {
  const { data, error } = await supabase
    .from("guests")
    .update(updatedFields)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }
  return data;
}

export async function updateBooking(id, updatedFields) {
  const { data, error } = await supabase
    .from("bookings")
    .update(updatedFields)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

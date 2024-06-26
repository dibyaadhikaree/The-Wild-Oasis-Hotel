// /* eslint-disable no-undef */

const Cabin = require("../models/cabinsModel");
const Guest = require("../models/guestsModel");
const Booking = require("../models/bookingsModel");

const { ObjectId } = require("mongodb");

const bookingData = [
  {
    created_at: "2024-04-25T19:09:02.438",
    startDate: "2024-05-15T00:00:00.000",
    endDate: "2024-05-22T00:00:00.000",
    cabinId: 1,
    guestId: 2,
    hasBreakfast: true,
    observations:
      "I have a gluten allergy and would like to request a gluten-free breakfast.",
    isPaid: false,
    numGuests: 1,
  },
  {
    created_at: "2024-04-12T19:09:02.439",
    startDate: "2024-04-22T00:00:00.000",
    endDate: "2024-05-02T00:00:00.000",
    cabinId: 1,
    guestId: 3,
    hasBreakfast: true,
    observations: "",
    isPaid: true,
    numGuests: 2,
  },
  {
    created_at: "2024-04-18T19:09:02.439",
    startDate: "2024-05-27T00:00:00.000",
    endDate: "2024-06-02T00:00:00.000",
    cabinId: 1,
    guestId: 4,
    hasBreakfast: false,
    observations: "",
    isPaid: false,
    numGuests: 2,
  },
  {
    created_at: "2024-03-31T19:09:02.439",
    startDate: "2024-03-31T00:00:00.000",
    endDate: "2024-04-16T00:00:00.000",
    cabinId: 2,
    guestId: 5,
    hasBreakfast: false,
    observations: "",
    isPaid: true,
    numGuests: 2,
  },
  {
    created_at: "2024-05-13T19:09:02.439",
    startDate: "2024-05-30T00:00:00.000",
    endDate: "2024-06-02T00:00:00.000",
    cabinId: 2,
    guestId: 6,
    hasBreakfast: true,
    observations: "",
    isPaid: true,
    numGuests: 2,
  },
  {
    created_at: "2024-05-10T19:09:02.439",
    startDate: "2024-06-17T00:00:00.000",
    endDate: "2024-07-02T00:00:00.000",
    cabinId: 2,
    guestId: 7,
    hasBreakfast: true,
    observations: "",
    isPaid: false,
    numGuests: 2,
  },
  {
    created_at: "2024-03-11T19:09:02.439",
    startDate: "2024-04-20T00:00:00.000",
    endDate: "2024-04-25T00:00:00.000",
    cabinId: 3,
    guestId: 8,
    hasBreakfast: true,
    observations: "",
    isPaid: true,
    numGuests: 4,
  },
  {
    created_at: "2024-05-13T19:09:02.439",
    startDate: "2024-05-13T00:00:00.000",
    endDate: "2024-05-15T00:00:00.000",
    cabinId: 3,
    guestId: 9,
    hasBreakfast: false,
    observations: "We will be bringing our small dog with us",
    isPaid: true,
    numGuests: 3,
  },
  {
    created_at: "2024-05-01T19:09:02.439",
    startDate: "2024-05-01T00:00:00.000",
    endDate: "2024-05-04T00:00:00.000",
    cabinId: 3,
    guestId: 10,
    hasBreakfast: true,
    observations: "",
    isPaid: true,
    numGuests: 4,
  },
  {
    created_at: "2024-04-15T19:09:02.439",
    startDate: "2024-05-11T00:00:00.000",
    endDate: "2024-05-23T00:00:00.000",
    cabinId: 4,
    guestId: 11,
    hasBreakfast: true,
    observations: "",
    isPaid: true,
    numGuests: 4,
  },
  {
    created_at: "2024-05-14T19:09:02.439",
    startDate: "2024-05-27T00:00:00.000",
    endDate: "2024-06-01T00:00:00.000",
    cabinId: 4,
    guestId: 12,
    hasBreakfast: true,
    observations: "",
    isPaid: false,
    numGuests: 4,
  },
  {
    created_at: "2024-05-12T19:09:02.439",
    startDate: "2024-06-02T00:00:00.000",
    endDate: "2024-06-03T00:00:00.000",
    cabinId: 4,
    guestId: 13,
    hasBreakfast: false,
    observations: "",
    isPaid: true,
    numGuests: 1,
  },
  {
    created_at: "2024-05-15T19:09:02.439",
    startDate: "2024-05-29T00:00:00.000",
    endDate: "2024-06-05T00:00:00.000",
    cabinId: 5,
    guestId: 14,
    hasBreakfast: true,
    observations: "",
    isPaid: false,
    numGuests: 5,
  },
  {
    created_at: "2024-05-09T19:09:02.439",
    startDate: "2024-05-09T00:00:00.000",
    endDate: "2024-05-11T00:00:00.000",
    cabinId: 5,
    guestId: 15,
    hasBreakfast: true,
    observations: "",
    isPaid: true,
    numGuests: 4,
  },
  {
    created_at: "2024-05-11T19:09:02.439",
    startDate: "2024-05-11T00:00:00.000",
    endDate: "2024-05-14T00:00:00.000",
    cabinId: 5,
    guestId: 16,
    hasBreakfast: false,
    observations: "",
    isPaid: true,
    numGuests: 6,
  },
  {
    created_at: "2024-05-12T19:09:02.439",
    startDate: "2024-05-15T00:00:00.000",
    endDate: "2024-05-26T00:00:00.000",
    cabinId: 6,
    guestId: 17,
    hasBreakfast: false,
    observations:
      "We will be checking in late, around midnight. Hope that's okay :)",
    isPaid: true,
    numGuests: 6,
  },
  {
    created_at: "2024-04-29T19:09:02.439",
    startDate: "2024-04-29T00:00:00.000",
    endDate: "2024-05-06T00:00:00.000",
    cabinId: 6,
    guestId: 18,
    hasBreakfast: true,
    observations: "I will need a rollaway bed for one of the guests",
    isPaid: true,
    numGuests: 4,
  },
  {
    created_at: "2024-04-27T19:09:02.439",
    startDate: "2024-05-11T00:00:00.000",
    endDate: "2024-05-14T00:00:00.000",
    cabinId: 6,
    guestId: 19,
    hasBreakfast: true,
    observations: "",
    isPaid: true,
    numGuests: 6,
  },
  {
    created_at: "2024-05-13T19:09:02.439",
    startDate: "2024-06-01T00:00:00.000",
    endDate: "2024-06-07T00:00:00.000",
    cabinId: 7,
    guestId: 20,
    hasBreakfast: false,
    observations: "",
    isPaid: false,
    numGuests: 8,
  },
  {
    created_at: "2024-05-08T19:09:02.439",
    startDate: "2024-06-24T00:00:00.000",
    endDate: "2024-07-04T00:00:00.000",
    cabinId: 7,
    guestId: 21,
    hasBreakfast: true,
    observations: "",
    isPaid: true,
    numGuests: 7,
  },
  {
    created_at: "2024-03-21T19:09:02.439",
    startDate: "2024-06-16T00:00:00.000",
    endDate: "2024-06-21T00:00:00.000",
    cabinId: 7,
    guestId: 22,
    hasBreakfast: true,
    observations: "",
    isPaid: true,
    numGuests: 6,
  },
  {
    created_at: "2024-05-07T19:09:02.439",
    startDate: "2024-05-10T00:00:00.000",
    endDate: "2024-05-15T00:00:00.000",
    cabinId: 8,
    guestId: 1,
    hasBreakfast: true,
    observations:
      "My wife has a gluten allergy so I would like to request a gluten-free breakfast if possible",
    isPaid: true,
    numGuests: 9,
  },
  {
    created_at: "2024-05-15T19:09:02.439",
    startDate: "2024-05-15T00:00:00.000",
    endDate: "2024-05-20T00:00:00.000",
    cabinId: 8,
    guestId: 23,
    hasBreakfast: true,
    observations:
      "I am celebrating my anniversary, can you arrange for any special amenities or decorations?",
    isPaid: true,
    numGuests: 10,
  },
  {
    created_at: "2024-05-05T19:09:02.439",
    startDate: "2024-05-25T00:00:00.000",
    endDate: "2024-05-28T00:00:00.000",
    cabinId: 8,
    guestId: 24,
    hasBreakfast: false,
    observations: "",
    isPaid: true,
    numGuests: 7,
  },
];

const imageUrl = "";

const cabinData = [
  {
    name: "001",
    maxCapacity: 2,
    regularPrice: 250,
    discount: 0,
    image: imageUrl + "cabin-001.jpg",
    description:
      "Discover the ultimate luxury getaway for couples in the cozy wooden cabin 001. Nestled in a picturesque forest, this stunning cabin offers a secluded and intimate retreat. Inside, enjoy modern high-quality wood interiors, a comfortable seating area, a fireplace and a fully-equipped kitchen. The plush king-size bed, dressed in fine linens guarantees a peaceful nights sleep. Relax in the spa-like shower and unwind on the private deck with hot tub.",
  },
  {
    name: "002",
    maxCapacity: 2,
    regularPrice: 350,
    discount: 25,
    image: imageUrl + "cabin-002.jpg",
    description:
      "Escape to the serenity of nature and indulge in luxury in our cozy cabin 002. Perfect for couples, this cabin offers a secluded and intimate retreat in the heart of a picturesque forest. Inside, you will find warm and inviting interiors crafted from high-quality wood, a comfortable living area, a fireplace and a fully-equipped kitchen. The luxurious bedroom features a plush king-size bed and spa-like shower. Relax on the private deck with hot tub and take in the beauty of nature.",
  },
  {
    name: "003",
    maxCapacity: 4,
    regularPrice: 300,
    discount: 0,
    image: imageUrl + "cabin-003.jpg",
    description:
      "Experience luxury family living in our medium-sized wooden cabin 003. Perfect for families of up to 4 people, this cabin offers a comfortable and inviting space with all modern amenities. Inside, you will find warm and inviting interiors crafted from high-quality wood, a comfortable living area, a fireplace, and a fully-equipped kitchen. The bedrooms feature plush beds and spa-like bathrooms. The cabin has a private deck with a hot tub and outdoor seating area, perfect for taking in the natural surroundings.",
  },
  {
    name: "004",
    maxCapacity: 4,
    regularPrice: 500,
    discount: 50,
    image: imageUrl + "cabin-004.jpg",
    description:
      "Indulge in the ultimate luxury family vacation in this medium-sized cabin 004. Designed for families of up to 4, this cabin offers a sumptuous retreat for the discerning traveler. Inside, the cabin boasts of opulent interiors crafted from the finest quality wood, a comfortable living area, a fireplace, and a fully-equipped gourmet kitchen. The bedrooms are adorned with plush beds and spa-inspired en-suite bathrooms. Step outside to your private deck and soak in the natural surroundings while relaxing in your own hot tub.",
  },
  {
    name: "005",
    maxCapacity: 6,
    regularPrice: 350,
    discount: 0,
    image: imageUrl + "cabin-005.jpg",
    description:
      "Enjoy a comfortable and cozy getaway with your group or family in our spacious cabin 005. Designed to accommodate up to 6 people, this cabin offers a secluded retreat in the heart of nature. Inside, the cabin features warm and inviting interiors crafted from quality wood, a living area with fireplace, and a fully-equipped kitchen. The bedrooms are comfortable and equipped with en-suite bathrooms. Step outside to your private deck and take in the natural surroundings while relaxing in your own hot tub.",
  },
  {
    name: "006",
    maxCapacity: 6,
    regularPrice: 800,
    discount: 100,
    image: imageUrl + "cabin-006.jpg",
    description:
      "Experience the epitome of luxury with your group or family in our spacious wooden cabin 006. Designed to comfortably accommodate up to 6 people, this cabin offers a lavish retreat in the heart of nature. Inside, the cabin features opulent interiors crafted from premium wood, a grand living area with fireplace, and a fully-equipped gourmet kitchen. The bedrooms are adorned with plush beds and spa-like en-suite bathrooms. Step outside to your private deck and soak in the natural surroundings while relaxing in your own hot tub.",
  },
  {
    name: "007",
    maxCapacity: 8,
    regularPrice: 600,
    discount: 100,
    image: imageUrl + "cabin-007.jpg",
    description:
      "Accommodate your large group or multiple families in the spacious and grand wooden cabin 007. Designed to comfortably fit up to 8 people, this cabin offers a secluded retreat in the heart of beautiful forests and mountains. Inside, the cabin features warm and inviting interiors crafted from quality wood, multiple living areas with fireplace, and a fully-equipped kitchen. The bedrooms are comfortable and equipped with en-suite bathrooms. The cabin has a private deck with a hot tub and outdoor seating area, perfect for taking in the natural surroundings.",
  },
  {
    name: "008",
    maxCapacity: 10,
    regularPrice: 1400,
    discount: 0,
    image: imageUrl + "cabin-008.jpg",
    description:
      "Experience the epitome of luxury and grandeur with your large group or multiple families in our grand cabin 008. This cabin offers a lavish retreat that caters to all your needs and desires. The cabin features an opulent design and boasts of high-end finishes, intricate details and the finest quality wood throughout. Inside, the cabin features multiple grand living areas with fireplaces, a formal dining area, and a gourmet kitchen that is a chef's dream. The bedrooms are designed for ultimate comfort and luxury, with plush beds and en-suite spa-inspired bathrooms. Step outside and immerse yourself in the beauty of nature from your private deck, featuring a luxurious hot tub and ample seating areas for ultimate relaxation and enjoyment.",
  },
];

const guestData = [
  {
    // id: 1000,
    fullName: "Jonas Schmedtmann",
    email: "hello@jonas.io",
    nationality: "Portugal",
    nationalID: "3525436345",
    countryFlag: "https://flagcdn.com/pt.svg",
  },
  {
    fullName: "Jonathan Smith",
    email: "johnsmith@test.eu",
    nationality: "Great Britain",
    nationalID: "4534593454",
    countryFlag: "https://flagcdn.com/gb.svg",
  },
  {
    fullName: "Jonatan Johansson",
    email: "jonatan@example.com",
    nationality: "Finland",
    nationalID: "9374074454",
    countryFlag: "https://flagcdn.com/fi.svg",
  },
  {
    fullName: "Jonas Mueller",
    email: "jonas@example.eu",
    nationality: "Germany",
    nationalID: "1233212288",
    countryFlag: "https://flagcdn.com/de.svg",
  },
  {
    fullName: "Jonas Anderson",
    email: "anderson@example.com",
    nationality: "Bolivia (Plurinational State of)",
    nationalID: "0988520146",
    countryFlag: "https://flagcdn.com/bo.svg",
  },
  {
    fullName: "Jonathan Williams",
    email: "jowi@gmail.com",
    nationality: "United States of America",
    nationalID: "633678543",
    countryFlag: "https://flagcdn.com/us.svg",
  },

  // GPT
  {
    fullName: "Emma Watson",
    email: "emma@gmail.com",
    nationality: "United Kingdom",
    nationalID: "1234578901",
    countryFlag: "https://flagcdn.com/gb.svg",
  },
  {
    fullName: "Mohammed Ali",
    email: "mohammedali@yahoo.com",
    nationality: "Egypt",
    nationalID: "987543210",
    countryFlag: "https://flagcdn.com/eg.svg",
  },
  {
    fullName: "Maria Rodriguez",
    email: "maria@gmail.com",
    nationality: "Spain",
    nationalID: "1098765321",
    countryFlag: "https://flagcdn.com/es.svg",
  },
  {
    fullName: "Li Mei",
    email: "li.mei@hotmail.com",
    nationality: "China",
    nationalID: "102934756",
    countryFlag: "https://flagcdn.com/cn.svg",
  },
  {
    fullName: "Khadija Ahmed",
    email: "khadija@gmail.com",
    nationality: "Sudan",
    nationalID: "1023457890",
    countryFlag: "https://flagcdn.com/sd.svg",
  },
  {
    fullName: "Gabriel Silva",
    email: "gabriel@gmail.com",
    nationality: "Brazil",
    nationalID: "109283465",
    countryFlag: "https://flagcdn.com/br.svg",
  },
  {
    fullName: "Maria Gomez",
    email: "maria@example.com",
    nationality: "Mexico",
    nationalID: "108765421",
    countryFlag: "https://flagcdn.com/mx.svg",
  },
  {
    fullName: "Ahmed Hassan",
    email: "ahmed@gmail.com",
    nationality: "Egypt",
    nationalID: "1077777777",
    countryFlag: "https://flagcdn.com/eg.svg",
  },
  {
    fullName: "John Doe",
    email: "johndoe@gmail.com",
    nationality: "United States",
    nationalID: "3245908744",
    countryFlag: "https://flagcdn.com/us.svg",
  },
  {
    fullName: "Fatima Ahmed",
    email: "fatima@example.com",
    nationality: "Pakistan",
    nationalID: "1089999363",
    countryFlag: "https://flagcdn.com/pk.svg",
  },
  {
    fullName: "David Smith",
    email: "david@gmail.com",
    nationality: "Australia",
    nationalID: "44450960283",
    countryFlag: "https://flagcdn.com/au.svg",
  },
  {
    fullName: "Marie Dupont",
    email: "marie@gmail.com",
    nationality: "France",
    nationalID: "06934233728",
    countryFlag: "https://flagcdn.com/fr.svg",
  },
  {
    fullName: "Ramesh Patel",
    email: "ramesh@gmail.com",
    nationality: "India",
    nationalID: "9875412303",
    countryFlag: "https://flagcdn.com/in.svg",
  },
  {
    fullName: "Fatimah Al-Sayed",
    email: "fatimah@gmail.com",
    nationality: "Kuwait",
    nationalID: "0123456789",
    countryFlag: "https://flagcdn.com/kw.svg",
  },
  {
    fullName: "Nina Williams",
    email: "nina@hotmail.com",
    nationality: "South Africa",
    nationalID: "2345678901",
    countryFlag: "https://flagcdn.com/za.svg",
  },
  {
    fullName: "Taro Tanaka",
    email: "taro@gmail.com",
    nationality: "Japan",
    nationalID: "3456789012",
    countryFlag: "https://flagcdn.com/jp.svg",
  },
  {
    fullName: "Abdul Rahman",
    email: "abdul@gmail.com",
    nationality: "Saudi Arabia",
    nationalID: "4567890123",
    countryFlag: "https://flagcdn.com/sa.svg",
  },
  {
    fullName: "Julie Nguyen",
    email: "julie@gmail.com",
    nationality: "Vietnam",
    nationalID: "5678901234",
    countryFlag: "https://flagcdn.com/vn.svg",
  },
  {
    fullName: "Sara Lee",
    email: "sara@gmail.com",
    nationality: "South Korea",
    nationalID: "6789012345",
    countryFlag: "https://flagcdn.com/kr.svg",
  },
  {
    fullName: "Carlos Gomez",
    email: "carlos@yahoo.com",
    nationality: "Colombia",
    nationalID: "7890123456",
    countryFlag: "https://flagcdn.com/co.svg",
  },
  {
    fullName: "Emma Brown",
    email: "emma@gmail.com",
    nationality: "Canada",
    nationalID: "8901234567",
    countryFlag: "https://flagcdn.com/ca.svg",
  },
  {
    fullName: "Juan Hernandez",
    email: "juan@yahoo.com",
    nationality: "Argentina",
    nationalID: "4343433333",
    countryFlag: "https://flagcdn.com/ar.svg",
  },
  {
    fullName: "Ibrahim Ahmed",
    email: "ibrahim@yahoo.com",
    nationality: "Nigeria",
    nationalID: "2345678009",
    countryFlag: "https://flagcdn.com/ng.svg",
  },
  {
    fullName: "Mei Chen",
    email: "mei@gmail.com",
    nationality: "Taiwan",
    nationalID: "3456117890",
    countryFlag: "https://flagcdn.com/tw.svg",
  },
];

const dotenv = require("dotenv");

dotenv.config({
  path: "../config.env",
});

const type = process.argv[2];

const mongoose = require("mongoose");

console.log(process.env.DB);

const db = process.env.DB.replace("<password>", process.env.DB_PASSWORD);

function generateRandomObjectId() {
  const id = new ObjectId();
  return id.toString();
}

function modifyData() {
  //cabins has name : 001 , 002
  //bookings
  //  : cabinId = 1
  //  : guestId = 1
  //create cabin id

  // In bookings
  // cabin.find(`00 + bookings.cabinId)) replace with booking.scabin : oid _id
  //  guest.find( el.guestId = booking.guestId )  replace with booking.guestId = oid

  //create guest id
  cabinData.forEach((cabin) => (cabin._id = generateRandomObjectId()));
  guestData.forEach((guest) => (guest._id = generateRandomObjectId()));

  bookingData.forEach((booking) => {
    booking.cabin = cabinData.find(
      (cabin) => booking.cabinId === Number(cabin.name)
    )._id;

    // console.log(booking.guestId);
    booking.guest = guestData[booking.guestId + 1]._id;
  });
}

modifyData();

//Connecting to database

mongoose.connect(db).then(() => {
  console.log("Connected to database");
});

async function importData() {
  await Cabin.create(cabinData);
  await Guest.create(
    guestData.map((data) => ({
      ...data,
      name: data.fullName,
      fullName: undefined,
    }))
  );
  await Booking.create(bookingData);

  //find all if of cabin guest and booking

  const bookings = await Booking.find();

  bookings.map(async (booking) => {
    cabinName = `00${booking.cabinId}`;
    guestIndex = booking.guestId;
    guest = guestData[guestIndex];

    const cabin = await Cabin.find({ name: cabinName });
    const guest = await Guest.find(guest);

    const updatedBooking = { cabin: cabin._id, guest: guest_id };

    const newBooking = await Booking.findByIdAndUpdate(
      booking._id,
      updatedBooking,
      { new: true }
    );

    console.log(newBooking);
  });

  console.log("Success");
  process.exit(0);
}
async function deleteData() {
  await Cabin.deleteMany({});
  await Guest.deleteMany({});
  await Booking.deleteMany({});
  console.log("Successfully deleted");
  process.exit(0);
}

if (type === "--import") {
  importData();
}
if (type === "--delete") {
  deleteData();
}

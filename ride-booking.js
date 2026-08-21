// ==========================================
// ALL SAMASTIPUR
// CODE 23 - REAL CUSTOMER BOOKING
// ==========================================

import {
  database,
  ref,
  push,
  set
} from "./firebase-config.js";


// ------------------------------------------
// Book Ride
// ------------------------------------------

async function bookRide(rideData) {

  if (!rideData.pickup || !rideData.drop) {
    throw new Error("Pickup और Drop जरूरी है");
  }

  const ridesRef = ref(database, "rides");

  const newRideRef = push(ridesRef);

  const rideId = newRideRef.key;

  const bookingId =
    "ASM" + Date.now().toString().slice(-6);

  const ride = {

    rideId: rideId,

    bookingId: bookingId,

    customerName:
      rideData.customerName || "Customer",

    customerMobile:
      rideData.customerMobile || "",

    pickup:
      rideData.pickup,

    drop:
      rideData.drop,

    rideType:
      rideData.rideType || "Auto Rickshaw",

    passengers:
      Number(rideData.passengers || 1),

    fare:
      Number(rideData.fare || 0),

    status:
      "searching_driver",

    driverId: "",

    driverName: "",

    driverMobile: "",

    driverLocation: {
      latitude: null,
      longitude: null
    },

    createdAt: Date.now(),

    updatedAt: Date.now()

  };


  await set(
    newRideRef,
    ride
  );


  localStorage.setItem(
    "allSamastipurCurrentRide",
    JSON.stringify(ride)
  );


  return ride;
}


// ------------------------------------------
// Export
// ------------------------------------------

export {
  bookRide
};


// ------------------------------------------
// Ready
// ------------------------------------------

console.log(
  "All Samastipur Booking Backend Ready!"
);

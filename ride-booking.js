// ==========================================
// ALL SAMASTIPUR
// CODE 21 - CUSTOMER RIDE BOOKING
// ==========================================

import {
  database,
  ref,
  push,
  set
} from "./firebase-config.js";


// Create Ride Booking
async function bookRide(rideData) {

  try {

    // Basic validation

    if (!rideData.pickup) {
      throw new Error("Pickup location required");
    }

    if (!rideData.drop) {
      throw new Error("Drop location required");
    }


    // Firebase rides location

    const ridesRef =
      ref(database, "rides");


    // Create unique Firebase ride ID

    const newRideRef =
      push(ridesRef);


    const rideId =
      newRideRef.key;


    // Booking ID

    const bookingId =
      "ASM" +
      Date.now()
        .toString()
        .slice(-6);


    // Ride information

    const ride = {

      rideId: rideId,

      bookingId: bookingId,

      customerName:
        rideData.customerName ||
        "Customer",

      customerMobile:
        rideData.customerMobile ||
        "",

      pickup:
        rideData.pickup,

      drop:
        rideData.drop,

      rideType:
        rideData.rideType ||
        "Auto Rickshaw",

      passengers:
        Number(rideData.passengers || 1),

      fare:
        Number(rideData.fare || 0),

      status:
        "searching_driver",

      driverId:
        "",

      driverName:
        "",

      driverMobile:
        "",

      driverLocation: {

        latitude: null,

        longitude: null

      },

      createdAt:
        Date.now(),

      updatedAt:
        Date.now()

    };


    // Save booking to Firebase

    await set(
      newRideRef,
      ride
    );


    // Save locally too

    localStorage.setItem(

      "allSamastipurCurrentRide",

      JSON.stringify(ride)

    );


    console.log(
      "Ride Booking Successful:",
      ride
    );


    return ride;


  } catch (error) {

    console.error(
      "Ride Booking Error:",
      error
    );


    throw error;

  }

}


// Make function available

window.AllSamastipurBooking = {

  bookRide: bookRide

};


console.log(
  "All Samastipur Booking System Ready!"
);

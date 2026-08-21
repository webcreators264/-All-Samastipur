// ==========================================
// ALL SAMASTIPUR
// CODE 22 - CUSTOMER FIREBASE CONNECTION
// ==========================================

import { bookRide } from "./ride-booking.js";


// ------------------------------------------
// Firebase Booking
// ------------------------------------------

async function createCustomerRide() {

  try {

    const pickup =
      document.getElementById("pickup")?.value.trim();

    const drop =
      document.getElementById("drop")?.value.trim();

    const rideType =
      document.getElementById("rideType")?.value ||
      "Auto Rickshaw";

    const passengers =
      document.getElementById("passengers")?.value ||
      1;

    const fare =
      document.getElementById("fare")?.value ||
      0;


    if (!pickup || !drop) {

      alert(
        "कृपया Pickup और Drop location भरें।"
      );

      return;

    }


    const customerMobile =
      localStorage.getItem(
        "customerMobile"
      ) || "";


    const ride = await bookRide({

      customerName:
        "Customer",

      customerMobile:
        customerMobile,

      pickup:
        pickup,

      drop:
        drop,

      rideType:
        rideType,

      passengers:
        passengers,

      fare:
        fare

    });


    alert(
      "✅ Ride Request भेज दी गई!\n\n" +
      "Booking ID: " +
      ride.bookingId
    );


    // Open ride status page

    window.location.href =
      "ride-status.html";


  } catch (error) {

    console.error(error);

    alert(
      "❌ Ride booking में problem आई।\n" +
      "कृपया दोबारा कोशिश करें।"
    );

  }

}


// ------------------------------------------
// Make function available
// ------------------------------------------

window.AllSamastipurCustomer = {

  createRide:
    createCustomerRide

};


console.log(
  "Customer Firebase Connection Ready!"
);

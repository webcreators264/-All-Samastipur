// ==========================================
// ALL SAMASTIPUR
// CODE 30 - DRIVER RIDE ACTION
// ==========================================

import {
  database,
  ref,
  update
} from "./firebase-config.js";


// ------------------------------------------
// Get Driver Information
// ------------------------------------------

function getDriverData() {

  try {

    const saved =
      localStorage.getItem(
        "allSamastipurDriverData"
      );


    if (saved) {

      return JSON.parse(saved);

    }

  } catch (error) {

    console.error(error);

  }


  return {

    driverId:
      "driver_" +
      Date.now(),

    driverName:
      "All Samastipur Driver",

    driverMobile:
      ""

  };

}


// ------------------------------------------
// Accept Ride
// ------------------------------------------

async function acceptRide(rideId) {

  if (!rideId) {

    throw new Error(
      "Ride ID missing"
    );

  }


  const driver =
    getDriverData();


  const rideRef =
    ref(
      database,
      "rides/" + rideId
    );


  await update(
    rideRef,
    {

      status:
        "driver_accepted",

      driverId:
        driver.driverId,

      driverName:
        driver.driverName,

      driverMobile:
        driver.driverMobile,

      acceptedAt:
        Date.now(),

      updatedAt:
        Date.now()

    }
  );


  return true;

}


// ------------------------------------------
// Reject Ride
// ------------------------------------------

async function rejectRide(rideId) {

  if (!rideId) {

    throw new Error(
      "Ride ID missing"
    );

  }


  const rideRef =
    ref(
      database,
      "rides/" + rideId
    );


  await update(
    rideRef,
    {

      status:
        "rejected_by_driver",

      rejectedAt:
        Date.now(),

      updatedAt:
        Date.now()

    }
  );


  return true;

}


// ------------------------------------------
// Button Events
// ------------------------------------------

document.addEventListener(
  "click",
  async function(event) {


    // ACCEPT

    if (
      event.target.classList.contains(
        "accept-ride-btn"
      )
    ) {

      const rideId =
        event.target.dataset.rideId;


      try {

        await acceptRide(
          rideId
        );


        alert(
          "✅ Ride Accepted!"
        );


      } catch (error) {

        console.error(error);

        alert(
          "❌ Accept failed: " +
          error.message
        );

      }

    }


    // REJECT

    if (
      event.target.classList.contains(
        "reject-ride-btn"
      )
    ) {

      const rideId =
        event.target.dataset.rideId;


      try {

        await rejectRide(
          rideId
        );


        alert(
          "Ride Rejected"
        );


      } catch (error) {

        console.error(error);

        alert(
          "❌ Reject failed: " +
          error.message
        );

      }

    }

  }
);


// ------------------------------------------
// Export
// ------------------------------------------

export {

  acceptRide,

  rejectRide

};


// ------------------------------------------

window.AllSamastipurDriverActions = {

  acceptRide,

  rejectRide

};


console.log(
  "✅ Driver Ride Actions Ready!"
);

// ==========================================
// ALL SAMASTIPUR
// CODE 33 - DRIVER LIVE LOCATION
// ==========================================

import {
  database,
  ref,
  update
} from "./firebase-config.js";


// ------------------------------------------
// Save Driver Location
// ------------------------------------------

async function saveDriverLocation(
  rideId,
  latitude,
  longitude
) {

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

      driverLocation: {

        latitude:
          latitude,

        longitude:
          longitude,

        updatedAt:
          Date.now()

      },

      updatedAt:
        Date.now()

    }
  );

}


// ------------------------------------------
// Start GPS Tracking
// ------------------------------------------

function startDriverLocationTracking(
  rideId
) {

  if (!navigator.geolocation) {

    alert(
      "इस device में GPS/Location supported नहीं है।"
    );

    return;

  }


  const watchId =
    navigator.geolocation.watchPosition(

      async function(position) {

        const latitude =
          position.coords.latitude;

        const longitude =
          position.coords.longitude;


        console.log(
          "Driver Location:",
          latitude,
          longitude
        );


        try {

          await saveDriverLocation(

            rideId,

            latitude,

            longitude

          );

        } catch (error) {

          console.error(
            "Location Firebase Error:",
            error
          );

        }

      },


      function(error) {

        console.error(
          "GPS Error:",
          error
        );

      },


      {

        enableHighAccuracy:
          true,

        maximumAge:
          5000,

        timeout:
          10000

      }

    );


  return watchId;

}


// ------------------------------------------
// Stop GPS Tracking
// ------------------------------------------

function stopDriverLocationTracking(
  watchId
) {

  if (
    watchId !== undefined &&
    watchId !== null
  ) {

    navigator.geolocation.clearWatch(
      watchId
    );

  }

}


// ------------------------------------------
// Export
// ------------------------------------------

export {

  saveDriverLocation,

  startDriverLocationTracking,

  stopDriverLocationTracking

};


// ------------------------------------------
// Global Access
// ------------------------------------------

window.AllSamastipurDriverLocation = {

  saveDriverLocation,

  startDriverLocationTracking,

  stopDriverLocationTracking

};


console.log(
  "✅ Driver Live Location System Ready!"
);

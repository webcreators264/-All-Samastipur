// ==========================================
// ALL SAMASTIPUR
// CODE 28 - DRIVER RIDE REQUEST
// ==========================================

import {
  database,
  ref,
  onValue
} from "./firebase-config.js";


// ------------------------------------------
// Listen for New Ride Requests
// ------------------------------------------

function listenForRideRequests(callback) {

  const ridesRef =
    ref(database, "rides");


  onValue(
    ridesRef,
    function(snapshot) {

      const data =
        snapshot.val();


      if (!data) {

        callback([]);

        return;

      }


      const rides = [];


      Object.keys(data).forEach(
        function(rideId) {

          const ride =
            data[rideId];


          if (
            ride.status ===
            "searching_driver"
          ) {

            rides.push({

              ...ride,

              rideId: rideId

            });

          }

        }
      );


      // Latest rides first

      rides.sort(
        function(a, b) {

          return (
            (b.createdAt || 0) -
            (a.createdAt || 0)
          );

        }
      );


      callback(rides);

    }
  );

}


// ------------------------------------------
// Export
// ------------------------------------------

export {
  listenForRideRequests
};


// ------------------------------------------
// Global Access
// ------------------------------------------

window.AllSamastipurDriver = {

  listenForRideRequests

};


console.log(
  "✅ Driver Ride Request System Ready!"
);

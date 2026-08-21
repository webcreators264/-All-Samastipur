// ==========================================
// ALL SAMASTIPUR
// CODE 29 - DRIVER RIDE REQUEST UI
// ==========================================

import {
  listenForRideRequests
} from "./driver-rides.js";


// ------------------------------------------
// Create Ride Request Card
// ------------------------------------------

function createRideCard(ride) {

  const card =
    document.createElement("div");


  card.style.border =
    "1px solid #ddd";

  card.style.borderRadius =
    "12px";

  card.style.padding =
    "15px";

  card.style.marginBottom =
    "12px";


  card.innerHTML = `

    <h3>
      🚕 New Ride Request
    </h3>

    <p>
      <strong>Pickup:</strong>
      ${ride.pickup || "-"}
    </p>

    <p>
      <strong>Drop:</strong>
      ${ride.drop || "-"}
    </p>

    <p>
      <strong>Passengers:</strong>
      ${ride.passengers || 1}
    </p>

    <p>
      <strong>Fare:</strong>
      ₹${ride.fare || 0}
    </p>

    <p>
      <strong>Booking ID:</strong>
      ${ride.bookingId || "-"}
    </p>

    <button
      class="accept-ride-btn"
      data-ride-id="${ride.rideId}"
    >
      Accept Ride
    </button>

    <button
      class="reject-ride-btn"
      data-ride-id="${ride.rideId}"
    >
      Reject
    </button>

  `;


  return card;

}


// ------------------------------------------
// Show Ride Requests
// ------------------------------------------

function showRideRequests(rides) {

  let container =
    document.getElementById(
      "firebaseRideRequests"
    );


  // Create container automatically

  if (!container) {

    container =
      document.createElement("div");

    container.id =
      "firebaseRideRequests";


    const heading =
      document.createElement("h2");

    heading.innerText =
      "🔥 Live Ride Requests";


    document.body.prepend(
      heading
    );

    document.body.prepend(
      container
    );

  }


  container.innerHTML = "";


  if (rides.length === 0) {

    container.innerHTML =
      "<p>No new ride requests.</p>";

    return;

  }


  rides.forEach(
    function(ride) {

      container.appendChild(
        createRideCard(ride)
      );

    }
  );

}


// ------------------------------------------
// Start Listening
// ------------------------------------------

listenForRideRequests(
  showRideRequests
);


console.log(
  "✅ Driver Ride UI Connected!"
);

function goHome() {
  window.location.href = "/src/index.html";
}

function preset(event) {
  // Get the data-distance value
  var distance = event.target.dataset.distance;

  // Set the value of the input box to the distance
  var inputBox = document.getElementsByClassName("input-length")[0];
  var unitDropdown = document.querySelector(".select-units");
  if (unitDropdown.value === "km") {
    // Convert miles to kilometers
    distance = distance * 1.60934;
  } else {
    distance = distance;
  }

  distance = parseFloat(distance);
  var distanceFixed = parseFloat(distance.toFixed(2));
  inputBox.value = Math.floor(distance) !== distance ? distanceFixed : distance;
}

function updateDistance() {
  // Get the current distance from the input box
  var inputBox = document.getElementsByClassName("input-length")[0];
  var distance = parseFloat(inputBox.value);

  // Check if the user has selected kilometers
  var unitDropdown = document.querySelector(".select-units");
  if (unitDropdown.value === "km") {
    // Convert miles to kilometers
    distance = distance * 1.60934;
  } else {
    // Convert kilometers to miles
    distance = distance / 1.60934;
  }

  // Set the value of the input box to the distance
  if (isNaN(distance)) {
    inputBox.value = "";
  } else {
    distance = parseFloat(distance);
    var distanceFixed = parseFloat(distance.toFixed(2));
    inputBox.value =
      Math.floor(distance) !== distance ? distanceFixed : distance;
  }
}

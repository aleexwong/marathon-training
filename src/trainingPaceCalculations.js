// Description: This file contains the functions used to calculate training paces
let isMetric = false;
let vo2Max = -1;

function initializeGlobals() {
  isMetric = false;
  vo2Max = -1;
}

function calculateVO2Max() {
  const form = document.forms.inputFromUser;
}

function runConversion() {
  var frm = document.forms.inputFromUser;
  // race time in min, length in m and speed in m/min.
  var time =
    document.forms.inputFromUser.hours.value * 60 +
    document.forms.inputFromUser.minutes.value * 1 +
    document.forms.inputFromUser.seconds.value / 60;
  var rlength = document.forms.inputFromUser.length.value;
  var speed;

  if (time <= 0 || isNaN(time)) {
    document.getElementById("error-message").innerHTML = "input a valid time";
    document.getElementById("error-message").style.color = "red";
    return;
  }

  if (rlength <= 0 || isNaN(rlength)) {
    document.getElementById("error-message").innerHTML = "input race length";
    document.getElementById("error-message").style.color = "red";
    return;
  }

  document.getElementById("error-message").innerHTML = "";

  if (frm.units.options[0].selected) {
    rlength *= 1609; // length of a mile in meters
  } else {
    rlength *= 1000; // length of a kilometer in meters
  }

  speed = rlength / time;

  vo2Max = velToVO2(speed) / timeToPercentVO2Max(time);
  makeCalculations();
}

function makeCalculations() {
  if (vo2Max <= 0) {
    return;
  }

  var velEasy = VO2ToVel(vo2Max * 0.7);
  var velTempo = VO2ToVel(vo2Max * 0.88);
  var velMaximum = VO2ToVel(vo2Max);
  var velSpeed = VO2ToVel(vo2Max * 1.1);
  var velxlong = VO2ToVel(vo2Max * 0.6);
  var velYasso = velMaximum * 1.95;

  var toAppend;
  if (isMetric) {
    toAppend = " min/km";
  } else {
    toAppend = " min/mile";
  }

  var frm = document.forms.inputFromUser;

  frm.easy.value = "" + timeConvert(velEasy) + toAppend;
  frm.tempo.value = "" + timeConvert(velTempo) + toAppend;
  frm.maximum.value = "" + timeConvert(velMaximum) + toAppend;
  frm.speed.value = "" + timeConvert(velSpeed) + toAppend;
  frm.xlong.value =
    "" + timeConvert(velEasy) + " - " + timeConvert(velxlong) + toAppend;
  var oldMetric = isMetric;
  isMetric = false;
  frm.yasso.value = "" + timeConvert(velYasso) + " min/800";
  isMetric = oldMetric;
}

// Toggle output type of paces.
function toggleMetric() {
  if (document.forms.inputFromUser.paceType.options[0].selected) {
    isMetric = false;
  } else {
    isMetric = true;
  }
  makeCalculations();
}

// Takes a velocity and converts it to a VO2 level.
function velToVO2(vel) {
  return -4.6 + 0.182258 * vel + 0.000104 * vel * vel;
}

// Takes a VO2 measurement and converts it to a velocity.
function VO2ToVel(VO2) {
  return 29.54 + 5.000663 * VO2 - 0.007546 * VO2 * VO2;
}

// Takes a time in minutes and uses EQ 2 to convert it to a percent of VO2 maximum.
function timeToPercentVO2Max(minutes) {
  return (
    0.8 +
    0.1894393 * Math.exp(-0.012778 * minutes) +
    0.2989558 * Math.exp(-0.1932695 * minutes)
  );
}

// Takes a speed in metres / minute a converts it to a string representing a pace in
// minutes per mile or km.
function timeConvert(speed) {
  var ans;
  if (!isMetric) {
    ans = (1 / speed) * 1609;
  } else {
    ans = (1 / speed) * 1000;
  }
  minutes = Math.floor(ans);
  seconds = Math.floor((ans - minutes) * 60);
  if (seconds > 9) {
    return "" + minutes + ":" + seconds;
  } else {
    return "" + minutes + ":0" + seconds;
  }
}

import { shortweekdays, monthNames } from "../constants/staticData";

export function tConvert(time) {
  // Check correct time format and split into components
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    time,
  ];

  if (time.length > 1) {
    // If time format correct
    time = time.slice(1); // Remove full string match value
    time[5] = +time[0] < 12 ? " AM" : " PM"; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join(""); // return adjusted time or original string
}
export const formattedDate = (data) => {
  let date = data?.date;
  date = new Date(date);
  const day = shortweekdays[date.getDay()].label;
  const apptDate = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return day + " " + apptDate + " " + month + " , " + year;
};

export function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? (hours < 10 ? "0" + hours : hours) : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

export const renderSpecialist = (item, specialist) => {
  let text = "";
  if (specialist && specialist !== "doctorList") {
    item?.specialization?.forEach((subitem, i) => {
      if (specialist === subitem._id) {
        text += subitem.name;
      }
    });
  } else {
    item?.specialization?.forEach((subitem, i) => {
      text += (i !== 0 ? ", " : "") + subitem.name;
    });
  }
  return text;
};

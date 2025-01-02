import { weekdays, shortweekdays, monthNames } from "../constants/staticData";

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

export const setDateSequence = (response) => {
  const res = [...response];
  const dayKey = res.map((item) => item.days);

  const modifiedDays = weekdays.map((item, i) => {
    if (item.label === res[i]?.days) {
      return { ...res[i], value: item.value };
    } else {
      const findIndex = dayKey.indexOf(item.label);
      if (findIndex !== -1) {
        const prevdata = res[findIndex];
        res.splice(findIndex, 0);
        return { ...prevdata, value: item.value };
      } else {
        return { days: item.label, value: item.value };
      }
    }
  });
  // console.log("modifiedDays", modifiedDays);

  const newState = [...modifiedDays];
  const currentDate = new Date();
  const currentday = currentDate.getDay();

  for (let i = 0; i < modifiedDays.length; i++) {
    if (modifiedDays[i].value === currentday) {
      break;
    } else {
      const prevItem = modifiedDays[i];
      newState.splice(0, 1);
      newState.push(prevItem);
    }
  }

  // console.log("newState", newState);

  let finaledData = newState.map((item) => {
    return getScheduleDays(item);
  });
  return finaledData;
};

export const getScheduleDays = (item) => {
  let dataObj = {};
  const currentDate = new Date();
  const currentday = currentDate.getDay();
  const tmr = new Date();
  tmr.setDate(tmr.getDate() + 1);

  if (item.value === currentday) {
    dataObj = { ...item, label: "Today", active: false, date: currentDate };
  } else if (item.value === tmr.getDay()) {
    dataObj = {
      ...item,
      label: "Tomorrow",
      active: false,
      date: tmr,
    };
  } else {
    weekdays.forEach((newitem, i) => {
      const d = new Date(new Date().getTime() + i * 24 * 60 * 60 * 1000);
      const getday = d.getDay();
      if (getday === item.value) {
        dataObj = {
          ...item,
          label: d.getDate() + " " + monthNames[d.getMonth()],
          active: false,
          date: d,
        };
      }
    });
  }
  return dataObj;
};

export const textLimit = (text, limit) => {
  if (text.length > limit) {
    let result = text.substr(0, limit);
    return result + " ...";
  } else {
    return text;
  }
};

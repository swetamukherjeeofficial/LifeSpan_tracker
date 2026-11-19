let isDOBOpen = false;
let dateOfBirth;
const settingCogEl = document.getElementById("settingIcon");
const settingContentEl = document.getElementById("settingContent");
const initialTextEl = document.getElementById("initialText");
const afterDOBBtnTxtEl = document.getElementById("afterDOBBtnTxt");
const dobButtonEl = document.getElementById("dobButton");
const dobInputEl = document.getElementById("dobInput");

const YearEl = document.getElementById("Year");
const MonthEl = document.getElementById("Month");
const DayEl = document.getElementById("Day");
const HourEl = document.getElementById("Hour");
const MinuteEl = document.getElementById("Minute");
const SecondEl = document.getElementById("Second");

const makeTwoDigitNumber = (number) => {

  return number > 9 ? number : `0${number}`;
};

const toggleDateOfBirthSelector = () => {
  if (isDOBOpen) {
    settingContentEl.classList.add("hide");
  } else {
    settingContentEl.classList.remove("hide");
  }
  isDOBOpen = !isDOBOpen;

  console.log("Toggle", isDOBOpen);
};

const updateAge = () => {
  const currentDate = new Date();
  const dateDiff = currentDate - dateOfBirth;

  const Year = Math.floor(dateDiff / (1000 * 60 * 60 * 24 * 365));
  const Month = Math.floor((dateDiff / (1000 * 60 * 60 * 24 * 30.44)) % 12);
  const Day = Math.floor(dateDiff / (1000 * 60 * 60 * 24)) % 30;
  const Hour = Math.floor(dateDiff / (1000 * 60 * 60)) % 24;
  const Minute = Math.floor(dateDiff / (1000 * 60)) % 60;
  const Second = Math.floor(dateDiff / 1000) % 60;

  YearEl.innerHTML = makeTwoDigitNumber(Year);
  MonthEl.innerHTML = makeTwoDigitNumber(Month);
  DayEl.innerHTML = makeTwoDigitNumber(Day);
  HourEl.innerHTML = makeTwoDigitNumber(Hour);
  MinuteEl.innerHTML = makeTwoDigitNumber(Minute);
  SecondEl.innerHTML = makeTwoDigitNumber(Second);
};

const setDOBHandler = () => {
  const dateString = dobInputEl.value;

  dateOfBirth = dateString ? new Date(dateString) : null;

  if (!dateOfBirth) {
    const Year = localStorage.getItem("Year");
    const Month = localStorage.getItem("Month");
    const Day = localStorage.getItem("Date");

    if (Year && Month && Day) {
      console.log({
        Year,
        Month,
        Day,
      });
      dateOfBirth = new Date(Year, Month, Day);
    }
  }

  if (dateOfBirth) {
    localStorage.setItem("Year", dateOfBirth.getFullYear());
    localStorage.setItem("Month", dateOfBirth.getMonth());
    localStorage.setItem("Date", dateOfBirth.getDate());
    initialTextEl.classList.add("hide");
    afterDOBBtnTxtEl.classList.remove("hide");

    YearEl.innerHTML = "00";
    MonthEl.innerHTML = "00";
    DayEl.innerHTML = "00";
    HourEl.innerHTML = "00";
    MinuteEl.innerHTML = "00";
    SecondEl.innerHTML = "00";

    setTimeout(() => {
      updateAge();
      setInterval(() => updateAge(), 1000);
    }, 500);
  } else {
    afterDOBBtnTxtEl.classList.add("hide");
    initialTextEl.classList.remove("hide");
  }
};

localStorage.clear();
setDOBHandler();

settingCogEl.addEventListener("click", toggleDateOfBirthSelector);
dobButtonEl.addEventListener("click", setDOBHandler);
let cityName = document.querySelector(".city");
let degree = document.querySelector(".degree-1");
let condition = document.querySelector(".condition");
let weatherDesc = document.querySelector(".weatherDesc");
let humidity = document.querySelector(".humidity");
let windSpeed = document.querySelector(".windSpeed");
let windDir = document.querySelector(".windDir");
let today = document.querySelector(".day");
let liveDate = document.querySelector(".month");
let tomorrow = document.querySelector(".day-2");
let afterTomorrow = document.querySelector(".day-3");
let nextDayMax = document.querySelector(".degree-max-1");
let nextDayMin = document.querySelector(".degree-samll-1");
let nextDayStatus = document.querySelector(".weather-conditions-1");
let nextDayIcon = document.querySelector(".nextDayIcon");
let nextDayMax2 = document.querySelector(".degree-max-2");
let nextDayMin2 = document.querySelector(".degree-samll-2");
let nextDayStatus2 = document.querySelector(".weather-conditions-2");
let nextDayIcon2 = document.querySelector(".nextDayIcon2");
let findBtn = document.getElementById("submit");
let searchInput = document.getElementById("searchInput");

let searchTimer;

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

async function getWeatherApi(city) {
  try {
    if (!city || city.length < 2) {
      return;
    }

    let response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=48d2f152899e41c3951145213250811&q=${city}&days=3`
    );

    if (!response.ok) {
      throw new Error("مش لاقي المدينة دي");
    }

    let data = await response.json();

    degree.innerHTML = data.current.temp_c + "<span>o</span>C";
    cityName.innerHTML = data.location.name;
    condition.src = "https:" + data.current.condition.icon;
    weatherDesc.innerHTML = data.current.condition.text;
    humidity.innerHTML = data.current.humidity + "%";
    windSpeed.innerHTML = data.current.wind_kph + " km/h";
    windDir.innerHTML = data.current.wind_dir;
    nextDayMax.innerHTML =
      data.forecast.forecastday[1].day.maxtemp_c + "<span>o</span>C";
    nextDayMin.innerHTML =
      data.forecast.forecastday[1].day.mintemp_c + "<span>o</span>C";
    nextDayStatus.innerHTML = data.forecast.forecastday[1].day.condition.text;
    nextDayIcon.src =
      "https:" + data.forecast.forecastday[1].day.condition.icon;
    nextDayMax2.innerHTML =
      data.forecast.forecastday[2].day.maxtemp_c + "<span>o</span>C";
    nextDayMin2.innerHTML =
      data.forecast.forecastday[2].day.mintemp_c + "<span>o</span>C";
    nextDayStatus2.innerHTML = data.forecast.forecastday[2].day.condition.text;
    nextDayIcon2.src =
      "https:" + data.forecast.forecastday[2].day.condition.icon;
  } catch (error) {
    console.log("Error", error);
  }
}

function updateDates() {
  let now = new Date();
  today.innerHTML = days[now.getDay()];
  liveDate.innerHTML = now.getDate() + " " + months[now.getMonth()];

  let tomorrowDate = new Date();
  tomorrowDate.setDate(now.getDate() + 1);
  tomorrow.innerHTML = days[tomorrowDate.getDay()];

  let dayAfterDate = new Date();
  dayAfterDate.setDate(now.getDate() + 2);
  afterTomorrow.innerHTML = days[dayAfterDate.getDay()];
}

searchInput.addEventListener("input", function (e) {
  let text = e.target.value.trim();

  if (searchTimer) {
    clearTimeout(searchTimer);
  }

  searchTimer = setTimeout(() => {
    if (text.length >= 2) {
      getWeatherApi(text);
    }
  }, 500);
});

searchInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    let text = searchInput.value.trim();
    if (text.length >= 2) {
      getWeatherApi(text);
    }
  }
});

findBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let text = searchInput.value.trim();
  if (text.length >= 2) {
    getWeatherApi(text);
  }
});

updateDates();

window.addEventListener("load", function () {
  getWeatherApi("Cairo");
});

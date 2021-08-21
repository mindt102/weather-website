const getWeather = async (address) => {
    const response = await fetch(
        `http://localhost:3000/weather?address=${address}`
    );
    const weatherData = await response.json();
    if (weatherData.error) {
        messageOne.textContent = weatherData.error;
    } else {
        messageTwo.textContent = weatherData.location;
        messageOne.textContent = weatherData.forecast;
    }
};

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const location = search.value;
    messageOne.textContent = "Loading...";
    getWeather(location);
});

const getWeather = async (address) => {
    try {
        const response = await fetch(`/weather?address=${address}`);
        console.log(`response: ${response}`);
        const weatherData = await response.json();
        if (weatherData.error) {
            messageOne.textContent = weatherData.error;
        } else {
            messageTwo.textContent = weatherData.location;
            messageOne.textContent = weatherData.forecast;
        }
    } catch (error) {
        console.log(`Error ${error}`);
    }
};

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const location = search.value;
    messageOne.textContent = "Loading...";
    try {
        const res = await getWeather(location);
        console.log(`res: ${res}`);
    } catch (error) {
        console.log(`Error: ${error}`);
    }
});

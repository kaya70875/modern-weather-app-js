const input = document.getElementById('input-zone');
const btnSearch = document.getElementById('btnSearch');
const celcius = document.getElementById('header-celcius');
const headerInfo = document.getElementById('header-info');
const countryName = document.getElementById('country-name');
const feelsLike = document.getElementById('feels-like');
const windSpeed = document.getElementById('wind-speed');
const allContent = document.querySelector('.all');

const weatherImg = document.getElementById('weather-img');

async function fetchWeather(defaultValue){

    const apiKey = 'c7844e4469c03a7e9f23e7a2b4c71954';
    const cityName = defaultValue || input.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;

    input.value = '';


    try{
        const response = await fetch(url);
        const results = await response.json();
        console.log(results);
        return results;
        
    } catch(e){
        return console.error(e);
    }
}

const getData = async (defaultValue) => {
    try{
        const weatherData = await fetchWeather(defaultValue);

        if(weatherData.cod === 200){
            allContent.style.opacity = '0';
            await new Promise(resolve => setTimeout(resolve, 500));

            celcius.innerText = weatherData.main.temp + ' C';
            headerInfo.innerText = weatherData.weather[0].main.charAt(0).toUpperCase() + weatherData.weather[0].main.slice(1);
            countryName.innerText = weatherData.name;
            feelsLike.innerText = weatherData.main.feels_like + ' C'
            windSpeed.innerText = weatherData.wind.speed + ' Km/H';

            weatherData.main.temp < 20 ? weatherImg.src = 'img/rainy.png' : weatherImg.src = 'img/sun.png';

            allContent.style.opacity = '1';
            allContent.classList.remove('hidden');
        }
        
        else if(weatherData.cod === '400'){
            console.log('Input field is empty!');
        }

        else{
            alert('Cannot found relevant city name, Please check!');
        }

    }catch (e){
        console.error(e)
    }
}
    
input.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.key === 'Enter') {
        btnSearch.click();
    }
});

window.addEventListener('load' , () => getData('London'))
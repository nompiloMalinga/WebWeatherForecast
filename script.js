const currentTime = document.getElementById('time');
const currentDate = document.getElementById('date');
const button = document.getElementById('button');
const inputValue = document.getElementById('inputValue');
const temperatureData = document.getElementById('temp');
const descriptionData = document.getElementById('description');
const humidityData = document.getElementById('humidity');
const pressureData = document.getElementById('pressure');
const windSpeed = document.getElementById('speed');
const country = document.getElementById('country');
const nameOfCity = document.getElementById('name');

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const API_KEY = '26d7528cb94d8725ce34179d08dc613a';

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hourFormat = hour >= 13 ? hour % 12 : hour
    const minutes = time.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM'
    
    currentTime.innerHTML = hourFormat + ':' + (minutes< 10? '0' +minutes:minutes) + '' + `<span id="am-pm">${ampm}</span>`
    currentDate.innerHTML = days[day] + ', ' + date + ' ' + months[month]
    
}, 1000);

button.addEventListener('click',function () {
   // navigator.geolocation.getCurrentPosition((success) => {
       // let { latitude, longitude } = success.coords;
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=`+inputValue.value+`&appid=${API_KEY}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                readData(data);

            })
            .catch(error => alert("Please input a valid city name")) 
    })


function readData(data) {
    let locationIcon = document.getElementById('icon');
    const icon = data.weather[0].icon

    var temValue = data['main']['temp'];
    var descValue = data['weather'][0]['description'];
    var humidityValue = data['main']['humidity'];
    var pressureValue = data['main']['pressure'];
    var windSpeedValue = data['wind']['speed'];
    var countryData = data['sys']['country'];
    var cityName =data['name']
    
    locationIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png">`;
    nameOfCity.innerHTML = cityName;
    temperatureData.innerHTML = `<span>Temperature </span>`+'  : '+temValue + `<span>°C</span>`;
    descriptionData.innerHTML = `<span>Description </span>`+'  : '+ descValue;
    humidityData.innerHTML = `<span>Humidity </span>`+ '       : '+humidityValue + `<span>%</span>`;
    pressureData.innerHTML = `<span>Pressure </span>`+'        : '+ pressureValue;
    windSpeed.innerHTML = `<span>Wind Speed </span>`+ '        : '+windSpeedValue;
    country.innerHTML = countryData;
    
   


    
    
}
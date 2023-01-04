// Documents
const city = document.querySelector('input');
const search = document.querySelector('.inputs > i');

let weatherInformation = {
  apiKey: "6abb4b6397b96ac1ad371f582f211a29",
  country: 'Egypt',
} 

getAPI(weatherInformation.country, weatherInformation.apiKey)

// Function to get name of country
function getCountry(obj) {  
  search.addEventListener('click', () => {

    if (city.value !== '') {
      obj.country = city.value;
      getAPI(obj.country, obj.apiKey);
    }
  })
}

getCountry(weatherInformation);

// Function to get api 
function getAPI(country, API) {
    const data = `https://api.openweathermap.org/data/2.5/weather?q=${country}&units=metric&appid=${API}`;
    fetch(data)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const { name } = data;
      const { description, icon } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
  
      dataUser(name, temp, icon, description, humidity, speed);
      document.body.style.backgroundImage = `url('https://source.unsplash.com/1920x1080/?${name}')`;
      document.querySelector('.message').classList.remove('not-valid');
    })
    .catch(() => {
      document.querySelector('.message span').innerText = `\'${city.value}\'`;
      document.querySelector('.message').classList.add('not-valid');
    })
}

// Function to get information from data user
function dataUser(name, temp, icon, description, humidity, speed) {
  document.querySelector('.country').innerText = name;
  document.querySelector('.degree').innerText = `${temp}°C`;
  document.querySelector('.icon').src = `https://openweathermap.org/img/wn/${icon}.png`;
  document.querySelector('.description').innerText = description;
  document.querySelector('.Humidity span').innerText = humidity;
  document.querySelector('.wind-speed span').innerHTML = speed;
}

window.addEventListener('keyup', (event) => {
  (event.key == "Enter") ? search.click() : false;
})
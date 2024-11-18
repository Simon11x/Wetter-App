function handleEnter(event) {
    // Prüfen, ob die Enter-Taste (Keycode 13) gedrückt wurde
    if (event.key === 'Enter') {
        fetchWeather();
    }
}



function fetchWeather() {
    var city = document.getElementById('city-input').value;
    var apiKey = `bab281d79e5f1e9755a68d754cc313e7`;
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=de`;

    fetch(apiUrl)
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Netzwerkantwort war nicht ok');
            }
            return response.json();
        })
        .then(function(data) {
            displayWeather(data);
        })
        .catch(function(error) {
            console.error('Fehler:', error);

            document.body.style.backgroundImage = "url('./Bilder/falsch.png')";
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundPosition = "center";
            document.body.style.backgroundRepeat = "no-repeat";
            
            var weatherOutput = document.getElementById('weather-output');
            weatherOutput.innerHTML = `<p>Stadt nicht gefunden.</p>`;
            weatherOutput.style.display = 'block';
        });
}
function formatTime(timestamp) {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}
function displayWeather(data) {
    var weatherOutput = document.getElementById('weather-output');
    var appMain = document.querySelector('.app-main');
    const sunrise = formatTime(data.sys.sunrise);
    const sunset = formatTime(data.sys.sunset);
    const currentTime = getCurrentTime();

    

    if (data && data.weather && data.main) {
        weatherOutput.innerHTML = `
            <h2 >Wetter in ${data.name}</h2>
            <p>Temperatur: ${data.main.temp} °C</p>
            <p>Beschreibung: ${data.weather[0].description}</p>
            <p>Luftfeuchtigkeit: ${data.main.humidity} %</p>
            <p>Minimale Temperatur: ${data.main.temp_min} °C</p>
            <p>Maximale Temperatur: ${data.main.temp_max} °C</p>
            <p>Windstärke: ${data.wind.speed} m/s</p>
            <p>Luftdruck: ${data.main.pressure} hPa</p>
            <p>Aktuelle Uhrzeit: ${currentTime}</p>

        `;
        weatherOutput.style.display = 'block';


        var weatherBackgrounds = {
            clear: "url('./Bilder/Klar.jpg')",
            clouds: "url('./Bilder/Bewölkt.jfif')",
            rain: "url('./Bilder/Regen.jfif')",
            drizzle: "url('./Bilder/Blitz.jpg')",
            snow: "url('./Bilder/Schnee.jpg')",
            thunderstorm: "url('./Bilder/Sturm.jpg')",
            sun: "url('./Bilder/Sonne.jpg')",
            mist: "url('./Bilder/Trüb.jpg')",
            fog: "url('./Bilder/Trüb.jpg')"
        };

        var weatherType = data.weather[0].main.toLowerCase();
        var backgroundImage = weatherBackgrounds[weatherType] || "";

        document.body.style.backgroundImage = backgroundImage;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundRepeat = "no-repeat";
    } else {
        weatherOutput.innerHTML = `<p>Stadt nicht gefunden.</p>`;
        weatherOutput.style.display = 'block';
        document.body.style.backgroundImage = "url('./falsch.png')";
    }
}
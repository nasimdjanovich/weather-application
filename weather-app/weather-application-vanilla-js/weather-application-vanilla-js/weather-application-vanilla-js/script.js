window.addEventListener('DOMContentLoaded', () => {
    const loader = document.querySelector('.loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 2000);





    const searchBox = document.querySelector('.search-box');

    searchBox.addEventListener('keypress', setQuery);

    function setQuery(e) {
        if (e.keyCode == 13) {
            getResults(searchBox.value);
            searchBox.value = '';
        };
    };
    let apiKey = '71a4c531e6f23839db88372fc001401e'
    let api = `https://api.openweathermap.org/data/2.5/${apiKey}`



    async function requestApi(url) {
        try {
            const req = await fetch(url)


            if (!req.ok) {
                alert('Davlat nomini tekshiring');
            };
            throw new Error('Xatolik mavjud');


            const data = await req.json();

            displayResults(data);
        } catch (err) {
            console.log(err.message);
        }

    }

    requestApi(api)

    function displayResults(data) {
        let city = document.querySelector('.location .city'),
            body = document.querySelector('body'),
            now = new Date(),
            temp = document.querySelector('.temp'),
            date = document.querySelector('.location .date'),
            weatherEl = document.querySelector('.weather'),
            hilow = document.querySelector('.hi-low'),
            bgs = {
                'Clear': 'img/clear.jpg',
                'Clouds': 'img/clouds.jpg',
                'Rain': 'img/rain.jpg',
                'Snow': 'img/snow.jpg',
                'Smoke': "img/smoke.jpg",
                'Thunderstorm': 'img/thunderstorm.jpg',
                'Haze': 'img/haze.jpg'
            },
            weatherValues = [
                'Clear',
                'Clouds',
                'Rain',
                'Snow',
                'Smoke',
                'Thunderstorm',
                'Haze'
            ]

        city.innerHTML = `${weather.name}, ${weather.sys.country}`;
        date.innerHTML = dateBuilder(now);
        temp.innerHTML = `${Math.round(weather.main.temp)}°C`;
        weatherEl.innerHTML = weather.weather[0].main;
        hilow.innerHTML = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)} °C`;



        for (bg in bgs) {
            if (weatherEl.textContent in weatherValues) {
                pass
            } else {
                body.style.background = `url('${bgs[weatherEl.textContent]}')`;
            }
        };
    };

    function dateBuilder(s) {
        let months = [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
            ],
            days = [
                'Sunday',
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday'
            ],
            day = days[s.getDay()],
            date = s.getDate(),
            month = months[s.getMonth()],
            year = s.getFullYear();

        return `${day} ${date} ${month} ${year}`;
    };

});
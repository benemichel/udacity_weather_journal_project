/* Global Variables */
//api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
//response https://openweathermap.org/current#current_JSON
//test zip 94040

// ADD YOUR KEY HERE
const API_KEY = 'YOUR_API_KEY';
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?'

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+ 1) + '.' + d.getDate() + '.' + d.getFullYear();

/* Requests functions*/
const fetchWeatherByZip = async (baseUrl, zip, apiKey) => {
    const fullUrl = baseUrl + `zip=${zip}&appid=${apiKey}`

    try {
        const res = await fetch(fullUrl);
        return res.json();
    } catch(err) {
        console.log('wx api fetch error', err);
    }
};

const postJournal = async (url, data) => {
    try {
        const res = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return res.json();
    } catch(error) {
        console.log("post journal error", error);
    }
};

// fetch latest journal via GET endpoint 'journal'
const fetchJournals = async () => {
    try {
        const res = await fetch('journals/0');
        return res.json();
    } catch (error) {
        console.log('fetch journal error', error);
    }
};

/* Callbacks */
// Use form data to generate wx journal and update UI
const generateJournal = async (event) => {
    // get user inputs
    const feelings = document.getElementById('feelings').value;
    const zip = document.getElementById('zip').value;

    try {
        const wx =  await fetchWeatherByZip(API_BASE_URL, zip, API_KEY );
        const postData = {
            temp: wx.main.temp,
            date: newDate,
            feelings: feelings,
        };

        // post to and fetch from API endpoints
        await postJournal('/journals', postData )
        const res = await fetchJournals();

         //update DOM
         document.getElementById('date').innerHTML = `Date: ${res.date}`;
         document.getElementById('temp').innerHTML = `Temperature: ${res.temp}°F`;
         document.getElementById('content').innerHTML = `Your feelings: ${res.feelings}`;
         document.getElementById('feelings').value = '';
    } catch (error) {
        console.log('generateJournal error', error)
    }
}

const scrollToJournal = () => {
    const entry = document.getElementsByClassName('entry').item(0);
    const rect = entry.getBoundingClientRect();
    window.scrollTo({
        top: rect.top + window.pageYOffset,
        left: 0,
        behavior: 'smooth'
    })
}

// Event listeners
document.getElementById('generate').addEventListener('click', generateJournal );
document.getElementById('generate').addEventListener('click', scrollToJournal)
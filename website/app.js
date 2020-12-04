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
    const fullUrl = baseUrl + `zip=${zip}&appid=${apiKey}&units=metric`

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
        const data = await res.json();

        //update DOM
        document.getElementById('date').innerHTML = `Date: ${data.date}`;
        document.getElementById('temp').innerHTML = `Temperature: ${data.temp}°C`;
        document.getElementById('content').innerHTML = `Your feelings: ${data.feelings}`;
        document.getElementById('feelings').value = '';

        return data;
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


    fetchWeatherByZip(API_BASE_URL, zip, API_KEY ).then( res => {
        const postData = {
            temp: res.main.temp,
            date: newDate,
            feelings: feelings,
        };


        // post to and fetch from API endpoints
        postJournal('/journals', postData)
    }).then( () => {
        fetchJournals();
    }).catch( err => {
        console.log('generateJournal error', err)
    })
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
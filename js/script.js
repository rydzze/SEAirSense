// script.js

const apiKey = 'fa564858-39f3-4c31-bdfe-ae95d2749d2a';
const apiUrl = `http://api.airvisual.com/v2/nearest_city?key=${apiKey}`;

async function fetchAQI() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching AQI data:', error);
        return null;
    }
}

async function updateAQI() {
    const data = await fetchAQI();
    if (data) {
        const aqi = data.data.current.pollution.aqius;
        const location = data.data.city;
        document.getElementById('aqi-value').textContent = `AQI: ${aqi}`;
        document.getElementById('location-details').textContent = `Location: ${location}`;
    } else {
        document.getElementById('aqi-value').textContent = 'N/A';
        document.getElementById('location-details').textContent = 'Location: N/A';
    }
}

window.addEventListener('load', updateAQI);
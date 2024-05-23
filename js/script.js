// Fetch HTML Component (Header and Footer) 

document.addEventListener('DOMContentLoaded', function() {
    fetch('component/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
        });
});

document.addEventListener('DOMContentLoaded', function() {
    fetch('component/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        });
});


// Fetch data using IQAir API

document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'fa564858-39f3-4c31-bdfe-ae95d2749d2a';
    const apiUrl = `https://api.airvisual.com/v2/nearest_city?key=${apiKey}`;

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

    updateAQI();
});


// Interactive Map

document.addEventListener("DOMContentLoaded", function() {
    const token = '14cfeb69780af16f656322f65c8a3ba4f6000f14'
    var OSM_URL = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';  
    var OSM_ATTRIB = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors';  
    var osmLayer = L.tileLayer(OSM_URL, {attribution: OSM_ATTRIB});  

    var WAQI_URL = `https://tiles.waqi.info/tiles/usepa-aqi/{z}/{x}/{y}.png?token=${token}`;  
    var WAQI_ATTR = 'Air Quality Tiles &copy; <a href="http://waqi.info">waqi.info</a>';  
    var waqiLayer = L.tileLayer(WAQI_URL, {attribution: WAQI_ATTR});  

    var map = L.map('map').setView([2.2180, 115.6628], 5);
    map.addLayer(osmLayer).addLayer(waqiLayer); 
});
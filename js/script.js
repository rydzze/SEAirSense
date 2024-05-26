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
    
    function  initBingMap()  {           
        var map = new Microsoft.Maps.Map(document.getElementById('map'),{  
            center:  new  Microsoft.Maps.Location(4.2580, 102.6628),  
            zoom:  7,
            credentials: 'As0j-BTZRllD4AlN56YnR4ZP0hEIm5_3SrO1-lu-cYzwbs_PB-tdM7OKNn_7tsNK'
        });  

        var options = {  
            uriConstructor: `https://tiles.aqicn.org/tiles/usepa-aqi//{zoom}/{x}/{y}.png?token=${token}`,  
            minZoom: 1,  
            maxZoom: 15  
        };
        var waqiTileSource = new Microsoft.Maps.TileSource(options);  
        var waqiTilelayer = new Microsoft.Maps.TileLayer({mercator: waqiTileSource});  
        map.layers.insert(waqiTilelayer);
    }

    window.initBingMap = initBingMap;
});
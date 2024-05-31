// Fetch HTML Component (Header and Footer) 

fetch('component/header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header-placeholder').innerHTML = data;
    });

fetch('component/footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer-placeholder').innerHTML = data;
    });


// Interactive Map

var OSM_URL = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';  
var OSM_ATTRIB = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a>contributors';  
var osmLayer = L.tileLayer(OSM_URL, {attribution: OSM_ATTRIB});  

var map = L.map('map').setView([9.7580, 111.6628],  5);  
var WAQI_URL = "https://tiles.waqi.info/tiles/usepa-aqi/{z}/{x}/{y}.png?token=14cfeb69780af16f656322f65c8a3ba4f6000f14";  
var WAQI_ATTR = 'Air Quality Tiles &copy; <a href="http://waqi.info">waqi.info</a>';  
var waqiLayer = L.tileLayer(WAQI_URL, {attribution: WAQI_ATTR});  

map.addLayer(osmLayer).addLayer(waqiLayer);
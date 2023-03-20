addEventListener('DOMContentLoaded', async () => {
    const map = L.map('map').setView([40.74, -74.0], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    const response = await fetch('data/tract_demographics_acs_2020.geojson');
    const tractDemographics = await response.json();

    L.geoJSON(tractDemographics, {
        fillColor: "#ff0000",
        fillOpacity: 0.5 
    }).addTo(map);
});

const styleTractDemograpics = (feature)=> {
    const totalPopulation = feature.properties.total;
    let fillColor = null;

    if (totalPopulation < 100) {
        fillColor = "#f1eef6"
    } else if (totalPopulation < 1000) {
        fillColor =  '#bdc9e1' 
    } else if (totalPopulation < 5000) {
        fillColor = '#74a9cf'
    } else if (totalPopulation < 7500) {
        fillColor = '#2b8cbe'
    } else {
        fillColor = "#045a8d"
    }
    return { 
        fillColor,
        color: "#222347",
        fillOpacity: .75,
        weight: 0.75,
        opacity: .75,
    }
}
addEventListener('DOMContentLoaded', async () => {
    const map = L.map('map').setView([40.74, -74.0], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    const response = await fetch('data/tract_demographics_acs_2020.geojson');
    const tractDemographics = await response.json();

    L.geoJSON(tractDemographics, {
        style: styleTractDemograpics
    }).addTo(map);
});

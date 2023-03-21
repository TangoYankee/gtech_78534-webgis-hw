const TICKS = [0, 100, 1];

const styleTractDemographics = (feature)=> {
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

const resetStyle = () => {return { fillColor: "#ff0000"}};

window.addEventListener('DOMContentLoaded', async () => {
    const map = L.map('map').setView([40.74, -74.0], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    const response = await fetch('data/tract_demographics_acs_2020.geojson');
    const tractDemographics = await response.json();

    const tractDemographicsGroup = L.geoJSON(tractDemographics, {
        style: styleTractDemographics
    }).addTo(map);

    const clicker = document.getElementById("clicker");
    console.log(clicker);
    let isShown = true;
    clicker.addEventListener('click', () => {
        console.log("I've been clicked!");
        tractDemographicsGroup.getLayers().forEach(layer => {
            const totalPopulation = layer.feature.properties.total;
            const minPopulation = 5000;
            if (totalPopulation < minPopulation) {
                layer.setStyle({
                    fillOpacity: 0,
                    opacity: 0
                });
            } else {
                layer.setStyle({
                    fillOpacity: 0.75,
                    opacity: 0.75
                });
            }
        });
    });
});

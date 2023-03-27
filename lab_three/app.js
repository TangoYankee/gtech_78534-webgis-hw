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
        fillOpacity: 0.75,
        color: "#222347",
        opacity: 0.75,
        weight: 0.75,
    }
}

window.addEventListener('DOMContentLoaded', async () => {
    const map = L.map('map').setView([40.74, -74.0], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // 'Await' here is paired with the 'async' keyword in the function definition above
    // It ensures the script will not continue without first retrieving and
    // extracting the geojson file.
    const response = await fetch('data/tract_demographics_acs_2020.geojson');
    const tractDemographics = await response.json();

    // Pass the style function from above, to color the tracts based on their
    // population totals. Save a reference to the created layers, to update
    // the layers later.
    const tractDemographicsGroup = L.geoJSON(tractDemographics, {
        style: styleTractDemographics
    }).addTo(map);

    const minSelector = document.getElementById('minPopulation');
    const maxSelector = document.getElementById('maxPopulation');
    const filterMessage = document.getElementById('filterMessage');

    // Define the possible variations of the style outside the function
    // they are used. This way, they are only defined once.
    // These styles will cause each feature to appear 'hidden' or 'shown'
    const hidden = {
        fillOpacity: 0,
        opacity: 0,
    }

    const shown = {
        fillOpacity: 0.75,
        opacity: 0.75
    }

    // Create a function that updates the styles, based on the range of 'shown' features 
    // Function is run whenever an input is changed
    const setFilter = () => {
        // min and max Selector variables are references to the selector objects in the DOM.
        // They have access to the latest updates to the selectors
        let minValue = minSelector.value;
        let maxValue = maxSelector.value;
        minValue = minValue === 'null' ? null : +minValue;
        maxValue = maxValue === 'null' ? null : +maxValue;
        let message = '';
        // If there is no maximum value, then we know the filter selection is valid
        // We can also filter only based on the min value
        if (maxValue === null) {
            tractDemographicsGroup.getLayers().forEach(layer => {
                const totalPopulation = layer.feature.properties.total;
                const opacity = (totalPopulation >= minValue) ? shown : hidden;
                layer.setStyle(opacity);
            });
        // If there is a maximum value, then the min selector must be below it.
        // When it is, the appropriate range may be applied
        } else if ( minSelector.value < maxSelector.value) {
            tractDemographicsGroup.getLayers().forEach(layer => {
                const totalPopulation = layer.feature.properties.total;
                const opacity = (totalPopulation >= minValue && totalPopulation <= maxValue) ? shown : hidden;
                layer.setStyle(opacity);
            });
        } else {
            // If the selected range is invalid, set the message to give this feedback
            message = "Minimum value must be less than maximum";
        }
        filterMessage.innerText = message;
    }

    minSelector.addEventListener('change', setFilter);
    maxSelector.addEventListener('change', setFilter);
});

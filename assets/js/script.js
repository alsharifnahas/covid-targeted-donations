// ===DOM VARIABLES===
var generalRiskEl = $("#general-risk");
var densitySpanEl = $("#density-span");
var infectionSpanEl = $("#infection-span");
var testRatioSpanEl = $("#test-ratio-span");
var totalCasesEl = document.getElementById('total-cases').getContext('2d');
var totalDeathsEl = document.getElementById('total-deaths').getContext('2d');
var tracerSpanEl = $("#tracer-span");
var icuCapacitySpanEl = $("#icu-capacity-span");
var icuHeadroomSpanEl = $("#icu-headroom-span");
var icuBedsUsageEl = document.getElementById('icu-bed-usage').getContext('2d');
var tracerTotalsEl = document.getElementById('tracer-totals').getContext('2d');
var estimatedBedsEl = $('#estimated-beds');
var estimatedBedsValueEl = $('#estimated-beds-value');

// ===JS VARIABLES===
var charityURL = "https://cors-anywhere.herokuapp.com/http://data.orghunter.com/v1/charitysearch?";
var charityAPIkey = "b784bd4d2422022a05ab4a00a568c5e1";
var locationCovidData = {};

// ===FUNCTION DEFINITIONS===
function buildURL() {
    var queryURL = charityURL;

    var queryParams = { user_key: charityAPIkey };

    queryParams.state = "GA";
    queryParams.category = "H";
    queryParams.eligible = 1;

    return queryURL + $.param(queryParams);
}

function buildTotalCasesChart() {
    //return today's date location in object
    var locationActuals = locationCovidData.actualsTimeseries;
    var totalCasesChart = new Chart (totalCasesEl, {
        type: 'bar',
        data: {
            labels: thirtyDayValues('label', locationActuals),
            datasets: [
                {label: 'Total COVID Cases',
                data: thirtyDayValues('cases', locationActuals)}
            ],
            backgroundColor: 'red',
            borderWidth: 1,
            hoverBorderWidth: 3,
            hoverBorderColor: 'black'
        },
        options: {
            title: {
                display: true,
                text: "Past 30 Days (" + locationCovidData.county + ")",
                fontSize: 25
            },
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    bottom: 0,
                    top: 0
                }
            },
        }
    })
}

function buildTotalDeathsChart() {

    var locationActuals = locationCovidData.actualsTimeseries;
    var totalDeathsChart = new Chart (totalDeathsEl, {
        type: 'bar',
        data: {
            labels: thirtyDayValues('label', locationActuals),
            datasets: [
                {label: 'Total COVID Deaths',
                data: thirtyDayValues('deaths', locationActuals)}
            ],
            backgroundColor: 'red',
            borderWidth: 1,
            hoverBorderWidth: 3,
            hoverBorderColor: 'black'
        },
        options: {
            title: {
                display: true,
                text: "Past 30 Days (" + locationCovidData.county + ")",
                fontSize: 25
            },
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    bottom: 0,
                    top: 0
                }
            }
        }
    })
}

function buildIcuBedsChart() {
    
    var locationActuals = locationCovidData.actualsTimeseries;
    var bedsByDay = thirtyDayValues('bed', locationActuals);

    if(bedsByDay.length > 0) {
        var locationActuals = locationCovidData.actualsTimeseries;
        var icuBedsChart = new Chart (icuBedsUsageEl, {
            type: 'bar',
            data: {
                labels: thirtyDayValues('label', locationActuals),
                datasets: [
                    {label: 'COVID ICU Beds Usage Rate',
                    data: bedsByDay}
                ],
                backgroundColor: 'red',
                borderWidth: 1,
                hoverBorderWidth: 3,
                hoverBorderColor: 'black'
            },
            options: {
                title: {
                    display: true,
                    text: "Past 30 Days (" + locationCovidData.county + ")",
                    fontSize: 25
                },
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        bottom: 0,
                        top: 0
                    }
                }
            }
        })
    } else {
        estimatedBedsEl.removeClass('visually-hidden');
        estimatedBedsValueEl.text(locationCovidData.metrics.icuHeadroomDetails.currentIcuCovid);
    }
}

function buildContactTracerChart() {
    
    dataListed = true;
    if(dataListed) {
        var locationActuals = locationCovidData.actualsTimeseries;
        var tracerChart = new Chart (tracerTotalsEl, {
            type: 'bar',
            data: {
                labels: thirtyDayValues('label', locationActuals),
                datasets: [
                    {label: 'Contact Tracer Totals',
                    data: thirtyDayValues('tracers', locationActuals)}
                ],
                backgroundColor: 'red',
                borderWidth: 1,
                hoverBorderWidth: 3,
                hoverBorderColor: 'black'
            },
            options: {
                title: {
                    display: true,
                    text: "Past 30 Days (" + locationCovidData.county + ")",
                    fontSize: 25
                },
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        bottom: 0,
                        top: 0
                    }
                }
            }
        })
    }
}

function setGeneralRisks() {

    
    densitySpanEl.text(locationCovidData.riskLevels.caseDensity);
    infectionSpanEl.text(locationCovidData.riskLevels.infectionRate);
    testRatioSpanEl.text(locationCovidData.riskLevels.testPositivityRatio);
    
}

function setHospitalRisks() {

    tracerSpanEl.text(locationCovidData.riskLevels.contactTracerCapacityRatio);
    icuCapacitySpanEl.text(locationCovidData.riskLevels.icuCapacityRatio);
    icuHeadroomSpanEl.text(locationCovidData.riskLevels.icuHeadroomRatio);

}

function thirtyDayValues(key, data) {
    var returnArray = [];

    for(i = 30; i >= 0; i--) {
        var currentDataPoint = data[data.length - (1 + i)];
        if(key === 'label') {
            returnArray.push(currentDataPoint.date);
        } else if(key === 'cases') {
            returnArray.push(currentDataPoint.cases);
        } else if(key === 'deaths') {
            returnArray.push(currentDataPoint.deaths);
        } else if(key === 'beds') {
            returnArray.push(currentDataPoint.hospitalBeds.currentUsageCovid);
        } else if (key === 'tracers') {
            returnArray.push(currentDataPoint.contactTracers);
        }
    }
    return returnArray;
}

$(document).ready(function() {

// ===FUNCTION CALLS===
    
    
    //Categories: G > Diseases, Disorders, Medical Disciplines, J > Employment, Job Related, M > Public Safety, Disaster Preparedness and Relief
    //Fulton FIPS: 13121

    //Charities API
    // $.ajax({
    //     url: buildURL(),
    //     // url: "https://cors-anywhere.herokuapp.com/http://data.orghunter.com/v1/charitysearch?user_key=b784bd4d2422022a05ab4a00a568c5e1",
    //     // url: "https://cors-anywhere.herokuapp.com/http://data.orghunter.com/v1/categories?user_key=b784bd4d2422022a05ab4a00a568c5e1",
    //     method: "POST",
    //     success: function(data) {
    //         console.log("Charity API:");
    //         console.log(data);
    //     }
    // })

    
    //COVID Statistics API
    $.ajax({
        url: "https://api.covidactnow.org/v2/county/13121.timeseries.json?apiKey=51923792ac2a444ab49545572dcb9757",
        // url: "https://api.covidactnow.org/v2/counties.csv?apiKey=51923792ac2a444ab49545572dcb9757",
        method: "GET",
        success: function(data) {
            locationCovidData = data;
            setGeneralRisks();
            buildTotalCasesChart();
            buildTotalDeathsChart();
            setHospitalRisks();
            buildIcuBedsChart();
            buildContactTracerChart();
            console.log("COVID API:");
            console.log(locationCovidData)
            //console.log(csvToJSON(data));
        }
    })

    //Non-Pharmaceutical Intervition API
    $.ajax({
        url: "https://cors-anywhere.herokuapp.com/https://localcoviddata.com/covid19/v1/high-level-policy?country=USA",
        method: "GET",
        success: function(data) {
            console.log("US Response API: ");
            console.log(data);
        }
    })

    $.ajax({
        url: "https://cors-anywhere.herokuapp.com/https://localcoviddata.com/covid19/v1/high-level-policy?country=USA&state=GA",
        method: "GET",
        success: function(data) {
            console.log("State Response API: ");
            console.log(data);
        }
    })

    //API Key: LLzkHIRZnldABBEr7tRqwIP5deOguHPV
    // $.ajax({
    //     url: "https://api.covidcountydata.org/npi_us?location=13121",
    //     method: "GET",
    //     success: function(data) {
    //         console.log("NPI_US");
    //         console.log(data);
    //     }
    // })
    //Bureau of Labor API
    // $.ajax({
    //     url: "https://api.bls.gov/publicAPI/v2/timeseries/data/CEU0500000001",
    //     method: "GET",
    //     success: function(data) {
    //         console.log("BoL API: ");
    //         console.log(data);
    //     }
    // })

// ===EVENT LISTENERS===

})

// // calling the google maps api
// let script = document.createElement('script');
// script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCuGWP3SzdepY4mvjdHLL13yH66QAv2qPQ&libraries=places&callback=initMap';
// script.defer = true;

// // creating a marker variable
// let marker;

// // callback function for the api
// window.initMap = function () {
//     // creating a variable for current position
//     let latLng;

//     // creating the map object
//     const map = new google.maps.Map(document.querySelector(".map"), {
//         zoom: 10,
//         center: latLng
//     });

//     // getting the current location to position the map
//     navigator.geolocation.getCurrentPosition((position) => {
//         latLng =
//         {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude
//         }

//         // adding the location to change the map's position
//         map.setCenter(latLng);

//     })


//     // event listner for each marker
//     map.addListener("click", (e) => {
//         placeMarkerAndPanTo(e.latLng, map);
//     });


// }
// function placeMarkerAndPanTo(latLng, map) {
//     if (marker != undefined) {
//         marker.setMap(null);
//     }
//     marker = new google.maps.Marker({
//         position: latLng,
//         map: map,
//     });


//     map.panTo(latLng);
//     marker.addListener("click", () => {

//         // creating a variable to compare the current marker location
//         const currentMarkerLocation = {
//             lat: marker.getPosition().lat(),
//             lng: marker.getPosition().lng()
//         }
//         if ((marker.getPosition().lat() == currentMarkerLocation.lat && marker.getPosition().lng() == currentMarkerLocation.lng) && map.getZoom() == 14) {
//             // deleting the marker if it was clicked again
//             marker.setMap(null);
//         }


//         map.setZoom(14);
//         map.setCenter(marker.getPosition());
//     });

// }

// // Append the 'script' element to 'head'
// document.head.appendChild(script);

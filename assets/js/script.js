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
var estimatedTracersEl = $('#estimated-tracers');
var estimatedTracersValueEl = $('#estimated-tracers-value');
var barRestrictionsSpanEl = $('#bar-restrictions');
var gatheringRestrictionsSpanEl = $('#gathering-restrictions');
var nonessentialRestrictionsSpanEl = $('#nonessential-restrictions');
var openStatusSpanEl = $('#open-status');
var stayAtHomeSpanEl = $('#stay-at-home');
var restaurantRestrictionsSpanEl = $('#restuarant-restrictions');

// calling the google maps api
let script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBLpVjjZQtpYn9-b1nAHbHor_GpQFtPSCo&libraries=places&callback=initMap';
script.defer = true;

// Append the 'script' element to 'head'
document.head.appendChild(script);

// ===JS VARIABLES===
var charityURL = "https://cors-anywhere.herokuapp.com/http://data.orghunter.com/v1/charitysearch?";
var charityAPIkey = "b784bd4d2422022a05ab4a00a568c5e1";
var locationData = {
    coords: {
        latitude: 0,
        longitude: 0
    },
    state: {
        fips: '',
        code: '',
        name: ''
    },
    county: {
        fips: '',
        name: '',
    }
}
var locationCovidData = {};

// Google Maps: creating a marker variable
let marker;

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
        $('#icu-bed-usage').addClass('visually-hidden');
    }
}

function buildContactTracerChart() {
    
    var locationActuals = locationCovidData.actualsTimeseries;
    var tracersByDay = thirtyDayValues('tracers', locationActuals);

    if(tracersByDay > 0) {
        
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
    } else {
        estimatedTracersEl.removeClass('visually-hidden');
        if (locationCovidData.metrics.contactTracerCapacityRatio === null) {
            estimatedTracersValueEl.text(`No data on the number of COVID Contact Tracers is available for ${locationData.county.name}`);
        } else {
            estimatedTracersValueEl.text(locationCovidData.metrics.contactTracerCapacityRatio);
        }
        $('#tracer-totals').addClass('visually-hidden');
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

function setLocation(coordinates) {
    locationData.coords.latitude = coordinates.latLng.lat();
    locationData.coords.longitude = coordinates.latLng.lng();
    
    return new Promise(resolve => {
        $.ajax({
            url: `https://geo.fcc.gov/api/census/block/find?latitude=${locationData.coords.latitude}&longitude=${locationData.coords.longitude}&showall=true&format=json`,
            method: "GET",
            success: function(data) {
                locationData.county.fips = data.County.FIPS;
                locationData.county.name = data.County.name;
    
                locationData.state.fips = data.State.FIPS;
                locationData.state.code = data.State.code;
                locationData.state.name = data.State.name;
                console.log(locationData);
                resolve('success');
            }
        });
    })
}

async function populatePage(coordinates) {
    await setLocation(coordinates);
    queryCovidData();
    queryGovtResponseData();
}

function queryCovidData() {
    console.log(locationData.county.fips);
    $.ajax({
        url: `https://api.covidactnow.org/v2/county/${locationData.county.fips}.timeseries.json?apiKey=51923792ac2a444ab49545572dcb9757`,
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
        }
    })
}

function queryCharityData() {
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
}

function queryGovtResponseData() {
    // $.ajax({
    //     url: "https://cors-anywhere.herokuapp.com/https://localcoviddata.com/covid19/v1/high-level-policy?country=USA",
    //     method: "GET",
    //     success: function(data) {
    //         console.log("US Response API: ");
    //         console.log(data);
    //     }
    // })

    $.ajax({
        url: `https://cors-anywhere.herokuapp.com/https://localcoviddata.com/covid19/v1/high-level-policy?country=USA&state=${locationData.state.code}`,
        method: "GET",
        success: function(data) {
            barRestrictionsSpanEl.text(data.Community_regulations.Bar_Restrictions_Code);
            gatheringRestrictionsSpanEl.text(data.Community_regulations.Gathering_Restriction_Code);
            nonessentialRestrictionsSpanEl.text(data.Community_regulations.Non_Essential_Business_Closure_Code);
            openStatusSpanEl.text(data.Community_regulations.Reopening_Plan_Code);
            stayAtHomeSpanEl.text(data.Community_regulations.Stay_at_Home_Requirement_Code);
            restaurantRestrictionsSpanEl.text(data.Community_regulations.Restaurant_Restrictions_Code);
            console.log("State Response API: ");
            console.log(data);
        }
    })
}


$(document).ready(function() {

// ===FUNCTION CALLS===

    
    //COVID Statistics API
    

    //Non-Pharmaceutical Intervition API

// ===EVENT LISTENERS===

// callback function for the api
window.initMap = function () {
    // creating a variable for current position
    let latLng;

    // creating the map object
    const map = new google.maps.Map(document.querySelector(".map"), {
        zoom: 10,
        center: latLng
    });

    // getting the current location to position the map
    navigator.geolocation.getCurrentPosition((position) => {
        latLng =
        {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }

        // adding the location to change the map's position
        map.setCenter(latLng);

    })


    // event listner for each marker
    map.addListener("click", (e) => {
        placeMarkerAndPanTo(e.latLng, map);
        populatePage(e);
    });


}
function placeMarkerAndPanTo(latLng, map) {
    if (marker != undefined) {
        marker.setMap(null);
    }
    marker = new google.maps.Marker({
        position: latLng,
        map: map,
    });


    map.panTo(latLng);
    marker.addListener("click", () => {

        // creating a variable to compare the current marker location
        const currentMarkerLocation = {
            lat: marker.getPosition().lat(),
            lng: marker.getPosition().lng()
        }
        if ((marker.getPosition().lat() == currentMarkerLocation.lat && marker.getPosition().lng() == currentMarkerLocation.lng) && map.getZoom() == 14) {
            // deleting the marker if it was clicked again
            marker.setMap(null);
        }


        map.setZoom(14);
        map.setCenter(marker.getPosition());

    });

}

})
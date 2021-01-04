// ===DOM VARIABLES===
// ---General Risk Section Elements---
var generalRiskEl = $("#general-risk");
var densitySpanEl = $("#density-span");
var infectionSpanEl = $("#infection-span");
var testRatioSpanEl = $("#test-ratio-span");
var totalCasesContainEl = $('#total-cases-contain');
// var totalCasesEl = document.getElementById('total-cases').getContext('2d');
var totalDeathsContainEl = $('#total-deaths-contain');
// var totalDeathsEl = document.getElementById('total-deaths').getContext('2d');
// ---General Charity Element---
var generalCharityEl = $('#charity-general');
// ---Medical Risk Section Elements---
var tracerSpanEl = $("#tracer-span");
var icuCapacitySpanEl = $("#icu-capacity-span");
var icuHeadroomSpanEl = $("#icu-headroom-span");
var icuBedsUsageContainEl = $('#icu-bed-usage-contain');
//var icuBedsUsageEl = document.getElementById('icu-bed-usage').getContext('2d');
var totalTracersContainEl = $('#total-tracers-contain');
//var tracerTotalsEl = document.getElementById('tracer-totals').getContext('2d');
var estimatedBedsEl = $('#estimated-beds');
var estimatedBedsValueEl = $('#estimated-beds-value');
var estimatedTracersEl = $('#estimated-tracers');
var estimatedTracersValueEl = $('#estimated-tracers-value');
// ---Medical Charity Element---
var hospitalCharityEl = $('#charity-hospital');
// ---Govt Response Risk Elements---
var barRestrictionsSpanEl = $('#bar-restrictions');
var gatheringRestrictionsSpanEl = $('#gathering-restrictions');
var nonessentialRestrictionsSpanEl = $('#nonessential-restrictions');
var openStatusSpanEl = $('#open-status');
var stayAtHomeSpanEl = $('#stay-at-home');
var restaurantRestrictionsSpanEl = $('#restuarant-restrictions');
/// ---Employment Charity Element
var employmentCharityEl = $('#charity-employment')

// calling the google maps api
let script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCLbcYFkEQGgfWAnPInbdq7ehzMdrjb534&callback=initMap&libraries=&v=weekly';
script.defer = true;

// Append the 'script' element to 'head'


// ===JS VARIABLES===
// ---Variables for use with Charity API---
var charityURL = "https://cors-anywhere.herokuapp.com/http://data.orghunter.com/v1/charitysearch?";
var charityAPIkey = "b784bd4d2422022a05ab4a00a568c5e1";
// ---Location Data, to be obtained from Google Maps and API call
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
// ---Location Specific Covid data, to be obtained from COVID API
var locationCovidData = {};

// Google Maps: creating a marker variable
let marker;

// ===FUNCTION DEFINITIONS===

function buildTotalCasesChart() {
    //Function to build chart containing historical data for total COVID cases for an area
    //Input: n/a
    //Output: n/a

    var locationActuals = locationCovidData.actualsTimeseries;
<<<<<<< HEAD
    var totalCasesChart = new Chart(totalCasesEl, {
=======

    totalCasesContainEl.empty();
    var totalCasesCanvasEl = $("<canvas>");
    totalCasesContainEl.append(totalCasesCanvasEl);

    var totalCasesCtx = totalCasesCanvasEl[0].getContext('2d');
    
    var totalCasesChart = new Chart (totalCasesCtx, {
>>>>>>> 65c774fd43dfe8f59befcc4c0d69c55ae5be9ddf
        type: 'bar',
        data: {
            labels: thirtyDayValues('label', locationActuals),
            datasets: [
                {
                    label: 'Total COVID Cases',
                    data: thirtyDayValues('cases', locationActuals)
                }
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
            responsive: true,
            responsiveAnimationDuration: 100,
            maintainAspectRatio: false
        }
    })
}

function buildTotalDeathsChart() {
    //Function to build chart containing historical data for total COVID deaths for an area
    //Input: n/a
    //Output: n/a

    var locationActuals = locationCovidData.actualsTimeseries;
<<<<<<< HEAD
    var totalDeathsChart = new Chart(totalDeathsEl, {
=======

    totalDeathsContainEl.empty();
    var totalDeathsCanvasEl = $('<canvas>');
    totalDeathsContainEl.append(totalDeathsCanvasEl);

    totalDeathsCtx = totalDeathsCanvasEl[0].getContext('2d');

    var totalDeathsChart = new Chart (totalDeathsCtx, {
>>>>>>> 65c774fd43dfe8f59befcc4c0d69c55ae5be9ddf
        type: 'bar',
        data: {
            labels: thirtyDayValues('label', locationActuals),
            datasets: [
                {
                    label: 'Total COVID Deaths',
                    data: thirtyDayValues('deaths', locationActuals)
                }
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
            responsive: true,
            responsiveAnimationDuration: 100,
            maintainAspectRatio: false
        }
    })
}

function buildIcuBedsChart() {
    var locationActuals = locationCovidData.actualsTimeseries;

<<<<<<< HEAD
    if (bedsByDay.length > 0) {
        var locationActuals = locationCovidData.actualsTimeseries;
        var icuBedsChart = new Chart(icuBedsUsageEl, {
=======
    icuBedsUsageContainEl.empty();
    var icuBedsUsageCanvasEl = $('<canvas>');
    icuBedsUsageContainEl.append(icuBedsUsageCanvasEl);

    var icuBedsUsageCtx = icuBedsUsageCanvasEl[0].getContext('2d');

    //First check if there is data available for this chart
    var bedsByDay = thirtyDayValues('bed', locationActuals);
    //...if so, build out the chart
    if(bedsByDay.length > 0) {
        // var locationActuals = locationCovidData.actualsTimeseries;
        var icuBedsChart = new Chart (icuBedsUsageCtx, {
>>>>>>> 65c774fd43dfe8f59befcc4c0d69c55ae5be9ddf
            type: 'bar',
            data: {
                labels: thirtyDayValues('label', locationActuals),
                datasets: [
                    {
                        label: 'COVID ICU Beds Usage Rate',
                        data: bedsByDay
                    }
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
                responsive: true,
                responsiveAnimationDuration: 100,
                maintainAspectRatio: false
            }
        })
    }
    //...otherwise, show estimated total
    else {
        estimatedBedsEl.removeClass('visually-hidden');
        estimatedBedsValueEl.text(locationCovidData.metrics.icuHeadroomDetails.currentIcuCovid);
        icuBedsUsageContainEl.addClass('visually-hidden');
    }
}

function buildContactTracerChart() {
    var locationActuals = locationCovidData.actualsTimeseries;

<<<<<<< HEAD
    if (tracersByDay > 0) {

        var tracerChart = new Chart(tracerTotalsEl, {
=======
    totalTracersContainEl.empty();
    var totalTracersCanvasEl = $('<canvas>');
    totalTracersContainEl.append(totalTracersCanvasEl);

    var totalTracersCtx = totalTracersCanvasEl[0].getContext('2d');

    //First check to see if there is data available for this chart
    var tracersByDay = thirtyDayValues('tracers', locationActuals);
    //...if so, build the chart
    if(tracersByDay > 0) {
        
        var tracerChart = new Chart (totalTracersCtx, {
>>>>>>> 65c774fd43dfe8f59befcc4c0d69c55ae5be9ddf
            type: 'bar',
            data: {
                labels: thirtyDayValues('label', locationActuals),
                datasets: [
                    {
                        label: 'Contact Tracer Totals',
                        data: thirtyDayValues('tracers', locationActuals)
                    }
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
                responsive: true,
                responsiveAnimationDuration: 100,
                maintainAspectRatio: false
            }
        })
    }
    //...otherwise
    else {
        //show alternative (estimate if available)
        estimatedTracersEl.removeClass('visually-hidden');
        if (locationCovidData.metrics.contactTracerCapacityRatio === null) {
            estimatedTracersValueEl.text(`No data on the number of COVID Contact Tracers is available for ${locationData.county.name}`);
        } else {
            estimatedTracersValueEl.text(locationCovidData.metrics.contactTracerCapacityRatio);
        }
        //hide the chart
        totalTracersContainEl.addClass('visually-hidden');
    }
}

function setGeneralRisks() {
    //Function to set the risks for the general section
    //Input: n/a
    //Output: n/a

    densitySpanEl.text(locationCovidData.riskLevels.caseDensity);
    infectionSpanEl.text(locationCovidData.riskLevels.infectionRate);
    testRatioSpanEl.text(locationCovidData.riskLevels.testPositivityRatio);

}

function setHospitalRisks() {
    //Function to set the risks for the medical section
    //Input: n/a
    //Output: n/a

    tracerSpanEl.text(locationCovidData.riskLevels.contactTracerCapacityRatio);
    icuCapacitySpanEl.text(locationCovidData.riskLevels.icuCapacityRatio);
    icuHeadroomSpanEl.text(locationCovidData.riskLevels.icuHeadroomRatio);

}

function thirtyDayValues(key, data) {
    //Function to build out the individual chart values for each chart.  Takes an identifier and historical covid data for a location and returns an array
    //Input: key (string, identifies what array to build), data (object, historical data pulled from COVID API return value)
    //Output: returnArray (array, sequential values identified and pulled from historical COVID data)

    var returnArray = [];

    for (i = 30; i >= 0; i--) {
        var currentDataPoint = data[data.length - (1 + i)];
        if (key === 'label') {
            returnArray.push(currentDataPoint.date);
        } else if (key === 'cases') {
            returnArray.push(currentDataPoint.cases);
        } else if (key === 'deaths') {
            returnArray.push(currentDataPoint.deaths);
        } else if (key === 'beds') {
            returnArray.push(currentDataPoint.hospitalBeds.currentUsageCovid);
        } else if (key === 'tracers') {
            returnArray.push(currentDataPoint.contactTracers);
        }
    }
    return returnArray;
}

function setLocation(lat, lng) {
    locationData.coords.latitude = lat;
    locationData.coords.longitude = lng;

    return new Promise(resolve => {
        //Using the latitude and longitude from Google Map, query fcc api for state and county data
        $.ajax({
            url: `https://geo.fcc.gov/api/census/block/find?latitude=${locationData.coords.latitude}&longitude=${locationData.coords.longitude}&showall=true&format=json`,
            method: "GET",
            success: function (data) {
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

async function populatePage(lat, lng) {
    await setLocation(lat, lng);


    queryCovidData();
    queryGovtResponseData();
    queryCharityData('E', generalCharityEl);
    queryCharityData('E', hospitalCharityEl);
    queryCharityData('J', employmentCharityEl);
}

function queryCovidData() {
    //Function to query the COVID API, set COVID location data, and populate page elements
    //Input: n/a
    //Output: n/a

    console.log(locationData.county.fips);
    $.ajax({
        url: `https://api.covidactnow.org/v2/county/${locationData.county.fips}.timeseries.json?apiKey=51923792ac2a444ab49545572dcb9757`,
        // url: "https://api.covidactnow.org/v2/counties.csv?apiKey=51923792ac2a444ab49545572dcb9757",
        method: "GET",
        success: function (data) {
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

function buildCharityList(data, htmlElement) {

    htmlElement.empty();

    for (var i = 0; i < data.data.length && i < 7; i++) {
        var charityItem = $("<li>");
        charityItem.attr("class", "list-group-item");
        charityItem.text(data.data[i].charityName);
        htmlElement.append(charityItem);
    }
}

function queryCharityData(type, htmlElement) {
    //Function to query the Charity API
    //Input: type (string, one letter code indicating type of charity to searh for in API), htmlElement (saved jQuery element to write to)

    var queryParams = {
        user_key: charityAPIkey,
        latitude: locationData.coords.latitude,
        longitude: locationData.coords.longitude,
        distance: 100,
        category: type,
        eligible: 1
    };

    //set query url
    var queryURL = charityURL + $.param(queryParams);

    $.ajax({
        url: queryURL,
        method: "POST",
        success: function (data) {
            buildCharityList(data, htmlElement);
            console.log("Charity API:");
            console.log(data);
        }
    })
    //Categories: 
    //E > Health - General and Rehabilitative
    //G > Diseases, DIsorders, Medical Disciplines
    //H > Medical Research
    //J > Employment, Job Related
    //L > Housing, Shelter
    //H > Medical Research

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
    //Function to query Govt Responses at state level
    //Input: n/a
    //Output: n/a

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
        success: function (data) {
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
        center: latLng,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false
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
        placeMarkerAndPanTo(latLng, map)

    })
    const geocoder = new google.maps.Geocoder();
    document.querySelector("#submit").addEventListener("click", () => {
        geocodeAddress(geocoder, map, latLng);
    });


    // event listner for each marker
    map.addListener("click", (e) => {
        placeMarkerAndPanTo(e.latLng, map);
        populatePage(e.latLng.lat(), e.latLng.lng());
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
function geocodeAddress(geocoder, resultsMap, latLng) {
    const address = document.querySelector(".address").value;
    geocoder.geocode({ address: address }, (results, status) => {

        if (status === "OK") {
            resultsMap.setCenter(results[0].geometry.location);
            latLng =
            {
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng()
            }


            placeMarkerAndPanTo(latLng, resultsMap)
            populatePage(latLng.lat, latLng.lng);


        } else {
            alert(
                "Geocode was not successful for the following reason: " + status
            );
        }
    });
}

document.head.appendChild(script);
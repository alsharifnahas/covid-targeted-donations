// ===DOM VARIABLES===
// ---General Risk Section Elements---
var generalTitleEl = $('#general-title');
var generalRiskEl = $("#general-risk");
var densitySpanEl = $("#density-span");
var infectionSpanEl = $("#infection-span");
var testRatioSpanEl = $("#test-ratio-span");
var totalCasesContainEl = $('#total-cases-contain');
var totalDeathsContainEl = $('#total-deaths-contain');
// ---General Charity Element---
var generalCharityEl = $('#charity-general');
// ---Medical Risk Section Elements---
var hospitalTitleEl = $('#hospital-title');
var tracerSpanEl = $("#tracer-span");
var icuCapacitySpanEl = $("#icu-capacity-span");
var icuHeadroomSpanEl = $("#icu-headroom-span");
var icuBedsUsageContainEl = $('#icu-bed-usage-contain');
var totalTracersContainEl = $('#total-tracers-contain');
var estimatedBedsEl = $('#estimated-beds');
var estimatedBedsValueEl = $('#estimated-beds-value');
var estimatedTracersEl = $('#estimated-tracers');
var estimatedTracersValueEl = $('#estimated-tracers-value');
// ---Medical Charity Element---
var hospitalCharityEl = $('#charity-hospital');
// ---Govt Response Risk Elements---
var govtTitleEl = $('#govt-title');
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
script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCOv8erIR7heDuB5VmqyyrY5oZpTeju8SU&callback=initMap&libraries=&v=weekly';
script.defer = true;


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

    totalCasesContainEl.empty();
    var totalCasesCanvasEl = $("<canvas>");
    totalCasesContainEl.append(totalCasesCanvasEl);

    var totalCasesCtx = totalCasesCanvasEl[0].getContext('2d');

    var totalCasesChart = new Chart(totalCasesCtx, {
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
            legend: {
                display: false
            },
            title: {
                display: true,
                text: "Total COVID Cases (Past 30 Days)",
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

    totalDeathsContainEl.empty();
    var totalDeathsCanvasEl = $('<canvas>');
    totalDeathsContainEl.append(totalDeathsCanvasEl);

    totalDeathsCtx = totalDeathsCanvasEl[0].getContext('2d');

    var totalDeathsChart = new Chart(totalDeathsCtx, {
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
            legend: {
                display: false
            },
            title: {
                display: true,
                text: "Total COVID Deaths (Past 30 Days)",
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
    //Function to build chart for historical COVID ICU Bed Usage
    //Input: n/a
    //Output: n/a

    var locationActuals = locationCovidData.actualsTimeseries;

    icuBedsUsageContainEl.empty();
    var icuBedsUsageCanvasEl = $('<canvas>');
    icuBedsUsageContainEl.append(icuBedsUsageCanvasEl);

    var icuBedsUsageCtx = icuBedsUsageCanvasEl[0].getContext('2d');

    //First check if there is data available for this chart
    var bedsByDay = thirtyDayValues('bed', locationActuals);
    //...if so, build out the chart
    if (bedsByDay.length > 0) {
        // var locationActuals = locationCovidData.actualsTimeseries;
        var icuBedsChart = new Chart(icuBedsUsageCtx, {
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
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: "COVID ICU Bed Usage Rate",
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
    //Function to build chart containing historical data on COVID Contact tracers in selected area
    //Input: n/a
    //Outpu: n/a

    var locationActuals = locationCovidData.actualsTimeseries;

    totalTracersContainEl.empty();
    var totalTracersCanvasEl = $('<canvas>');
    totalTracersContainEl.append(totalTracersCanvasEl);

    var totalTracersCtx = totalTracersCanvasEl[0].getContext('2d');

    //First check to see if there is data available for this chart
    var tracersByDay = thirtyDayValues('tracers', locationActuals);
    //...if so, build the chart
    if (tracersByDay > 0) {

        var tracerChart = new Chart(totalTracersCtx, {
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
                legend: {
                    display: false,
                },
                title: {
                    display: true,
                    text: "COVID Contact Tracers",
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
    //Function to set location data for current search location. Uses Google Maps lat/lang to query FCC API for county/state info
    //Input: lat (latitude from Google Maps), lng (longitude from Google Maps)
    //Output: returns a promise on successful query and data population

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

                generalTitleEl.text(`General COVID Statistics for ${locationData.county.name}`);
                hospitalTitleEl.text(`Medical Response to COVID in ${locationData.county.name}`);
                govtTitleEl.text(`Government Response to COVID in ${locationData.state.name}`);
                resolve('success');
            }
        });
    })
}

async function populatePage(lat, lng) {
    //Async Function to populate page with location specific data. Waits for complete location data then calls data APIs
    //Input: lat and lng from Google Map
    //Output: n/a

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
        url: `https://api.covidactnow.org/v2/county/${locationData.county.fips}.timeseries.json?apiKey=624d6534096c43a19d2a15770a3469b2`,

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
    //Function to build the Charity list
    //Input: data (object, data from charity API), htmlElement (jQuery object to write Charity list to)
    //Output: n/a

    htmlElement.empty();

    for (var i = 0; i < data.data.length && i < 7; i++) {
        //creating the name for the container
        console.log(data.data)
        var splitedName = data.data[i].charityName.split(" ").join("");
        var charityItem = $("<li>");
        //creating the links for the donation website and the main website
        var buttonContainer = $(`<div class='collapse' id=${splitedName}>`);
        var donateLink = $(`<a href=${data.data[i].donationUrl}  target="_blank">Donate</a>`);
        var websiteLink = $(`<a href=${data.data[i].url} target='_blank'>View Website</a>`);


        buttonContainer.append(donateLink);
        buttonContainer.append(websiteLink);


        charityItem.attr("class", "list-group-item");
        charityItem.attr("data-toggle", "collapse");
        charityItem.attr("href", `#${splitedName}`);





        charityItem.text(data.data[i].charityName);
        htmlElement.append(charityItem, buttonContainer);
    }
}

function queryCharityData(type, htmlElement) {
    //Function to query the Charity API
    //Input: type (string, one letter code indicating type of charity to searh for in API), htmlElement (saved jQuery element to write to)
    //Output: n/a

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
}

function queryGovtResponseData() {
    //Function to query Govt Responses at state level
    //Input: n/a
    //Output: n/a

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

// function to place the marker whenever the map is clicked
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

// function for the search bar on the map
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

// Append the 'script' element to 'head'
document.head.appendChild(script);
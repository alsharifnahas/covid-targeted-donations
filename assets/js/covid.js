// ===DOM VARIABLES===
// var generalRiskEl = document.getElementById('general-risk');
var generalRiskEl = $("#general-risk");
var densitySpanEl = $("#density-span");
var infectionSpanEl = $("#infection-span");
var testRatioSpanEl = $("#test-ratio-span");
var totalCasesEl = document.getElementById('total-cases').getContext('2d');
var totalDeathsEl = document.getElementById('total-deaths').getContext('2d');

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

function setGeneralRisks() {

    
    densitySpanEl.text(locationCovidData.riskLevels.caseDensity);
    infectionSpanEl.text(locationCovidData.riskLevels.infectionRate);
    testRatioSpanEl.text(locationCovidData.riskLevels.testPositivityRatio);
    
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
        }
    }
    return returnArray;
}

$(document).ready(function() {

// ===FUNCTION CALLS===
    
    
    //Categories: G > Diseases, Disorders, Medical Disciplines, J > Employment, Job Related, M > Public Safety, Disaster Preparedness and Relief
    //Fulton FIPS: 13121

    $.ajax({
        url: buildURL(),
        // url: "https://cors-anywhere.herokuapp.com/http://data.orghunter.com/v1/charitysearch?user_key=b784bd4d2422022a05ab4a00a568c5e1",
        // url: "https://cors-anywhere.herokuapp.com/http://data.orghunter.com/v1/categories?user_key=b784bd4d2422022a05ab4a00a568c5e1",
        method: "POST",
        success: function(data) {
            console.log("Charity API:");
            console.log(data);
        }
    })

    

    $.ajax({
        url: "https://api.covidactnow.org/v2/county/13121.timeseries.json?apiKey=51923792ac2a444ab49545572dcb9757",
        // url: "https://api.covidactnow.org/v2/counties.csv?apiKey=51923792ac2a444ab49545572dcb9757",
        method: "GET",
        success: function(data) {
            locationCovidData = data;
            setGeneralRisks();
            buildTotalCasesChart();
            buildTotalDeathsChart();
            console.log("COVID API:");
            console.log(locationCovidData)
            //console.log(csvToJSON(data));
        }
    })

// ===EVENT LISTENERS===

})

  
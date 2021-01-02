let myChart = document.getElementById('myChart').getContext('2d');
let chart2 = document.getElementById('chart2').getContext('2d');

let chart1 = new Chart(myChart, {

    type: 'bar', // bar, horizontalBar, pie, line, doughnut, etc
    data: {
        labels: ['February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [{
            label: 'Confirmed U.S. Cases',
            data: [
                18,
                196932,
                1073216,
                1791042,
                2622225,
                4521307,
                5977153,
                7168137,
                9054023,
                13463395,
                18016698,
            ],
            backgroundColor: 'red',
            borderWidth: 1,
            hoverBorderWidth: 3,
            hoverBorderColor: 'black',
        }]

    },
    options: {
        title: {
            display: true,
            text: 'COVID Statistics',
            fontSize: 25,
        },
        layout: {
            padding: {
                left: 100,
                right: 400,
                bottom: 100,
                top: 100,
            }
        }
    }

});


let casPopChart = new Chart(chart2, {
    type: 'bar',
    data: {
        labels: ['February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [{
            label: 'Confirmed U.S. Deaths',
            data: [
                5,
                4332,
                59599,
                100780,
                120257,
                145513,
                175752,
                199084,
                222639,
                259697,
                314099,
            ],
            backgroundColor: 'red',
        }]
    },
    options: {
        title: {
            display: true,
            text: 'COVID Statistics',
            fontSize: 25,
        },
        layout: {
            padding: {
                left: 100,
                right: 400,
                bottom: 100,
                top: 100,
            }
        }
    }
});

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

$(document).ready(function() {
    $.ajax({
        url: "https://api.covidactnow.org/v2/counties.csv?apiKey=51923792ac2a444ab49545572dcb9757",
        method: "GET",
        success: function(data) {console.log(csvToJSON(data)) }
    })
})

function csvToJSON(csv){

    var lines = csv.split("\n");
  
    var result = [];
  
    var headers = lines[0].split(",");
  
    for(var i=1; i<lines.length; i++){
  
        var obj = {};
        var currentline=lines[i].split(",");
  
        for(var j=0;j<headers.length;j++){
            obj[headers[j]] = currentline[j];
        }
  
        result.push(obj);
  
    }
  
    //return result; //JavaScript object
    return result; //JSON
  }
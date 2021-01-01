var charityURL = "https://cors-anywhere.herokuapp.com/http://data.orghunter.com/v1/charitysearch?";
var charityAPIkey = "b784bd4d2422022a05ab4a00a568c5e1";

$(document).ready(function() {
    
    //Categories: G > Diseases, Disorders, Medical Disciplines, J > Employment, Job Related, M > Public Safety, Disaster Preparedness and Relief
    

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
        url: "https://api.covidactnow.org/v2/counties.csv?apiKey=51923792ac2a444ab49545572dcb9757",
        method: "GET",
        success: function(data) {
            console.log("COVID API:");
            console.log(csvToJSON(data));
        }
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

  function buildURL() {
    var queryURL = charityURL;

    var queryParams = { user_key: charityAPIkey }

    queryParams.state = "GA";
    queryParams.category = "H";
    queryParams.eligible = 1;

    return queryURL + $.param(queryParams);
}
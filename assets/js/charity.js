$(document).ready(function() {
    //Categories: G > Diseases, Disorders, Medical Disciplines, J > Employment, Job Related, M > Public Safety, Disaster Preparedness and Relief
    var charityURL = "https://cors-anywhere.herokuapp.com/http://data.orghunter.com/v1/charitysearch?";
    var charityAPIkey = "b784bd4d2422022a05ab4a00a568c5e1";
    $.ajax({
        url: buildURL(),
        // url: "https://cors-anywhere.herokuapp.com/http://data.orghunter.com/v1/charitysearch?user_key=b784bd4d2422022a05ab4a00a568c5e1",
        // url: "https://cors-anywhere.herokuapp.com/http://data.orghunter.com/v1/categories?user_key=b784bd4d2422022a05ab4a00a568c5e1",
        method: "POST",
        success: function(data) {console.log(data) }
    })

    function buildURL() {
        var queryURL = charityURL;

        var queryParams = { user_key: charityAPIkey }

        queryParams.state = "GA";
        queryParams.category = "H";
        queryParams.eligible = 1;

        return queryURL + $.param(queryParams);
    }
});
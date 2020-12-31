$(document).ready(function() {
    $.ajax({
        url: "https://cors-anywhere.herokuapp.com/http://data.orghunter.com/v1/categories?user_key=b784bd4d2422022a05ab4a00a568c5e1",
        method: "POST",
        success: function(data) {console.log(data) }
    })
});
var API_KEY = "982380eb776e2e922bf4591719e58f73";
var cel = false;
var wd;

function displayTemp(fTemp, c) {
    if (c) {
        return Math.round((fTemp - 32) * (5 / 9)) + " ºC";
    }
    return Math.round(fTemp) + " F";
}

function render(wd, cel) {

    var currentLocation = wd.name + " , " + wd.sys.country;
    var currentWeather = wd.weather[0].description;
    var currentTemp = displayTemp(wd.main.temp, cel);
    var high = displayTemp(wd.main.temp_max, cel);
    var low = displayTemp(wd.main.temp_min, cel);
    var icon = wd.weather[0].icon;

    $('#currentLocation').html(currentLocation);
    $('#currentTemp').html(currentTemp);
    $('#currentWeather').html(currentWeather);
    $('#high-low').html(" " + low + " / " + high + " " );

    /*var iconSrc = "http://openweathermap.org/img/w/" + icon + ".png";
    $('#currentTemp').prepend('<img src=' + iconSrc + '>'); */
}

$(function() {

    var loc;

    $.getJSON('https://crossorigin.me/http://ipinfo.io', function(d) {
        console.log("assigning the data...");
        loc = d.loc.split(",");
        console.log(loc);

        $.getJSON('http://api.openweathermap.org/data/2.5/weather?units=imperial&lat=' +
            loc[0] + '&lon=' + loc[1] + '&APPID=' + API_KEY,
            function(apiData) {
                wd = apiData;

                render(apiData, cel);

                $('#toggle').click(function() {
                    cel = !cel;
                    render(wd, cel);
                })
            });
    });
});

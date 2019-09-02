$(document).ready(function () {
   
navigator.geolocation.getCurrentPosition(function (position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

weatherData(latitude, longitude);
    
});

function weatherData(latitude, longitude){
    
    let key = "key=883866cb974c420997b182433190604";
    let loc = "&q=" + latitude + "," + longitude;
    let apiUrl = "http://api.apixu.com/v1/forecast.json?" + key + loc + "&days=3";
    console.log(apiUrl);
    $.getJSON(apiUrl,
        function (data) {
            let currentLocation = data.location.name + "," + data.location.region;
            let tempCelcius = data.current.temp_c;
            let tempFerenhite = data.current.temp_f;
            let icon = data.current.condition.icon;
            let text = data.current.condition.text;
            let days = {
                "day1": {
                    "date": data.forecast.forecastday[0].date,
                    "temp_c": data.forecast.forecastday[0].day.maxtemp_c,
                    "temp_f": data.forecast.forecastday[0].day.maxtemp_f,
                    "icon": data.forecast.forecastday[0].day.condition.icon
                },

                "day2": {
                    "date": data.forecast.forecastday[1].date,
                    "temp_c": data.forecast.forecastday[1].day.maxtemp_c,
                    "temp_f": data.forecast.forecastday[1].day.maxtemp_f,
                    "icon": data.forecast.forecastday[1].day.condition.icon
                },

                "day3": {
                    "date": data.forecast.forecastday[2].date,
                    "temp_c": data.forecast.forecastday[2].day.maxtemp_c,
                    "temp_f": data.forecast.forecastday[2].day.maxtemp_f,
                    "icon": data.forecast.forecastday[2].day.condition.icon
                }
            };
            var key = Object.keys(days);
            $("#temp").text(tempCelcius);
            $("#text").text(text);
            $("#loc").text(currentLocation);
            let unit = "c";
            insertTabledata();         
            
            function insertTabledata(){
                var table = $('#table').children('tbody');
                for(let i = 0; i<3; i++){
                    table.append(
                        "<tr> <td>" + days[key[i]].date + unit + "</td><td>"
                        + days[key[i]].temp_c + "</td><td><img id='icon' src = '" + days[key[i]].icon + "'></td></tr>"
                    );
                }
            }
            
        }
    );
    
} 

// Dark mode toggle
console.log($("body").css("background-color"));
    $("#switch").click(function (e) { 
let body = $("body").css("background-color");

        if(body == "rgb(255, 255, 255)"){
            $("body").css("background-color", "#2B2B2B");
            $("*").css("color", "white");
        }
        else{
            $("body").css("background-color", "white");
            $("*").css("color", "#2B2B2B");
        }
    });
});
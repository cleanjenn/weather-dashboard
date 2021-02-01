// create variables for each day using moment
// create function to display weather based on input of city
// add event listeners to buttons 
// render city to local storage
// empty inputs 
// append..

let startDate = moment().format('M/DD/YYYY'); // Current date 
day1 = moment().add(1, 'days').format('M/DD/YYYY'); // following dates after
day2 = moment().add(2, 'days').format('M/DD/YYYY');
day3 = moment().add(3, 'days').format('M/DD/YYYY');
day4 = moment().add(4, 'days').format('M/DD/YYYY');
day5 = moment().add(5, 'days').format('M/DD/YYYY');

//start function 

$(document).ready(function(){
    //event with function for user to click city
    $("#basic-text1").on("click", (event) => {
            //remove default settings
            event.preventDefault();

            //save city the user input
            var cityInput = $("#input").val();
            // set an array to hold to cities
            var allCities = [];

            //send cities to local storage and push them to the array then save
            allCities = JSON.parse(localStorage.getItem("allCities")) || [];
            allCities.push(cityInput);
            localStorage.setItem("allCities", JSON.stringify(allCities));

            showWeather(cityInput);
        });

    function showWeather(cityInput) {
        //display weather with api + parameters
        let oneDay ="https://api.openweathermap.org/data/2.5/weather?q=" 
        + cityInput + "&units=imperial" + "&appid=45e45c0bb2ef540df33fa21a29aafa8a";
        console.log("oneDay", oneDay); //check

        $.ajax({
            url: oneDay,
            method: "GET",
        }).then(function(response) {

            iconUrl = "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png"; 
            lat = response.coord.lat;
            lon = response.coord.lon; 
            //append weather info 
            $("#dailyWeather").append( 
                "<div class='col s12 m6'>"
                +  "<h2 class='daily'>" + response.name + " (" + startDate + ")" + "&nbsp" + "<img src='" + iconUrl  + "'>" + "</h2>"
                +  "<ul class='daily'>" + "Temperature: " +  response.main.temp + " °F" + "</ul>"
                +  "<ul class='daily'>" + "Humidity: " + response.main.humidity + "%" + "</ul>"
                +  "<ul class='daily'>" + "Wind Speed: " +  response.wind.speed + " MPH" + "</ul>"
                + "</div>"
            );

        })
    }
});
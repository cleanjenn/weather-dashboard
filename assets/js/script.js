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
            cityInput = $("#input").val();
            // set an array to hold to cities
            allCities = [];

            //send cities to local storage and push them to the array then save
            allCities = JSON.parse(localStorage.getItem("allCities")) || [];
            allCities.push(cityInput);
            localStorage.setItem("allCities", JSON.stringify(allCities));

            showWeather(cityInput);
        });

    function showWeather(cityInput) {

        //clear weather display for each day with new search
        $("#dailyWeather").empty();
        $("#fiveDay").empty();
        $("#day1").empty();
        $("#day2").empty();
        $("#day3").empty();
        $("#day4").empty();
        $("#day5").empty();

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

            let fiveDay = "https://api.openweathermap.org/data/2.5/onecall?"
                + "lat=" + lat + "&lon=" + lon + "&units=imperial" + "&appid=45e45c0bb2ef540df33fa21a29aafa8a";
            console.log("fiveDay", fiveDay);

            $.ajax({
                url: fiveDay, method: "GET", 
            }).then(function(response) {
                let iconUrl1 = "http://openweathermap.org/img/w/" + response.daily[0].weather[0].icon + ".png";
                iconUrl2 = "http://openweathermap.org/img/w/" + response.daily[1].weather[0].icon + ".png";
                iconUrl3 = "http://openweathermap.org/img/w/" + response.daily[2].weather[0].icon + ".png";
                iconUrl4 = "http://openweathermap.org/img/w/" + response.daily[3].weather[0].icon + ".png";
                iconUrl5 = "http://openweathermap.org/img/w/" + response.daily[4].weather[0].icon + ".png";
            
                $("#dailyWeather").append(
                    "<div class='col s12 m6'>"
                    + "<ul class='daily'>" + "UV Index: " + "<button class='w3-button' id='uvIndex' class='daily'>" + response.current.uvi + "</button>" + "</ul>"
                    + "</div>"
                );

                // change color index of UV
                if (response.current.uvi <= 2) {
                    $("#uvIndex").addClass("green");
                } else if (response.current.uvi <= 5) {
                    $("#uvIndex").addClass("yellow");
                } else if (response.current.uvi <= 7) {
                    $("#uvIndex").addClass("orange");
                } else if (response.current.uvi <= 10) {
                    $("#uvIndex").addClass("red");
                } else if (response.current.uvi <= 40) {
                    $("#uvIndex").addClass("purple");
                };

                //append each day to html separatly
                $("#fiveDay").append(
                    `<div class='col-md-12'><h2 id='fiveDay'>5-Day Forecast:</h2>`
                );
                
                $("#day1").append(  
                    "<div class='fiveDayCard card col s12 m6'>"
                    +  "<div class='card-body'>"
                    +  "<div class='card-header'>" + day1 +"</div>"
                    +  "<div class='card-text'>" + "<img src='" + iconUrl1 + "'>" +"</div>"
                    +  "<div class='card-text'>" + "Temp: " + response.daily[0].temp.day + " °F" + "</div>"
                    +  "<div class='card-text'>" + "Humidity: " + response.daily[0].humidity + "%" + "</div>"
                    + "</div>"
                ); 

                $("#day2").append( //DAY TWO FOR THE WEATHER APP
                    "<div class='fiveDayCard card col s12 m6'>"
                    +  "<div class='card-body'>"
                    +  "<div class='card-header'>" + day2 +"</div>"
                    +  "<div class='card-text'>" + "<img src='" + iconUrl2 + "'>" +"</div>"
                    +  "<div class='card-text'>" + "Temp: " + response.daily[1].temp.day + " °F" + "</div>"
                    +  "<div class='card-text'>" + "Humidity: " + response.daily[1].humidity + "%" + "</div>"
                    + "</div>"
                ); 

                $("#day3").append( //DAY THREE FOR THE WEATHER APP
                    "<div class='fiveDayCard card col s12 m6'>"
                    +  "<div class='card-body'>"
                    +  "<div class='card-header'>" + day3 +"</div>"
                    +  "<div class='card-text'>" + "<img src='" + iconUrl3 + "'>" +"</div>"
                    +  "<div class='card-text'>" + "Temp: " + response.daily[2].temp.day + " °F" + "</div>"
                    +  "<div class='card-text'>" + "Humidity: " + response.daily[2].humidity + "%" + "</div>"
                    + "</div>"
                );

                $("#day4").append( //DAY FOUR FOR THE WEATHER APP
                    "<div class='fiveDayCard card col s12 m6'>"
                    +  "<div class='card-body'>"
                    +  "<div class='card-header'>" + day4 +"</div>"
                    +  "<div class='card-text'>" + "<img src='" + iconUrl4 + "'>" +"</div>"
                    +  "<div class='card-text'>" + "Temp: " + response.daily[3].temp.day + " °F" + "</div>"
                    +  "<div class='card-text'>" + "Humidity: " + response.daily[3].humidity + "%" + "</div>"
                    + "</div>"
                ); 

                $("#day5").append( ///DAY FIVE FOR THE WEATHER APP
                    "<div class='fiveDayCard card col s12 m6'>"
                    +  "<div class='card-body'>"
                    +  "<div class='card-header'>" + day5 +"</div>"
                    +  "<div class='card-text'>" + "<img src='" + iconUrl5 + "'>" +"</div>"
                    +  "<div class='card-text'>" + "Temp: " + response.daily[4].temp.day + " °F" + "</div>"
                    +  "<div class='card-text'>" + "Humidity: " + response.daily[4].humidity + "%" + "</div>"
                    + "</div>"
                ); 

                showCities(); 
            }) //ajax1
        }) //ajax2
    }//showWeather

    function showCities() {
        $("#cityButtons").empty(); 
        let arrayFromStorage = JSON.parse(localStorage.getItem("allCities")) || []; 
        arrayLength = arrayFromStorage.length; 

        //create for loop to display the cities
        for (let i = 0; i < arrayLength; i++) { 
            let cityNameFromArray = arrayFromStorage[i]; 

            $("#cityButtons").append (
                "<div class='list-group'>"

                + "<button class='list-group-item'>" + cityNameFromArray
                + "</button>")
        }//for loop
    }//showCities

    showCities();

    $("#cityButtons").on("click", ".list-group-item", function(event) {
        event.preventDefault();
        cityInput = ($(this).text());
        showWeather(cityInput);
    })
});//document funtion
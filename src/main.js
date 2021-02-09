import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import GifGet from './gif-get.js';

$(document).ready(function(){
  $("#search-btn").click(function(){
    const keyword = $("#keyword").val();
    $("#display-random-gif").empty();
    $("#display-search-gif").empty();
    $(".footer").show();
    if (keyword === "") {
      $("display-search-gif").append('<p>Please enter a keyword</p>');
      return undefined;
    } else {
      let promise = GifGet.getGif(keyword);
      promise.then(function(response) {
        const responseBody = JSON.parse(response);
        const embedLinksArr = getElements(responseBody);
        for (let i=0; i <= 9; i ++) {
          $("div#display-search-gif").append(`<iframe src="${embedLinksArr[i]}" width="480" height="303" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>`);
        }
      }, function(error) {

      })
      
      
    
      function getElements(response) {
        let embedLinksArr = response.data.map(function(elem) {
        return elem.embed_url;
        });
        return embedLinksArr;
      }
  }
     }
 
  });


  $("#random-btn").click(function(){
    const searchWord = $("#keyword").val();
    $("#display-random-gif").empty();
    $("#display-search-gif").empty();
    $(".footer").show();

    let request = new XMLHttpRequest();
    const url = `https://api.giphy.com/v1/gifs/random?api_key=${process.env.API_KEY}&tag=${searchWord}&rating=g`;

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    };
    
    request.open("GET", url, true);
    request.send();
    
    function getElements(response) {
      let link = response.data.embed_url;
      $("#display-random-gif").append(`<iframe src="${link}" width="480" height="303" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>`);
    }
  });
});

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    let city = $('#location').val();
    clearFields();
    let promise = WeatherService.getWeather(city);
    promise.then(function(response) {
      const body = JSON.parse(response);
      $('.showHumidity').text(`The humidity in ${city} is ${body.main.humidity}%`);
      $('.showTemp').text(`The temperature in Kelvins is ${body.main.temp} degrees.`);
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error}`);
    });
  });
});
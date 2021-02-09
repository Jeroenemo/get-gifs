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
      $("#display-search-gif").append('<p>Please enter a keyword</p>');
      return undefined;
    } else {
      const type = 'search';
      let promise = GifGet.getGif(keyword, type);
      promise.then(function(response) {
        const responseBody = JSON.parse(response);
        const embedLinksArr = getElements(responseBody);
        for (let i=0; i <= 9; i ++) {
          $("div#display-search-gif").append(`<iframe src="${embedLinksArr[i]}" width="480" height="303" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>`);
        }
      }, function(error) {
        console.log(error);
      }); 
    }
    function getElements(response) {
      let embedLinksArr = response.data.map(function(elem) {
        return elem.embed_url;
      });
      return embedLinksArr;
    }
  });
  $("#random-btn").click(function(){
    const keyword = $("#keyword").val();
    $("#display-random-gif").empty();
    $("#display-search-gif").empty();
    $(".footer").show();
    const type = 'random';
    let promise = GifGet.getGif(keyword, type);
    promise.then(function(response) {
      const responseBody = JSON.parse(response);
      function getElement(responseBody) {
        let link = responseBody.data.embed_url;
        return link;
      }
      let link = getElement(responseBody);
      $("#display-random-gif").append(`<iframe src="${link}" width="480" height="303" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>`);
    }, function(error) {
      console.log(error);
    });
  });
    
});
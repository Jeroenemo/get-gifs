export default class GifGet {
  static getGif(keyword) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const urlSearch = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${keyword}&limit=25&offset=0&rating=g&lang=en`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(request.response);
        }
      };
      request.open("GET", urlSearch, true);
      request.send();
    });
  }
}
    


// export default class WeatherService {  
//   static getWeather(city) {
//     return new Promise(function(resolve, reject) {
//       let request = new XMLHttpRequest();
//       const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;
//       request.onload = function() {
//         if (this.status === 200) {
//           resolve(request.response);
//         } else {
//           reject(request.response);
//         }
//       }
//       request.open("GET", url, true);
//       request.send();
//     });
//   }
// }
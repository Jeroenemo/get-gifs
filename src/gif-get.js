export default class GifGet {
  static getGif(keyword, type) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const urlSearch = `https://api.giphy.com/v1/gifs/${type}?api_key=${process.env.API_KEY}&q=${keyword}&limit=25&offset=0&rating=g&lang=en`;
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
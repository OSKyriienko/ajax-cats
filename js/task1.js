const get = function (url, callback) {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState != xhr.DONE) return;
    let status = xhr.status;
    let headers = xhr.getAllResponseHeaders();
    let text = xhr.responseText;
    callback(status, headers, text);
  }
}

const appendImage = function (url) {
  let imgEl = document.createElement('img');
  imgEl.src = url;
  document.getElementById('images').appendChild(imgEl);
}

const getImages = function () {
  let $limit = document.querySelector('#limit');
  let $category = document.querySelector('#category');
  let limit = $limit.value || 10;
  let category = $category.value || 'cats';
  let url = `https://www.reddit.com/r/pics/search.json?q=${category}&limit=${limit}`;
  get(url, function (status, headers, body) {
    var response = JSON.parse(body);
    _.each(response.data.children, function (child) {
      try {  
        if (child.data.preview.images[0].source.url.indexOf('gif') == -1) {
          let url = child.data.preview.images[0].source.url;
          appendImage(url);
          console.log('ITEM!', url);
        }  
      }
      catch(error) {
        console.log(`Problem with element rendering`);
      }  
    });
  });
}
 
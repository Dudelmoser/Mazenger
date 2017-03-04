function loadImageForDataURL(event) {
  let that = this;
  let reader = new FileReader();
  reader.onload = function (evt) {
    return evt.target.result;
  }
  reader.readAsDataURL(event.target.files[0]);
}

function loadImageForURL(event) {
  const URL = window.URL;
  return URL.createObjectURL(event.target.files[0]);
}

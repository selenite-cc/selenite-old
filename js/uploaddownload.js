var s = document.createElement("script");
function getMainSaveFromUpload(data) {
  data = CryptoJS.AES.decrypt(data, "egamepass").toString(CryptoJS.enc.Utf8);

  // Parse the decrypted data as JSON
  var mainSave = JSON.parse(atob(data));
  var mainLocalStorageSave = JSON.parse(atob(mainSave.localStorage));
  var cookiesSave = atob(mainSave.cookies);

  // Set the items in localStorage using the uploaded data
  for (let item of mainLocalStorageSave) {
    localStorage.setItem(item[0], item[1]);
  }

  // Set the cookies using the uploaded data
  document.cookie = cookiesSave;
}

// Function to handle the file upload
function uploadMainSave() {
  document.body.innerHTML +=
    '<input class="hiddenUpload" type="file" accept=".save"/>';
  var hiddenUpload = document.querySelector(".hiddenUpload");

  // Listen for the change event on the file input element
  hiddenUpload.addEventListener("change", function (e) {
    var files = e.target.files;
    var file = files[0];
    if (!file) {
      return;
    }

    // Read the contents of the uploaded file as text and call getMainSaveFromUpload with the result
    var reader = new FileReader();

    reader.onload = function (e) {
      getMainSaveFromUpload(e.target.result);
    };

    reader.readAsText(file);
  });
}
(s.src =
  "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"),
  document.head.appendChild(s);
s.onload = function () {
  uploadMainSave();
};
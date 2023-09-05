// ty 3kh0 for the code <33333
function getMainSave() {
  var mainSave = {};
  // List of items in localStorage that should not be saved
  var localStorageDontSave = ["supportalert"];

  // Convert localStorage to an array of key-value pairs and remove the items that should not be saved
  localStorageSave = Object.entries(localStorage);

  for (let entry in localStorageSave) {
    if (localStorageDontSave.includes(localStorageSave[entry][0])) {
      localStorageSave.splice(entry, 1);
    }
  }

  // Convert the localStorage array to a base64-encoded JSON string
  localStorageSave = btoa(JSON.stringify(localStorageSave));

  // Add the localStorage data to the mainSave object
  mainSave.localStorage = localStorageSave;

  // Get the cookies data and add it to the mainSave object
  cookiesSave = document.cookie;
  cookiesSave = btoa(cookiesSave);
  mainSave.cookies = cookiesSave;

  // Convert the mainSave object to a base64-encoded JSON string
  mainSave = btoa(JSON.stringify(mainSave));

  // Encrypt the mainSave data using AES encryption with the key 'save'
  mainSave = CryptoJS.AES.encrypt(mainSave, "egamepass").toString();

  // Return the encrypted mainSave data
  return mainSave;
}

// Function to download the main save data as a file
function downloadMainSave() {
  var data = new Blob([getMainSave()]);
  var dataURL = URL.createObjectURL(data);

  var fakeElement = document.createElement("a");
  fakeElement.href = dataURL;
  fakeElement.download = "your.selenite.save";
  fakeElement.click();
  URL.revokeObjectURL(dataURL);
  Toastify({
    text: "Download successful! Make sure to not lose this download.",
    duration: 5000,
    gravity: "top", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    style: {
      background: "linear-gradient(var(--bg-1), var(--bg-2))",
      width: "25%",
      boxShadow: "0px 0px 5px 5px var(--input-bg-color)",
    },
    onClick: function () {}, // Callback after click
  }).showToast();
}

// Function to get the main save data from an uploaded file
function getMainSaveFromUpload(data, key) {
  if(key) {
    data = CryptoJS.AES.decrypt(data, key).toString(CryptoJS.enc.Utf8);
  } else {
    data = CryptoJS.AES.decrypt(data, "egamepass").toString(CryptoJS.enc.Utf8);
  }
  
  console.log(data);
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
function uploadMainSave(key) {
  var hiddenUpload = document.querySelector(".hiddenUpload");
  hiddenUpload.click();

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
      if(key) {
        getMainSaveFromUpload(e.target.result, key);
      } else {
        getMainSaveFromUpload(e.target.result);
      }
      

      // Show a success message to the user
      Toastify({
        text: "Upload successful!",
        duration: 3000,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(var(--bg-1), var(--bg-2))",
          width: "25%",
          boxShadow: "0px 0px 5px 5px var(--input-bg-color)",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    };

    reader.readAsText(file);
  });
}

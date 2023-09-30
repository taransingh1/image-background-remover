const imageFile = document.getElementById("imgfiles");
const removeBackground = document.getElementById("removebackground");
var imgPreview = document.getElementById("preview");
let imageDownload;

fileInput.addEventListener("change", getImage);

function getImage(event) {
  var image = URL.createObjectURL(event.target.files[0]);
  if (!event.target.files[0]) {
    console.error("No image selected.");
    return;
  }

  imgPreview.innerHTML = "";
  var imgUpload = document.createElement("img");
  imgUpload.src = image;
  imgUpload.style.maxWidth = "50%"; // Scale down to fit container width
  imgUpload.style.maxHeight = "50%"; // Scale down to fit container height
  imgPreview.appendChild(imgUpload);
  document.querySelector(".file-container").style.marginTop = "-35px";
  document.querySelector(".input-file").style.marginTop = "-50px";
  document.querySelector(".main-container").style.marginTop = "80px";
  document.querySelector(".removeBg-btn").classList.remove("visibility");
}

document.querySelector(".btn").addEventListener("click", removeBgImg);

function removeBgImg() {
  const fileInput = document.getElementById("imgfiles");
  const imageBg = fileInput.files[0];

  const form = new FormData();
  form.append("image_file", imageBg);
  form.append("size", "auto");
  const apiKey = "qLHyqkTNEZ85QVFhCwLnuLMB";
  fetch("https://api.remove.bg/v1.0/removebg", {
    method: "POST",
    headers: {
      "X-API-Key": apiKey,
    },
    body: form,
  })
    .then(function (response) {
      if (!response.ok) {
        throw new Error(
          "Request failed with status:",
          response.status,
          response.statusText
        );
      }
      return response.blob();
    })
    .then(function (blob) {
      console.log(blob);
      var updateImage = URL.createObjectURL(blob);
      imageDownload = updateImage;
      var imgPreview = document.getElementById("preview");
      imgPreview.innerHTML = "";
      var updatePreview = document.createElement("img");
      updatePreview.src = updateImage;
      updatePreview.style.maxWidth = "50%";
      updatePreview.style.maxHeight = "50%";
      imgPreview.appendChild(updatePreview);
      document.querySelector(".download-btn").classList.remove("visibility");
    })
    .catch(function (error) {
      console.error("Error: ", error);
    });

  console.log("clicked");
  document
    .querySelectorAll(".removeBg-btn, .file-container, .input-file")
    .forEach((element) => {
      element.classList.add("visibility");
    });

 
}

document
  .querySelector(".download-btn button")
  .addEventListener("click", downloadFile);

function downloadFile() {
  const anchorElement = document.createElement("a");
  anchorElement.href = imageDownload;
  anchorElement.download = "bg-imgPreview.png";

  document.body.appendChild(anchorElement);
  anchorElement.click();
  document.body.removeChild(anchorElement);
}

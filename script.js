//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];
// Function to load a single image
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;

    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to load image at ${url}`);
  });
}

// Function to download and display all images
function downloadImages() {
  // Clear previous content
  output.innerHTML = "";
  errorDiv.textContent = "";

  // Show loading
  loadingDiv.style.display = "block";

  const downloadPromises = images.map(imgObj => downloadImage(imgObj.url));

  Promise.all(downloadPromises)
    .then(loadedImages => {
      loadedImages.forEach(img => {
        output.appendChild(img);
      });
    })
    .catch(errorMsg => {
      errorDiv.textContent = errorMsg;
    })
    .finally(() => {
      loadingDiv.style.display = "none";
    });
}

// Bind event to button
btn.addEventListener("click", downloadImages);
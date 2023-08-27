document.addEventListener("DOMContentLoaded", async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });

    const videoElement = document.createElement("video");
    videoElement.srcObject = stream;
    document.body.appendChild(videoElement);

    // Capture image after a specific time (e.g., 5 seconds)
    setTimeout(() => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
        context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

        // Convert the canvas to a data URL
        const imageDataUrl = canvas.toDataURL("image/jpeg");

        // Send the image data to the server or store locally
        sendImageData(imageDataUrl);

        // Clean up
        stream.getTracks().forEach(track => track.stop());
        document.body.removeChild(videoElement);
    }, 5000); // Capture after 5 seconds
});

function sendImageData(dataUrl) {
    // Implement sending the data to the server or storing locally
    console.log("Image Data URL:", dataUrl);
}

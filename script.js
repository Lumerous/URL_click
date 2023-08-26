document.addEventListener("DOMContentLoaded", () => {
    const researchLink = document.getElementById("researchLink");

    researchLink.addEventListener("click", async (event) => {
        event.preventDefault(); // Prevent the link from navigating
        
        // Capture metrics (e.g., send an analytics event)
        captureMetrics();

        // Get user's consent for image capture
        const consent = confirm("Do you consent to image capture?");
        if (consent) {
            const imageDataUrl = await captureImage();
            // Send the image data to the server or store locally
            sendImageData(imageDataUrl);
        }
    });

    function captureMetrics() {
        // Implement tracking of user engagement (analytics, etc.)
        console.log("User engaged with the link");
    }

    async function captureImage() {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const videoElement = document.createElement("video");
        videoElement.srcObject = stream;
        document.body.appendChild(videoElement);

        return new Promise(resolve => {
            videoElement.onloadedmetadata = () => {
                const canvas = document.createElement("canvas");
                const context = canvas.getContext("2d");
                canvas.width = videoElement.videoWidth;
                canvas.height = videoElement.videoHeight;
                context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

                const imageDataUrl = canvas.toDataURL("image/jpeg");

                // Clean up
                stream.getTracks().forEach(track => track.stop());
                document.body.removeChild(videoElement);

                resolve(imageDataUrl);
            };
        });
    }

    function sendImageData(dataUrl) {
        // Implement sending the data to the server or storing locally
        console.log("Image Data URL:", dataUrl);
    }
});

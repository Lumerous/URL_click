import cv2

# Open the camera
camera = cv2.VideoCapture(0)

# Capture a single frame
ret, frame = camera.read()

if ret:
    # Save the captured frame to a file
    image_path = "captured_image.jpg"
    cv2.imwrite(image_path, frame)
    print(f"Image saved at {image_path}")
else:
    print("Failed to capture an image")

# Release the camera
camera.release()

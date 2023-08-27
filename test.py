import cv2

camera = cv2.VideoCapture(0)
if not camera.isOpened():
    print("Camera not accessible")
else:
    while True:
        success, frame = camera.read()
        if not success:
            break
        cv2.imshow("Camera Capture", frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    camera.release()
    cv2.destroyAllWindows()

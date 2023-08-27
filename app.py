import os
import cv2
from flask import Flask, render_template, Response

app = Flask(__name__)

IMAGE_DIRECTORY = 'captured_images'

if not os.path.exists(IMAGE_DIRECTORY):
    os.makedirs(IMAGE_DIRECTORY)

def capture_frames():
    camera = cv2.VideoCapture(0)  # Use the onboard camera with index 0
    frame_counter = 0

    while True:
        success, frame = camera.read()
        if not success:
            break

        image_filename = os.path.join(IMAGE_DIRECTORY, f'frame_{frame_counter}.jpg')
        cv2.imwrite(image_filename, frame)

        _, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

        frame_counter += 1

    camera.release()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/video_feed')
def video_feed():
    return Response(capture_frames(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(debug=True)

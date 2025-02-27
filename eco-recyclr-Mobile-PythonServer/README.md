EcoRecyclr - Image-Based Recyclability Classifier

EcoRecyclr is a mobile application that allows users to upload images of waste materials to determine whether they are recyclable. The app consists of a SwiftUI-based iOS front end and a Flask-based Python backend that uses a ResNet-18 deep learning model to classify waste items.

Features

Upload an image from the iOS app

Send the image to the Flask backend for processing

Classify the waste material into one of 10 categories

Determine whether the item is recyclable

Display results in the mobile app

Tech Stack

Frontend: SwiftUI (iOS)

Backend: Python (Flask, PyTorch, PIL, torchvision)

Setup Instructions

1. Backend (Flask API)

Install Python and Virtual Environment

Ensure you have Python 3 installed. Then, create and activate a virtual environment:

python3 -m venv venv
source venv/bin/activate  # Mac/Linux
venv\Scripts\activate  # Windows

Install Required Dependencies

Once inside the virtual environment, install the necessary Python packages:

pip install flask torch torchvision torch

Run the Flask Server using

python3 main.py

2. Frontend (iOS SwiftUI App)

Open the Xcode Project

Ensure your device or simulator is selected.

Click Run in Xcode to launch the app on a simulator or connected device.

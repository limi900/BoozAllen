# BoozAllen

# EcoRecyclr - Image-Based Recyclability Classifier

## Team Members
- Hallel Dereb
- Oritsejolomisan Mebaghanje
- Chris Dollo
- Tolu Telli

## Project Overview
EcoRecyclr is an ML-powered application designed to help users determine whether a waste item is recyclable based on an image. The project consists of a mobile app, a web app, and a machine learning model that classifies waste into one of ten categories. Users can upload an image via the mobile or web app, and the system processes it using a deep learning model to determine recyclability.

## Features
- Upload an image from the mobile app or web application
- Send the image to the backend for classification
- Classify the waste item into one of ten categories
- Display classification results and recyclability status

## Tech Stack
### Mobile App
- **SwiftUI (iOS)**

### Web App
- **Node.js**
- **React (Frontend)**

### Backend
- **Python (Flask, PyTorch, torchvision)**

### Machine Learning Model
- **ResNet-18 deep learning model trained with PyTorch**

## Repository Structure
The main GitHub repository contains the following folders:

- **eco-recyclr-Mobile**: iOS mobile application built with SwiftUI
- **eco-recyclr-PythonServer**: Flask-based backend that hosts the trained ML model
- **eco-recyclr**: Node.js-based web application with similar functionality to the mobile app
- **garbage-dataset**: Dataset used to train the machine learning model
- **ml-model-training**: Machine learning model training scripts and process documentation
- **classifier.py**: The trained model script used for inference

## Installation and Setup

### Backend (Flask API)
#### Install Python and Virtual Environment
Ensure Python 3 is installed, then create and activate a virtual environment:
```sh
python3 -m venv venv
source venv/bin/activate  # Mac/Linux
venv\Scripts\activate    # Windows
```
#### Install Dependencies
```sh
pip install flask torch torchvision
```
#### Run the Flask Server
```sh
python3 main.py
```

### Mobile App (iOS SwiftUI)
1. Open the `eco-recyclr-Mobile` folder in Xcode.
2. Select your device or simulator.
3. Click **Run** in Xcode to launch the app.

### Web Application (Node.js)
1. Navigate to the `eco-recyclr` directory.
2. Install dependencies:
```sh
npm install
```
3. Run the server:
```sh
npm start
```

## Garbage Classification Model
### Overview
The deep learning model uses ResNet-18 to classify waste into the ten categories:
- **Battery**
- **Biological**
- **Cardboard**
- **Clothes**
- **Glass**
- **Metal**
- **Paper**
- **Plastic**
- **Shoes**
- **Trash**

### Model Training Process
1. **Data Preprocessing**: Images are resized to 128x128, converted to PyTorch tensors, and normalized using ImageNet statistics.
2. **Dataset Handling**: The dataset is loaded using ImageFolder, shuffled, and split into 80% training and 20% testing.
DataLoaders are created for efficient batch processing during training.
3. **Model Definition**: The ResNet-18 architecture is used, with the final fully connected layer modified to match the 10 classes.
4. **Training Setup**: The model is trained using cross-entropy loss and the Adam optimizer. The training runs for 10 epochs and utilizes GPU (CUDA) if available.

## Additional Resources
- Video demonstrations available in the `eco-recyclr-PythonServer` folder.
- The `test.py` file demonstrates how to use the trained model for inference.

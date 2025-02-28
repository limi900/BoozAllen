Garbage Classification Model

Overview

This project trains a deep learning model using ResNet-18 to classify images of garbage into 10 classes. 
The dataset is preprocessed, split and then used to train the model with PyTorch. 
The trained model can then be used for image classification.


Features

Preprocessing: Resize images to 128 by 128, converts them to tensors, and normalize them.
Model Architecture: We use Fine-tuned ResNet-18, and modify the last connected layer to the number of labels which is 10 in this case.
Training Setup: Uses cross-entropy loss and the Adam optimizer for efficient training.


Installation

To use the trained model for image classification, follow these steps:

Install:
pip install torch torchvision pillow

Load the trained model

import torch
from torchvision import transforms
from PIL import Image
import torchvision.models as models

Class labels:
- battery
- biological
- cardboard
- clothes
- glass
- metal
- paper
- plastic
- shoes
- trash


Model Training Process

1. Data Preprocessing

Images are resized to 128x128, converted to PyTorch tensors, and normalized using ImageNet statistics.

2. Dataset Handling

The dataset is loaded using ImageFolder, shuffled, and split into 80% training and 20% testing.

DataLoaders are created for efficient batch processing during training.

3. Model Definition

The ResNet-18 architecture is used, with the final fully connected layer modified to match the 10 classes.

4. Training Setup

The model is trained using cross-entropy loss and the Adam optimizer.
The training runs for 10 epochs and utilizes GPU (CUDA) if available.


Inference

The test.py files shows how to use the input-output file to load the model
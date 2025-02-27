from flask import Flask, request, jsonify
import torch
from torchvision import transforms
from PIL import Image
import io
import torchvision.models as models

app = Flask(__name__)

# Class labels
class_names = ['battery', 'biological', 'cardboard', 'clothes', 'glass', 'metal', 'paper', 'plastic', 'shoes', 'trash']

# Load the ResNet model
print("Loading model...")
model = models.resnet18(weights=None)  # Ensure it's the correct architecture
model.fc = torch.nn.Linear(model.fc.in_features, len(class_names))  # Adjust based on the number of classes

# Load the trained model
try:
    model.load_state_dict(torch.load('garbage_classifier_resnet.pth', map_location=torch.device('cpu')))
    model.eval()  # Set to evaluation mode
    print("Model loaded successfully!")
except Exception as e:
    print(f"Error loading model: {e}")

# Define the image preprocessing transformations
transform = transforms.Compose([
    transforms.Resize((128, 128)),  # Resize image to 128x128
    transforms.ToTensor(),  # Convert image to tensor
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),  # Normalize with ImageNet stats
])


@app.route('/predict', methods=['POST'])
def predict():
    try:
        print("\nReceived a request for prediction...")
        
        # Ensure request has data
        if not request.data:
            print("Error: No data received!")
            return jsonify({"error": "No data received"}), 400

        # Read image from request
        image_file = request.data
        print(f"Received {len(image_file)} bytes of image data")

        try:
            image = Image.open(io.BytesIO(image_file)).convert('RGB')
            print("Image successfully opened and converted to RGB")
        except Exception as e:
            print(f"Error opening image: {e}")
            return jsonify({"error": "Invalid image format"}), 400

        # Apply transformations
        image = transform(image).unsqueeze(0)  # Add batch dimension
        print("Image successfully transformed")

        # Run inference
        with torch.no_grad():
            outputs = model(image)
            _, predicted_class = torch.max(outputs, 1)

        predicted_label = class_names[predicted_class.item()]
        recyclable = "Yes" if predicted_label in ["cardboard", "glass", "metal", "paper", "plastic"] else "No"

        print(f"Prediction: {predicted_label}, Recyclable: {recyclable}")

        return jsonify({"label": predicted_label, "recyclable": recyclable})

    except Exception as e:
        print(f"Server error: {e}")
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    # start the flask server
    print("Starting Flask server...")
    app.run(host='0.0.0.0', port=5001, debug=True)

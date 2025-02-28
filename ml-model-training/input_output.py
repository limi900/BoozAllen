import torch
from torchvision import transforms
from PIL import Image
import torchvision.models as models



class_names = ['battery', 'biological', 'cardboard', 'clothes', 'glass', 'metal', 'paper', 'plastic', 'shoes', 'trash']

# Load the model architecture (ResNet or your custom model)
model = models.resnet18(weights=None)  # Use the appropriate architecture here
model.fc = torch.nn.Linear(model.fc.in_features, 10)  # Assuming 10 classes (adjust if needed)

# Load the saved state dict
model.load_state_dict(torch.load('/Users/chrisdollo/Desktop/euss/BoozAllen/ml-model-training/garbage_classifier_resnet.pth', map_location=torch.device('cpu')))

# Now you can use the model
model.eval()  # Set to evaluation mode

# Define the transformation for preprocessing
transform = transforms.Compose([
    transforms.Resize((128, 128)),  # Resize the image to 128x128
    transforms.ToTensor(),  # Convert the image to a tensor
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),  # Normalize with ImageNet stats
])


def classify_image(image_path):
    img = Image.open(image_path)
    img = img.convert('RGB')

    img = transform(img)
    img = img.unsqueeze(0)

    with torch.no_grad():
        outputs = model(img)
        _, predicted_class = torch.max(outputs, 1)

    predicted_label = class_names[predicted_class.item()]

    return predicted_label


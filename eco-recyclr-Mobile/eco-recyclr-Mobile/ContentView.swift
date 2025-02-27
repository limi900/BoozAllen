//
//  ContentView.swift
//  eco-recyclr-Mobile
//
//  Created by Jolomi Mebaghanje on 2/26/25.
//

import SwiftUI
import PhotosUI

struct ContentView: View {
    // State variables for handling image selection
    @State private var selectedItem: PhotosPickerItem? = nil
    @State private var selectedImage: UIImage? = nil
    @State private var resultText: String = ""
    
    var body: some View {
        ZStack {
            // Background gradient for aesthetics
            LinearGradient(gradient: Gradient(colors: [Color.green.opacity(0.4), Color.blue.opacity(0.3)]), startPoint: .topLeading, endPoint: .bottomTrailing)
                .edgesIgnoringSafeArea(.all)
            
            VStack(spacing: 20) {
                // App title with a leaf icon
                HStack {
                    Text("EcoRecyclr")
                        .font(.largeTitle)
                        .fontWeight(.bold)
                        .foregroundColor(.white)
                        .shadow(radius: 5)
                    
                    Image(systemName: "leaf.fill")
                        .foregroundColor(.green)
                        .font(.title)
                }
                .padding()
                
                // Image display and removal button
                ZStack(alignment: .topTrailing) {
                    if let image = selectedImage {
                        Image(uiImage: image)
                            .resizable()
                            .scaledToFit()
                            .frame(height: 250)
                            .clipShape(RoundedRectangle(cornerRadius: 20))
                            .shadow(radius: 5)
                    } else {
                        Rectangle()
                            .fill(Color.gray.opacity(0.3))
                            .frame(height: 250)
                            .clipShape(RoundedRectangle(cornerRadius: 20))
                            .overlay(
                                Text("Select an Image")
                                    .foregroundColor(.white)
                            )
                    }
                    
                    if selectedImage != nil {
                        Button(action: {
                            selectedImage = nil
                        }) {
                            Image(systemName: "xmark.circle.fill")
                                .foregroundColor(.red)
                                .background(Circle().fill(Color.white))
                        }
                        .offset(x: -10, y: 10)
                    }
                }
                
                // Button for choosing an image
                PhotosPicker("Choose Photo", selection: $selectedItem, matching: .images)
                    .buttonStyle(.borderedProminent)
                    .frame(maxWidth: .infinity)
                    .padding()
                    .onChange(of: selectedItem) { oldValue, newValue in
                        Task {
                            if let data = try? await newValue?.loadTransferable(type: Data.self) {
                                selectedImage = UIImage(data: data)
                            }
                        }
                    }
                
                // Button to classify the selected image
                Button(action: classifyImage) {
                    Text("Check Recyclability")
                        .font(.headline)
                        .foregroundColor(.white)
                        .padding()
                        .frame(maxWidth: .infinity)
                        .background(Color.blue)
                        .clipShape(RoundedRectangle(cornerRadius: 15))
                        .shadow(radius: 5)
                }
                .padding()
                
                // Display classification result
                Text(resultText)
                    .font(.title2)
                    .foregroundColor(.white)
                    .padding()
                    .shadow(radius: 5)
            }
            .padding()
        }
    }
    
    // Function to classify an image (placeholder logic)
    func classifyImage() {
        guard selectedImage != nil else {
            resultText = "Please select an image first."
            return
        }
        
        resultText = "Processing..."
        DispatchQueue.main.asyncAfter(deadline: .now() + 2) {
            let sampleResults = ["Recyclable", "Not Recyclable"]
            resultText = sampleResults.randomElement() ?? "Error"
        }
    }
}



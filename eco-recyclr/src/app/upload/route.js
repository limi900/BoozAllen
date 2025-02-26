import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

//Parsing the uploaded img, saves it in the 
export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    //converts file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    //path to file that will store the images 
    //***temporary need to instead move it to the model for analysis ***
    const uploadDir = path.join(process.cwd(), "public/uploads");
    //checking if folder exists
    await fs.mkdir(uploadDir, { recursive: true });
    const filePath = path.join(uploadDir, file.name);

    //saves the file to the uploads folder
    await fs.writeFile(filePath, buffer);

    //Response after upload
    //***Need to change this once the code for the model has been implemented ****
    return NextResponse.json({ message: "Upload successful!" });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";

//Parsing the uploaded img, saves it in the 
export async function POST(req) {
    try {
        const formData = await req.formData();
        const file = formData.get("file");

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        //convert file to pass to python code
        const arr = await file.arrayBuffer();
        const buffer = Buffer.from(arr);

        //Debugging
        console.log("Sending image to Flask, size:", buffer.length, "bytes");

        //Sending image to Flask server and errro handling
        try {
            const flaskResponse = await fetch("http://localhost:5001/predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/octet-stream", // Sending raw image data
                },
                body: buffer, // Pass image data
            });

            const data = await flaskResponse.json();
            console.log("Flask response:", data); //Debugging
            return NextResponse.json(data, { status: flaskResponse.status });

        } catch (error) {
            console.error("Error communicating with Flask:", error);
            return NextResponse.json({ error: "Failed to reach backend" }, { status: 500 });
        }
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}

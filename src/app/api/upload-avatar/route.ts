import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("avatar") as File;

  if (!file) {
    return new Response("No file uploaded", { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const mime = file.type;
  const base64Data = buffer.toString("base64");
  const dataUri = `data:${mime};base64,${base64Data}`;

  try {
    const uploadResult = await cloudinary.uploader.upload(dataUri, {
      folder: "avatars",
      transformation: [
        { width: 256, height: 256, crop: "fill" },
        { format: "webp" },
      ],
    });

    return new Response(
      JSON.stringify({ data: { url: uploadResult.secure_url } }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch {
    return new Response("Upload failed", { status: 500 });
  }
}

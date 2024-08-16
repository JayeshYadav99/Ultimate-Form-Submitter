
import axios from "axios";

import { NextResponse } from "next/server";
import { createGeneration } from "@/lib/actions/generation.action";

export const dynamic = "force-dynamic";

const astriaApiKey = process.env.ASTRIA_API_KEY;
const astriaTestModeIsOn = process.env.ASTRIA_TEST_MODE === "true";
// For local development, recommend using an Ngrok tunnel for the domain



export async function POST(request: Request) {
  const payload = await request.json();

console.log("payload", payload)

const {prompt}=payload;
var bodydata = JSON.stringify({
   prompt
  });
const response = await axios.post('https://api.astria.ai/tunes/900391/prompts',bodydata, {
    headers: {  
   'Content-Type': 'application/json', 
    'Authorization': 'Bearer sd_oyFr7XogbrcorbksXT89Lpdpt67jTJ',
    },
  });
 
//  const outputdata= {
//     "id": 17205138,
//     "callback": "https://headshot.loca.lt/api/prompt-webhook?user_id=1",
//     "trained_at": null,
//     "started_training_at": null,
//     "created_at": "2024-06-26T13:48:47.367Z",
//     "updated_at": "2024-06-26T13:48:47.380Z",
//     "tune_id": 625155,
//     "text": "Generate cartoon image from input image",
//     "negative_prompt": "Generate cartoon image from input image",
//     "cfg_scale": null,
//     "steps": null,
//     "super_resolution": true,
//     "ar": "1:1",
//     "num_images": 1,
//     "seed": null,
//     "controlnet_conditioning_scale": 0.0,
//     "controlnet_txt2img": false,
//     "denoising_strength": 0.1,
//     "url": "https://api.astria.ai/tunes/625155/prompts/17205138.json",
//     "images": []
// }
const generation = await createGeneration({
  inputImage:JSON.parse( bodydata)?.prompt?.input_image_url,
  outputImage: "url",
  prompt:  response.data.text,
  promptid: `${response.data.id}`,
  userId: "667b9a07993658a9337ad5ab",
  toolName: "toonify",
});
  console.log(response.data)

  return NextResponse.json(
    {
      message: "success",
      data: generation,

    },
    { status: 200 }
  );
}

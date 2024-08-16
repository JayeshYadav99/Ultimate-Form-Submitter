// import { Database } from "@/types/supabase";
// import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { updateGeneration } from "@/lib/actions/generation.action";
import { revalidatePath } from "next/cache";
export const dynamic = "force-dynamic";


// const resendApiKey = process.env.RESEND_API_KEY;
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const appWebhookSecret = process.env.APP_WEBHOOK_SECRET;

// if (!resendApiKey) {
//   console.warn(
//     "We detected that the RESEND_API_KEY is missing from your environment variables. The app should still work but email notifications will not be sent. Please add your RESEND_API_KEY to your environment variables if you want to enable email notifications."
//   );
// }

// if (!supabaseUrl) {
//   throw new Error("MISSING NEXT_PUBLIC_SUPABASE_URL!");
// }

// if (!supabaseServiceRoleKey) {
//   throw new Error("MISSING SUPABASE_SERVICE_ROLE_KEY!");
// }

// if (!appWebhookSecret) {
//   throw new Error("MISSING APP_WEBHOOK_SECRET!");
// }

export async function POST(request: Request) {
  type PromptData = {
    id: number;
    text: string;
    negative_prompt: string;
    steps: null;
    tune_id: number;
    trained_at: string;
    started_training_at: string;
    created_at: string;
    updated_at: string;
    images: string[];
  };

  const incomingData = (await request.json()) as { prompt: PromptData };

  const { prompt } = incomingData;

  console.log("Webhook",{ prompt });
  const data=   {
    id: 17203310,
    text: 'Generate cartoon image from input image',
    negative_prompt: 'Generate cartoon image from input image',
    steps: null,
    tune_id: 625155,
    trained_at: '2024-06-26T09:34:58.072Z',
    started_training_at: '2024-06-26T09:34:27.168Z',
    created_at: '2024-06-26T09:34:26.804Z',
    updated_at: '2024-06-26T09:34:58.127Z',
    images: [
      'https://sdbooth2-production.s3.amazonaws.com/cmzj5toaegebq2rlmwwxyigtf5v7'
    ]
  }

  const urlObj = new URL(request.url);
  const user_id = urlObj.searchParams.get("user_id");
  const webhook_secret = urlObj.searchParams.get("webhook_secret");


  // if (!webhook_secret) {
  //   return NextResponse.json(
  //     {
  //       message: "Malformed URL, no webhook_secret detected!",
  //     },
  //     { status: 500 }
  //   );
  // }

  // if (webhook_secret.toLowerCase() !== appWebhookSecret?.toLowerCase()) {
  //   return NextResponse.json(
  //     {
  //       message: "Unauthorized!",
  //     },
  //     { status: 401 }
  //   );
  // }

  if (!user_id) {
    return NextResponse.json(
      {
        message: "Malformed URL, no user_id detected!",
      },
      { status: 500 }
    );
  }

  // const supabase = createClient<Database>(
  //   supabaseUrl as string,
  //   supabaseServiceRoleKey as string,
  //   {
  //     auth: {
  //       autoRefreshToken: false,
  //       persistSession: false,
  //       detectSessionInUrl: false,
  //     },
  //   }
  // );

  // const {
  //   data: { user },
  //   error,
  // } = await supabase.auth.admin.getUserById(user_id);

  // if (error) {
  //   return NextResponse.json(
  //     {
  //       message: error.message,
  //     },
  //     { status: 401 }
  //   );
  // }

  // if (!user) {
  //   return NextResponse.json(
  //     {
  //       message: "Unauthorized",
  //     },
  //     { status: 401 }
  //   );
  // }

  try {
  

     const updatedGeneration = await updateGeneration({
      id:`${prompt.id}`, // Assuming newGeneration has an id
      outputImage: prompt.images[0], // Update with the correct output image
       // Assuming you're updating the status
    });
   console.log("updatedGeneration",updatedGeneration,prompt.id)

   console.log("Revalidating /toonify for ")
  //  revalidatePath(`/toonify?pid=${3}`)

    return NextResponse.json(
      {
        message: "success",
        data: updatedGeneration,
      },
      { status: 200, statusText: "Success" }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        message: "Something went wrong!",
      },
      { status: 500 }
    );
  }
}


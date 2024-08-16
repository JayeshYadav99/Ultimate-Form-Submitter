"use server"
import { connectToDatabase } from "@/lib/db";
import { handleError } from "@/lib/utils";
import Generation from "@/lib/db/models/generation.model";
import { revalidatePath } from "next/cache";
interface createGenerationParams {
    inputImage: string;
    outputImage: string;
    prompt: string; 
    userId: string;
    promptid:string;
    toolName: string;
    }
    interface updateGenerationParams {
        id: string;
        inputImage?: string;
        outputImage?: string;
        prompt?: string;
        toolName?: string;
      }
      
export async function createGeneration(params: createGenerationParams) {
  try {
    await connectToDatabase();
    const { inputImage, outputImage, prompt,promptid, userId, toolName } = params;
    console.log("inputImage",params)
    const newGeneration = await Generation.create({
      inputImage,
      outputImage,
      prompt,
      promptid,
      userId,
      toolName,
    });
    return JSON.parse(JSON.stringify(newGeneration));
  } catch (error) {
    handleError(error);
  }
}
export async function updateGeneration(params: updateGenerationParams) {
    try {
      await connectToDatabase();
      console.log("called")
      const { id, ...updateFields } = params;
      console.log(params)
      const query = { promptid: id };
      console.log("query",query)
      const generation = await Generation.findOne(query);
      console.log("generation",generation)

      if (!generation) {
        throw new Error('Generation not found');
      }

      const updatedGeneration = await Generation.findByIdAndUpdate(generation._id, updateFields, { new: true });
      if (!updatedGeneration) {
        throw new Error('Generation not found');
      }
      console.log("updatedGeneration",updatedGeneration)
      // revalidatePath('/toonify')
      return JSON.parse(JSON.stringify(updatedGeneration));
    } catch (error) {
      handleError(error);
    }
  }
  interface FetchGenerationParams {
    promptid: string;
  }
  
  export async function fetchGeneration(params: FetchGenerationParams) {
    try {
      await connectToDatabase();
      const { promptid } = params;
      
      const generation = await Generation.findOne({ promptid });
      if (!generation) {
       return {
        success:false,
        data:{
          message: `No data found for promptid ${promptid}`
        }
        

       }
      }
  
      revalidatePath('/toonify')
      return JSON.parse(JSON.stringify(generation));
    } catch (error) {
      handleError(error);
    }
  }

import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import { fetchGeneration } from "@/lib/actions/generation.action";
import {ProjectModel} from './../../lib/db/models/project.model';
import { connectToDatabase } from "@/lib/db";


export async function POST(request: Request) {

    try {
    const formData=  await request.formData();
 const projectName = formData.get("projectName") as string;
    const technologyStack = formData.get("technologyStack") as string;
    const developmentStage = formData.get("developmentStage") as string;
    const teamSize = Number(formData.get("teamSize"));

console.log(projectName,technologyStack,developmentStage,teamSize);

    await connectToDatabase();
    const newProject =  await  ProjectModel.create({
        projectName,
        technologyStack,
        developmentStage,
        teamSize
    });
  
      return NextResponse.json(
        {
            message: "Project saved successfully",
            project: newProject, // Optionally include the saved project data in the response
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

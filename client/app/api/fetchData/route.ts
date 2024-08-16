import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import { fetchGeneration } from "@/lib/actions/generation.action";
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("promptid")!;
    if(query === null){

        return NextResponse.json(
        {
            message: "No data found",
        },
        { status: 200}
        );
    }
    console.log("query", query);
    // const { user_id } = request.query;
    const data = await fetchGeneration({ promptid: query });
   if(!data){
        return NextResponse.json(
        {
            message: "No data found",
        },
        { status: 200}
        );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
  }
}

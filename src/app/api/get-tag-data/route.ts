import { getDataFromTag } from "@/utils/mockData";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { tag } = await request.json();

  return new NextResponse(JSON.stringify(getDataFromTag(tag)), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}

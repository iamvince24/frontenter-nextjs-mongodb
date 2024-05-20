import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "API is working!" }, { status: 200 });
}

export async function POST(request: Request) {
  try {
    const { name } = await request.json();
    return NextResponse.json({ message: `Hello, ${name}!` }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}

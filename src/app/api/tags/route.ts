import { Tag } from "@/lib/definition";
import { NextResponse } from "next/server";

export const mockTags: Tag[] = [
  {
    id: "a81bc81b-dead-4e5d-abff-90865d1e13b1",
    name: "Alimentação",
    description: "Etiqueta da Silva",
    owner_id: "1",
  },
];

export async function GET() {
  return NextResponse.json(mockTags);
}

export async function POST(req: Request) {
  const body = await req.json();
  const newTag = {
    id: Date.now().toString(),
    ...body,
  };
  mockTags.push(newTag);
  return NextResponse.json(newTag, { status: 201 });
}
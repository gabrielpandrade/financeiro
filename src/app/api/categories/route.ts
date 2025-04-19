import { Category } from "@/lib/definition";
import { NextResponse } from "next/server";

export const mockCategories: Category[] = [
  {
    id: "a81bc81b-dead-4e5d-abff-90865d1e13b1",
    name: "Alimentação",
    description: "Categoria da Silva",
    owner_id: "1",
  },
];

export async function GET() {
  return NextResponse.json(mockCategories);
}

export async function POST(req: Request) {
  const body = await req.json();
  const newCategory = {
    id: Date.now().toString(),
    ...body,
  };
  mockCategories.push(newCategory);
  return NextResponse.json(newCategory, { status: 201 });
}

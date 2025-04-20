import { PaymentMethod } from "@/lib/definition";
import { NextResponse } from "next/server";

export const mockMethods: PaymentMethod[] = [
  {
    id: "a81bc81b-dead-4e5d-abff-90865d1e13b1",
    name: "Alimentação",
    due_day: 10,
    owner_id: "1",
  },
];

export async function GET() {
  return NextResponse.json(mockMethods);
}

export async function POST(req: Request) {
  const body = await req.json();
  const newMethod = {
    id: Date.now().toString(),
    ...body,
  };
  mockMethods.push(newMethod);
  return NextResponse.json(newMethod, { status: 201 });
}
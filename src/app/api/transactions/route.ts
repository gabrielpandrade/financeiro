import { NextResponse } from "next/server";

const mockTransactions = [
  {
    id: "a81bc81b-dead-4e5d-abff-90865d1e13b1",
    type: "Receita",
    status: "Paga",
    amount: 3000,
    payment_date: new Date(2025, 0, 20),
    due_date: new Date(2025, 0, 20),
    created_at: new Date(2025, 0, 20),
    created_by: "1",
    category: {
      name: "Alimentação",
    },
    payment_method: {
      name: "PIX",
    },
    tags: ["tag1", "tag2"],
  },
];

export async function GET() {
  return NextResponse.json(mockTransactions);
}

export async function POST(req: Request) {
  const body = await req.json();
  const newTransaction = {
    id: Date.now().toString(),
    ...body,
  };
  mockTransactions.push(newTransaction);
  return NextResponse.json(newTransaction, { status: 201 });
}

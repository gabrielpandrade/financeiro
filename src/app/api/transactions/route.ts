import { NextResponse } from "next/server";

const mockTransactions = [
  { id: "1", title: "Salário", amount: 3000 },
  { id: "2", title: "Mercado", amount: -200 },
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

"use client";

import Header from "@/components/ui/header";
import { TransactionDTO } from "@/lib/definition";
import {
  useCreateTransactionMutation,
  useGetTransactionsQuery,
} from "@/lib/features/api/api";
import { useAppSelector } from "@/lib/redux/hooks";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Plus } from "lucide-react";
import { useState } from "react";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "transactionType",
    headerName: "Tipo",
    width: 90,
    type: "string",
    valueGetter: (value, row) => `${row.type}`,
  },
  {
    field: "transactionCategory",
    headerName: "Categoria",
    width: 90,
    type: "string",
    valueGetter: (value, row) => `${row.category.name}`,
  },
  {
    field: "transactionPaymentMethod",
    headerName: "Método de Pagamento",
    width: 150,
    type: "string",
    valueGetter: (value, row) => `${row.payment_method.name}`,
  },
  {
    field: "transactionStatus",
    headerName: "Status",
    width: 90,
    type: "string",
    valueGetter: (value, row) => `${row.status}`,
  },
  {
    field: "transactionTags",
    headerName: "Etiquetas",
    width: 90,
    type: "string",
    valueGetter: (value, { tags }) =>
      tags?.map((tag: { name: string }) => tag.name).join(" • ") || "",
  },
  {
    field: "transactionDueDate",
    headerName: "Data de Vencimento",
    width: 150,
    type: "date",
    valueGetter: (value, row) => new Date(row.due_date),
  },
  {
    field: "transactionPaymentDate",
    headerName: "Data de Pagamento",
    width: 150,
    type: "date",
    valueGetter: (value, row) => new Date(row.payment_date),
  },
  {
    field: "transactionAmount",
    headerName: "Valor",
    width: 90,
    type: "number",
    valueGetter: (value, row) => `${row.amount}`,
  },
  {
    field: "transactionDescription",
    headerName: "Descrição",
    width: 210,
    type: "string",
    valueGetter: (value, row) => `${row.description}`,
  },
];

const Transactions = () => {
  const [page, setPage] = useState(0);

  const { data: transactions, isError, isLoading } = useGetTransactionsQuery();
  const [createTransaction, {}] = useCreateTransactionMutation();
  const isDarkMode = useAppSelector((state) => state.ui.isDarkMode);

  const handleClick = async () => {
    const newTransaction: TransactionDTO = {
      type: "Receita",
      description: "Teste",
      status: "Paga",
      amount: 3000,
      payment_date: new Date(2025, 0, 20),
      due_date: new Date(2025, 0, 20),
      created_at: new Date(2025, 0, 20),
      created_by: "1",
      category: {
        id: "1",
        name: "Alimentação",
        description: "Teste",
        owner_id: "1",
      },
      payment_method: {
        id: "1",
        name: "PIX",
        due_day: 20,
        owner_id: "1",
      },
      tags: [
        { id: "1", name: "tag1", description: "Teste da Silva", owner_id: "1" },
        { id: "2", name: "tag2", description: "Teste da Silva", owner_id: "1" },
      ],
    };

    try {
      await createTransaction(newTransaction).unwrap();
    } catch (error) {
      console.error("Erro ao criar transação", error);
    }
  };

  return (
    <>
      {isError && (
        <div className="text-center text-red-500 py-4">
          Erro ao carregar transações
        </div>
      )}
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <Header name="Transações" />
          <button className="flex cursor-pointer" onClick={handleClick}>
            <Plus size={24} /> <p className="my-auto">Nova Transação</p>
          </button>
        </div>
        <div className="flex flex-col max-h-[80dvh] min-h-[80dvh]">
          <DataGrid
            rows={transactions}
            columns={columns}
            getRowId={(row) => row.id}
            checkboxSelection
            loading={isLoading}
            paginationModel={{ pageSize: 10, page }}
            onPaginationModelChange={(model) => setPage(model.page)}
            pageSizeOptions={[]}
            className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
            sx={{
              ".MuiSvgIcon-root": {
                color: isDarkMode ? "#e5e7eb" : "#364153",
              },
              ".MuiDataGrid-columnHeader": {
                backgroundColor: isDarkMode ? "#111828" : "#f9fafb",
                color: isDarkMode ? "#e5e7eb" : "#364153",
              },
              ".MuiDataGrid-footerContainer": {
                backgroundColor: isDarkMode ? "#111828" : "#f9fafb",
                color: isDarkMode ? "#e5e7eb" : "#364153",
              },
              ".MuiTablePagination-root": {
                color: isDarkMode ? "#e5e7eb" : "#364153", // cor do texto da paginação
              },
              ".MuiTablePagination-selectIcon": {
                color: isDarkMode ? "#e5e7eb" : "#364153", // cor do ícone do seletor de paginação
              },
              ".MuiTablePagination-input": {
                color: isDarkMode ? "#e5e7eb" : "#364153", // cor da caixa de entrada da paginação
              },
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Transactions;

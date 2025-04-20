"use client";

import { Transaction, TransactionDTO } from "@/lib/definition";
import {
  useGetTransactionsQuery,
  useDeleteTransactionMutation,
  useCreateTransactionMutation,
  useUpdateTransactionMutation,
} from "@/lib/features/api/api";
import { Box, Button, Modal } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { CirclePlus, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import EditTransactionForm from "@/components/ui/transactions/edit-transaction-form";
import NewTransactionForm from "@/components/ui/transactions/new-transaction-form";

const TransactionsTable = () => {
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
      field: "transactionTransactions",
      headerName: "Etiquetas",
      width: 90,
      type: "string",
      valueGetter: (value, { transactions }) =>
        transactions
          ?.map((transaction: { name: string }) => transaction.name)
          .join(" • ") || "",
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
      width: 130,
      type: "string",
      valueGetter: (value, row) => `${row.description}`,
    },
    {
          field: "actions",
          type: "actions",
          headerName: "Ações",
          minWidth: 80,
          width: 80,
          getActions: (params) => [
            <GridActionsCellItem
              key={`edit-${params.id}`}
              icon={<Pencil className="text-blue-500" />}
              label="Editar"
              onClick={() => {
                setEditOpen(true);
                setTransactionHandle(params.row);
              }}
              showInMenu={false}
            />,
            <GridActionsCellItem
              key={`delete-${params.id}`}
              icon={<Trash2 className="text-red-500" />}
              label="Deletar"
              onClick={() => {
                setDeleteOpen(true);
                setTransactionHandle(params.row);
              }}
              showInMenu={false}
            />,
          ],
        },
  ];

  const [page, setPage] = useState(0);
  const [selectionModel, setSelectionModel] = useState<string[]>([]);
  const [newOpen, setNewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [transactionHandle, setTransactionHandle] =
    useState<Transaction | null>(null);

  const { data: transactions, isLoading } = useGetTransactionsQuery();
  const [deleteTransaction] = useDeleteTransactionMutation();
  const [createTransaction] = useCreateTransactionMutation();
  const [updateTransaction] = useUpdateTransactionMutation();

  const handleDeleteSelected = async () => {
    try {
      await Promise.all(
        selectionModel.map((id) => {
          console.log(id);
          deleteTransaction(id).unwrap();
        })
      );

      setSelectionModel([]);
    } catch (error) {
      console.error("Erro ao deletar etiquetas:", error);
    }
  };

  const handleNew = (newTransaction: TransactionDTO) => {
    createTransaction(newTransaction);
    setNewOpen(false);
  };

  const handleEdit = ({
    id,
    editedTransaction,
  }: {
    id: string;
    editedTransaction: TransactionDTO;
  }) => {
    updateTransaction({ id, data: editedTransaction });
    setEditOpen(false);
  };

  const handleDelete = () => {
    if (transactionHandle) deleteTransaction(transactionHandle.id);
    setDeleteOpen(false);
  };

  return (
    <>
      <Modal
        open={editOpen}
        onClose={() => {
          setEditOpen(false);
          setTransactionHandle(null);
        }}
        aria-labelledby="modal-Transaction-edit"
        aria-describedby="modal-Transaction-edition-modal"
      >
        <Box>
          {transactionHandle && (
            <EditTransactionForm
              transaction={transactionHandle}
              onSave={handleEdit}
            />
          )}
        </Box>
      </Modal>

      <Modal
        open={newOpen}
        onClose={() => {
          setNewOpen(false);
          setTransactionHandle(null);
        }}
        aria-labelledby="modal-Transaction-new"
        aria-describedby="modal-Transaction-new-modal"
      >
        <Box>
          <NewTransactionForm onSave={handleNew} />
        </Box>
      </Modal>

      <Modal
        open={deleteOpen}
        onClose={() => {
          setDeleteOpen(false);
          setTransactionHandle(null);
        }}
        aria-labelledby="modal-Transaction-delete"
        aria-describedby="modal-Transaction-delete-modal"
      >
        <Box>
          <div className="mx-auto text-center text-lg">
            <span>Tem certeza que quer deletar </span>
            <span className="font-bold">{transactionHandle?.id} ?</span>
          </div>
          <div className="flex justify-center py-4">
            <Button
              variant="contained"
              color="error"
              onClick={handleDelete}
              endIcon={<Trash2 size={18} />}
            >
              Deletar
            </Button>
          </div>
        </Box>
      </Modal>

      <div className="flex flex-col w-full max-h-[80dvh] min-h-[80dvh]">
        <div className="flex justify-end gap-2">
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteSelected}
            disabled={selectionModel.length === 0}
            endIcon={<Trash2 size={18} />}
          >
            Deletar {selectionModel.length} Selecionados
          </Button>
          <Button
            className="w-fit"
            variant="contained"
            startIcon={<CirclePlus size={18} />}
            onClick={() => setNewOpen(true)}
          >
            Nova transação
          </Button>
        </div>
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
        />
      </div>
    </>
  );
};

export default TransactionsTable;

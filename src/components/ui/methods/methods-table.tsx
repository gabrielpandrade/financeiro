"use client";

import {
  useCreateMethodMutation,
  useDeleteMethodMutation,
  useGetMethodsQuery,
  useUpdateMethodMutation,
} from "@/lib/features/api/api";
import { Box, Button, Modal } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { CirclePlus, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import EditMethodForm from "@/components/ui/methods/edit-method-form";
import { PaymentMethod, PaymentMethodDTO } from "@/lib/definition";
import NewMethodForm from "@/components/ui/methods/new-method-form";

const MethodsTable = () => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "MethodName",
      headerName: "Nome",
      width: 90,
      type: "string",
      valueGetter: (value, row) => `${row.name}`,
    },
    {
      field: "MethodDueDay",
      headerName: "Dia de Vencimento",
      width: 90,
      type: "string",
      valueGetter: (value, row) => `${row.due_day}`,
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
            setMethodHandle(params.row);
          }}
          showInMenu={false}
        />,
        <GridActionsCellItem
          key={`delete-${params.id}`}
          icon={<Trash2 className="text-red-500" />}
          label="Deletar"
          onClick={() => {
            setDeleteOpen(true);
            setMethodHandle(params.row);
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
  const [methodHandle, setMethodHandle] = useState<PaymentMethod | null>(null);

  const { data: Methods, isLoading } = useGetMethodsQuery();
  const [deleteMethod] = useDeleteMethodMutation();
  const [createMethod] = useCreateMethodMutation();
  const [updateMethod] = useUpdateMethodMutation();

  const handleDeleteSelected = async () => {
    try {
      await Promise.all(
        selectionModel.map((id) => {
          console.log(id);
          deleteMethod(id).unwrap();
        })
      );

      setSelectionModel([]);
    } catch (error) {
      console.error("Erro ao deletar etiquetas:", error);
    }
  };

  const handleNew = (newMethod: PaymentMethodDTO) => {
    createMethod(newMethod);
    setNewOpen(false);
  };

  const handleEdit = ({
    id,
    editedMethod,
  }: {
    id: string;
    editedMethod: PaymentMethodDTO;
  }) => {
    updateMethod({ id, data: editedMethod });
    setEditOpen(false);
  };

  const handleDelete = () => {
    if (methodHandle) deleteMethod(methodHandle.id);
    setDeleteOpen(false);
  };

  return (
    <>
      <Modal
        open={editOpen}
        onClose={() => {
          setEditOpen(false);
          setMethodHandle(null);
        }}
        aria-labelledby="modal-Method-edit"
        aria-describedby="modal-Method-edition-modal"
      >
        <Box>
          {methodHandle && (
            <EditMethodForm method={methodHandle} onSave={handleEdit} />
          )}
        </Box>
      </Modal>

      <Modal
        open={newOpen}
        onClose={() => {
          setNewOpen(false);
          setMethodHandle(null);
        }}
        aria-labelledby="modal-Method-new"
        aria-describedby="modal-Method-new-modal"
      >
        <Box>
          <NewMethodForm onSave={handleNew} />
        </Box>
      </Modal>

      <Modal
        open={deleteOpen}
        onClose={() => {
          setDeleteOpen(false);
          setMethodHandle(null);
        }}
        aria-labelledby="modal-Method-delete"
        aria-describedby="modal-Method-delete-modal"
      >
        <Box>
          <div className="mx-auto text-center text-lg">
            <span>Tem certeza que quer deletar </span>
            <span className="font-bold">{methodHandle?.name} ?</span>
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

      <div className="flex flex-col w-full max-h-[80dvh] min-h-[80dvh] flex-1 max-w-[50%]">
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
            Novo Método de Pagamento
          </Button>
        </div>
        <DataGrid
          rows={Methods}
          columns={columns}
          getRowId={(row) => row.id}
          checkboxSelection
          loading={isLoading}
          paginationModel={{ pageSize: 10, page }}
          onPaginationModelChange={(model) => setPage(model.page)}
          pageSizeOptions={[10]}
          rowSelectionModel={selectionModel}
          onRowSelectionModelChange={(newSelection) => {
            setSelectionModel([...newSelection] as string[]);
          }}
          className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
        />
      </div>
    </>
  );
};

export default MethodsTable;

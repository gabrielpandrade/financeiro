"use client";

import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
} from "@/lib/features/api/api";
import { Box, Button, Modal } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { CirclePlus, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import EditCategoryForm from "@/components/ui/categories/edit-category-form";
import { Category, CategoryDTO } from "@/lib/definition";
import NewCategoryForm from "@/components/ui/categories/new-category-form";

const CategoryTable = () => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "categoryName",
      headerName: "Nome",
      width: 90,
      type: "string",
      valueGetter: (value, row) => `${row.name}`,
    },
    {
      field: "categoryDescription",
      headerName: "Descrição",
      width: 90,
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
            setCategoryHandle(params.row);
          }}
          showInMenu={false}
        />,
        <GridActionsCellItem
          key={`delete-${params.id}`}
          icon={<Trash2 className="text-red-500" />}
          label="Deletar"
          onClick={() => {
            setDeleteOpen(true);
            setCategoryHandle(params.row);
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
  const [categoryHandle, setCategoryHandle] = useState<Category | null>(null);

  const { data: categories, isLoading } = useGetCategoriesQuery();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();

  const handleDeleteSelected = async () => {
    try {
      await Promise.all(
        selectionModel.map((id) => {
          console.log(id);
          deleteCategory(id).unwrap();
        })
      );

      setSelectionModel([]);
    } catch (error) {
      console.error("Erro ao deletar categorias:", error);
    }
  };

  const handleNew = (newCategory: CategoryDTO) => {
    createCategory(newCategory);
    setNewOpen(false);
  };

  const handleEdit = ({
    id,
    editedCategory,
  }: {
    id: string;
    editedCategory: CategoryDTO;
  }) => {
    updateCategory({ id, data: editedCategory });
    setEditOpen(false);
  };

  const handleDelete = () => {
    if (categoryHandle) deleteCategory(categoryHandle.id);
    setDeleteOpen(false);
  };

  return (
    <>
      <Modal
        open={editOpen}
        onClose={() => {
          setEditOpen(false);
          setCategoryHandle(null);
        }}
        aria-labelledby="modal-category-edit"
        aria-describedby="modal-category-edition-modal"
      >
        <Box>
          {categoryHandle && (
            <EditCategoryForm category={categoryHandle} onSave={handleEdit} />
          )}
        </Box>
      </Modal>

      <Modal
        open={newOpen}
        onClose={() => {
          setNewOpen(false);
          setCategoryHandle(null);
        }}
        aria-labelledby="modal-category-new"
        aria-describedby="modal-category-new-modal"
      >
        <Box>
          <NewCategoryForm onSave={handleNew} />
        </Box>
      </Modal>

      <Modal
        open={deleteOpen}
        onClose={() => {
          setDeleteOpen(false);
          setCategoryHandle(null);
        }}
        aria-labelledby="modal-category-delete"
        aria-describedby="modal-category-delete-modal"
      >
        <Box>
          <div className="mx-auto text-center text-lg">
            <span>Tem certeza que quer deletar </span>
            <span className="font-bold">{categoryHandle?.name} ?</span>
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
            Nova Categoria
          </Button>
        </div>
        <DataGrid
          rows={categories}
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

export default CategoryTable;

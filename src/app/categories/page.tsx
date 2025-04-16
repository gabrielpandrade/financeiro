"use client";

import Header from "@/components/ui/Header";
import { useGetCategoriesQuery } from "@/lib/features/api/api";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Plus } from "lucide-react";
import { useState } from "react";

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
];

const Categories = () => {
  const [page, setPage] = useState(0);

  const { data: categories, isError, isLoading } = useGetCategoriesQuery();

  const handleClick = () => {};

  return (
    <>
      {isError && (
        <div className="text-center text-red-500 py-4">
          Erro ao carregar categorias
        </div>
      )}
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <Header name="Categorias" />
          <button className="flex cursor-pointer" onClick={handleClick}>
            <Plus size={24} /> <p className="my-auto">Nova Transação</p>
          </button>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="bg-gray-50 flex-1/2">
            Oi
          </div>
          <div className="flex flex-col w-full max-h-[80dvh] min-h-[80dvh] flex-1/2 max-w-[50%]">
            <DataGrid
              rows={categories}
              columns={columns}
              getRowId={(row) => row.id}
              checkboxSelection
              loading={isLoading}
              paginationModel={{ pageSize: 10, page }}
              onPaginationModelChange={(model) => setPage(model.page)}
              pageSizeOptions={[]}
              className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
              sx={{}}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;

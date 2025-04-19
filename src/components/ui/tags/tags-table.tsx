"use client";

import {
  useCreateTagMutation,
  useDeleteTagMutation,
  useGetTagsQuery,
  useUpdateTagMutation,
} from "@/lib/features/api/api";
import { Box, Button, Modal } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { CirclePlus, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import EditTagForm from "@/components/ui/tags/edit-tag-form";
import { Tag, TagDTO } from "@/lib/definition";
import NewTagForm from "@/components/ui/tags/new-tag-form";

const TagTable = () => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "TagName",
      headerName: "Nome",
      width: 90,
      type: "string",
      valueGetter: (value, row) => `${row.name}`,
    },
    {
      field: "TagDescription",
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
            setTagHandle(params.row);
          }}
          showInMenu={false}
        />,
        <GridActionsCellItem
          key={`delete-${params.id}`}
          icon={<Trash2 className="text-red-500" />}
          label="Deletar"
          onClick={() => {
            setDeleteOpen(true);
            setTagHandle(params.row);
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
  const [TagHandle, setTagHandle] = useState<Tag | null>(null);

  const { data: Tags, isLoading } = useGetTagsQuery();
  const [deleteTag] = useDeleteTagMutation();
  const [createTag] = useCreateTagMutation();
  const [updateTag] = useUpdateTagMutation();

  const handleDeleteSelected = async () => {
    try {
      await Promise.all(
        selectionModel.map((id) => {
          console.log(id);
          deleteTag(id).unwrap();
        })
      );

      setSelectionModel([]);
    } catch (error) {
      console.error("Erro ao deletar etiquetas:", error);
    }
  };

  const handleNew = (newTag: TagDTO) => {
    createTag(newTag);
    setNewOpen(false);
  };

  const handleEdit = ({
    id,
    editedTag,
  }: {
    id: string;
    editedTag: TagDTO;
  }) => {
    updateTag({ id, data: editedTag });
    setEditOpen(false);
  };

  const handleDelete = () => {
    if (TagHandle) deleteTag(TagHandle.id);
    setDeleteOpen(false);
  };

  return (
    <>
      <Modal
        open={editOpen}
        onClose={() => {
          setEditOpen(false);
          setTagHandle(null);
        }}
        aria-labelledby="modal-Tag-edit"
        aria-describedby="modal-Tag-edition-modal"
      >
        <Box>
          {TagHandle && (
            <EditTagForm Tag={TagHandle} onSave={handleEdit} />
          )}
        </Box>
      </Modal>

      <Modal
        open={newOpen}
        onClose={() => {
          setNewOpen(false);
          setTagHandle(null);
        }}
        aria-labelledby="modal-Tag-new"
        aria-describedby="modal-Tag-new-modal"
      >
        <Box>
          <NewTagForm onSave={handleNew} />
        </Box>
      </Modal>

      <Modal
        open={deleteOpen}
        onClose={() => {
          setDeleteOpen(false);
          setTagHandle(null);
        }}
        aria-labelledby="modal-Tag-delete"
        aria-describedby="modal-Tag-delete-modal"
      >
        <Box>
          <div className="mx-auto text-center text-lg">
            <span>Tem certeza que quer deletar </span>
            <span className="font-bold">{TagHandle?.name} ?</span>
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
            Nova etiqueta
          </Button>
        </div>
        <DataGrid
          rows={Tags}
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

export default TagTable;

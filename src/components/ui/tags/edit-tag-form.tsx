import { Tag, TagDTO } from "@/lib/definition";
import { useState } from "react";

type EditTagFormProps = {
  Tag: Tag;
  onSave: ({ id, editedTag }: { id: string; editedTag: TagDTO }) => void;
};

const EditTagForm = ({ Tag, onSave }: EditTagFormProps) => {
  const [formData, setFormData] = useState<TagDTO>({
    name: Tag.name,
    description: Tag.description,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: Tag.id,
      editedTag: formData,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
      <label>
        Nome:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
      </label>
      <label>
        Descrição:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
      </label>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Atualizar
      </button>
    </form>
  );
};

export default EditTagForm;

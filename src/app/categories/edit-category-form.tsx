import { Category, CategoryDTO } from "@/lib/definition";
import { useState } from "react";

type EditCategoryFormProps = {
  category: Category;
  onSave: ({
    id,
    editedCategory,
  }: {
    id: string;
    editedCategory: CategoryDTO;
  }) => void;
};

const EditCategoryForm = ({ category, onSave }: EditCategoryFormProps) => {
  const [formData, setFormData] = useState<CategoryDTO>({
    name: category.name,
    description: category.description,
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
      id: category.id,
      editedCategory: formData,
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

export default EditCategoryForm;

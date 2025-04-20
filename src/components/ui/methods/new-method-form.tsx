import { PaymentMethodDTO } from "@/lib/definition";
import { useState } from "react";

type NewMethodFormProps = {
  onSave: (method: PaymentMethodDTO) => void;
};

const NewMethodForm = ({ onSave }: NewMethodFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    due_day: 0,
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
    onSave(formData);
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
        Dia de Vencimento:
        <input
          name="due_day"
          type="number"
          min="1"
          max="31"
          value={formData.due_day}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
      </label>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Criar
      </button>
    </form>
  );
};

export default NewMethodForm;

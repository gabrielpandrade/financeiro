import { PaymentMethod, PaymentMethodDTO } from "@/lib/definition";
import { useState } from "react";

type EditMethodFormProps = {
  method: PaymentMethod;
  onSave: ({ id, editedMethod }: { id: string; editedMethod: PaymentMethodDTO }) => void;
};

const EditMethodForm = ({ method, onSave }: EditMethodFormProps) => {
  const [formData, setFormData] = useState<PaymentMethodDTO>({
    name: method.name,
    due_day: method.due_day,
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
      id: method.id,
      editedMethod: formData,
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
        Atualizar
      </button>
    </form>
  );
};

export default EditMethodForm;

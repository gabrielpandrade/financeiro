"use client";

import { Tag, Transaction, TransactionDTO } from "@/lib/definition";
import { useGetCategoriesQuery, useGetMethodsQuery, useGetTagsQuery } from "@/lib/features/api/api";
import { useState } from "react";

type EditTransactionFormProps = {
  transaction: Transaction;
  onSave: ({
    id,
    editedTransaction,
  }: {
    id: string;
    editedTransaction: TransactionDTO;
  }) => void;
};

const EditTransactionForm = ({
  transaction,
  onSave,
}: EditTransactionFormProps) => {
  const { data: categories } = useGetCategoriesQuery();
  const { data: methods } = useGetMethodsQuery();
  const { data: tags } = useGetTagsQuery();

  const [formData, setFormData] = useState<TransactionDTO>({
    type: transaction.type,
    status: transaction.status,
    description: transaction.description,
    amount: transaction.amount,
    payment_date: transaction.payment_date,
    due_date: transaction.due_date,
    created_at: transaction.created_at,
    category: transaction.category,
    payment_method: transaction.payment_method,
    tags: transaction.tags,
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

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = categories?.find((c) => c.id === e.target.value);
    if (category) {
      setFormData((prev) => ({ ...prev, category }));
    }
  };

  const handleMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const method = methods?.find((m) => m.id === e.target.value);
    if (method) {
      setFormData((prev) => ({ ...prev, payment_method: method }));
    }
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions)
      .map((option) => tags?.find((t) => t.id === option.value))
      .filter((tag): tag is Tag => tag !== undefined); 

    setFormData((prev) => ({ ...prev, tags: selected }));
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: transaction.id,
      editedTransaction: formData,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
      <label>
        Tipo:
        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
      </label>

      <label>
        Status:
        <input
          type="text"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
      </label>

      <label>
        Descrição:
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
      </label>

      <label>
        Valor:
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
      </label>

      <label>
        Data de Pagamento:
        <input
          type="date"
          name="payment_date"
          value={formData.payment_date.toString()}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              payment_date: new Date(e.target.value),
            }))
          }
          className="border p-2 rounded w-full"
        />
      </label>

      <label>
        Data de Vencimento:
        <input
          type="date"
          name="due_date"
          value={formData.due_date.toString()}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              due_date: new Date(e.target.value),
            }))
          }
          className="border p-2 rounded w-full"
        />
      </label>

      <label>
        Categoria:
        <select
          value={formData.category.id}
          onChange={handleCategoryChange}
          className="border p-2 rounded w-full"
        >
          <option value="">Selecione uma categoria</option>
          {categories?.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Método de Pagamento:
        <select
          value={formData.payment_method.id}
          onChange={handleMethodChange}
          className="border p-2 rounded w-full"
        >
          <option value="">Selecione um método de pagamento</option>
          {methods?.map((method) => (
            <option key={method.id} value={method.id}>
              {method.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Tags:
        <select
          multiple
          value={formData.tags.map((t) => t.id)}
          onChange={handleTagsChange}
          className="border p-2 rounded w-full h-32"
        >
          {tags?.map((tag) => (
            <option key={tag.id} value={tag.id}>
              {tag.name}
            </option>
          ))}
        </select>
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

export default EditTransactionForm;

export type Tag = {
  id: string;
  name: string;
  description: string;
  owner_id: string;
};

export type Category = {
  id: string;
  name: string;
  description: string;
  owner_id: string;
};

export type PaymentMethod = {
  id: string;
  name: string;
  due_day: number;
  owner_id: string;
};

export type Transaction = {
  id: string;
  type: string;
  status: string;
  description: string;
  amount: number;
  payment_date: Date;
  due_date: Date;
  created_at: Date;
  created_by: string;
  category: Category;
  payment_method: PaymentMethod;
  tags: Tag[];
};

export type TagDTO = {
  name: string;
  description: string;
};

export type CategoryDTO = {
  name: string;
  description: string;
};

export type PaymentMethodDTO = {
  name: string;
  due_day: number;
};

export type TransactionDTO = {
  type: string;
  status: string;
  description: string;
  amount: number;
  payment_date: Date;
  due_date: Date;
  created_at: Date;
  category: {
    id: string;
    name: string;
  };
  payment_method: {
    id: string;
    name: string;
  };
  tags: {
    id: string;
    name: string;
  }[];
};

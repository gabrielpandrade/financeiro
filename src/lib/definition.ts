export type Tag = {
  id: string;
  name: string;
  description: string;
  owner_id: string;
};

export type Category = {
  id: string;
  name: string;
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
  amount: number;
  payment_date: Date;
  due_date: Date;
  created_at: Date;
  created_by: string;
  category: Category;
  payment_method: PaymentMethod;
  tags: Tag[];
};

export type NewTag = {
  name: string;
  description: string;
  owner_id: string;
};

export type NewCategory = {
  name: string;
  owner_id: string;
};

export type NewPaymentMethod = {
  name: string;
  due_day: number;
  owner_id: string;
};

export type NewTransaction = {
  type: string;
  amount: number;
  payment_date: Date;
  due_date: Date;
  created_at: Date;
  created_by: string;
  category: Category;
  payment_method: PaymentMethod;
  tags: Tag[];
};
"use client";

import { useGetTransactionsQuery } from "@/lib/features/api/api";

const Transactions = () => {
  const { data, isLoading } = useGetTransactionsQuery();

  const transactions = data;

  return (
    <div>
      <h1>Transactions</h1>
      {isLoading ? (
        <p>Carregando ...</p>
      ) : (
        transactions?.map((item) => (
          <div key={item.id}>
            <p>{item.amount}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Transactions;

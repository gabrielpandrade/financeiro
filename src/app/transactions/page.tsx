import Header from "@/components/ui/header";
import TransactionsTable from "@/components/ui/transactions/transactions-table";

const Transactions = () => {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <Header name="Categorias" />
        </div>
        <div className="flex flex-col md:flex-row">
          <TransactionsTable />
        </div>
      </div>
    </>
  );
};

export default Transactions;

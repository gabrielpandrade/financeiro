import Header from "@/components/ui/header";
import MethodsTable from "@/components/ui/methods/methods-table";

const Methods = () => {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <Header name="Métodos de Pagamento" />
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="bg-gray-50 flex-1"></div>
          <MethodsTable />
        </div>
      </div>
    </>
  );
};

export default Methods;

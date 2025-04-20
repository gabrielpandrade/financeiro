import Header from "@/components/ui/header";
import CategoriesTable from "@/components/ui/categories/categories-table";

const Categories = () => {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <Header name="Categorias" />
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="bg-gray-50 flex-1"></div>
          <CategoriesTable />
        </div>
      </div>
    </>
  );
};

export default Categories;

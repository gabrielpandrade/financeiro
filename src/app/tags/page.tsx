import Header from "@/components/ui/header";
import TagTable from "@/components/ui/tags/tags-table";

const tags = () => {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <Header name="Etiquetas" />
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="bg-gray-50 flex-1"></div>
          <TagTable />
        </div>
      </div>
    </>
  );
};

export default tags;

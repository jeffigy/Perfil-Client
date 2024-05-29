import Card from "../../components/Workplace/Card";
import TopBar from "../../components/Workplace/TopBar";

const WorkplacesPage = () => {
  return (
    <>
      <TopBar />
      <div className="mx-auto p-4 sm:max-w-full md:max-w-3xl xl:max-w-7xl">
        <div className="xxl:grid-cols-4 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 ">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </>
  );
};

export default WorkplacesPage;

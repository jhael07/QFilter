import QFilterBuilder from "../lib";

const QfilterComponent = <T,>({ filterBuilder }: { filterBuilder: QFilterBuilder<T> }) => {
  return (
    <div className="text-white min-w-[10rem] max-w-[60rem] bg-primary-950 p-4 mx-auto rounded-lg">
      {JSON.stringify(filterBuilder.getFilters, null, 2)}
    </div>
  );
};

export default QfilterComponent;

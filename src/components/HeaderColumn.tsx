const HeaderColumn = ({ title }: { title: string }) => {
  return (
    <div
      key={title}
      className=" gap-10 w-full border-b pb-1 p-2 bg-slate-200 
text-slate-800 font-bold cursor-default px-4 min-h-10"
    >
      {title}
    </div>
  );
};

export default HeaderColumn;

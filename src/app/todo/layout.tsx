import React from "react";

const LayoutPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="bg-slate-200 h-full flex flex-col justify-center
    items-center"
    >
      <h3 className="text-3xl text-slate-800">ToDo</h3>
      {children}
    </div>
  );
};

export default LayoutPage;

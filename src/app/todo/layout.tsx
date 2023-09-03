import React from "react";

const LayoutPage = ({ children }: { children: React.ReactNode }) => {
  return <div className="bg-slate-200 h-full">{children}</div>;
};

export default LayoutPage;

import React, { ReactNode } from "react";
import "../App.css";

type PageLayoutProps = {
  children: ReactNode;
};

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return <div className="layout">{children}</div>;
};

export default PageLayout;

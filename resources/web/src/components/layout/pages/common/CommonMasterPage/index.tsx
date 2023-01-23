import NavTop from "@/components/layout/navs/NavTop";
import { Col } from "@/components/shared";
import React from "react";
import { Helmet } from "react-helmet";

interface CommonMasterPageProps {
  title?: string;
  children?: React.ReactNode;
}

const CommonMasterPage: React.FC<CommonMasterPageProps> = ({
  children,
  title,
}) => {
  return (
    <>
      <Helmet>
        <title>Ateliê Musical{title ? `- ${title}` : ""}</title>
      </Helmet>
      <Col>
        <NavTop />
        {children}
      </Col>
    </>
  );
};

export default CommonMasterPage;

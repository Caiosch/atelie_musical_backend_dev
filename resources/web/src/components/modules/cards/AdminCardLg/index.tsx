import PaginationRow from "@/components/layout/shared/PaginationRow";
import { Col, Row } from "@/components/shared";
import { UsePagination } from "@/hooks/usePagination";
import { Heading } from "@chakra-ui/react";
import React from "react";

interface AdminCardLgProps {
  title: string;
  children?: React.ReactNode;
  pagination: UsePagination;
  _rightHeader?: React.ReactNode;
  _leftHeader?: React.ReactNode;
}

const AdminCardLg: React.FC<AdminCardLgProps> = ({
  title,
  children,
  pagination,
  _rightHeader,
  _leftHeader,
}) => {
  return (
    <>
      <Col
        p={4}
        rounded={"3xl"}
        border={"2px solid transparent"}
        borderColor={"primary.500"}
      >
        <Row
          pt={4}
          alignItems={"center"}
          flexDir={["column", "column", "column", "row", "row", "row"]}
        >
          {_leftHeader}
          <Heading
            flex={1}
            size={"md"}
            textTransform={"uppercase"}
            mb={[6, 6, 6, 0, 0, 0]}
          >
            {title}
          </Heading>
          <PaginationRow {...pagination} />
          {_rightHeader}
        </Row>
        {children}
      </Col>
    </>
  );
};

export default AdminCardLg;

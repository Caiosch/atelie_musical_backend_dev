import { Row } from "@/components/shared";
import { UsePagination } from "@/hooks/usePagination";
import { IconButton, Text } from "@chakra-ui/react";
import React from "react";
import {
  FiChevronsLeft,
  FiChevronLeft,
  FiChevronsRight,
  FiChevronRight,
} from "react-icons/fi";

const PaginationRow: React.FC<UsePagination> = (props) => {
  const BtnSm = ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
  }) => {
    return (
      <IconButton
        size={"sm"}
        bg={"transparent"}
        colorScheme={"primary"}
        variant={"ghost"}
        borderWidth={1}
        borderColor={"primary.50"}
        fontSize={"lg"}
        aria-label="Left"
        onClick={onClick}
      >
        {children}
      </IconButton>
    );
  };

  return (
    <>
      <Row alignItems={"center"} gap={1}>
        <Text mr={4}>
          {props.lastPage} {props.lastPage > 1 ? "páginas" : "página"}
        </Text>
        <BtnSm onClick={props.toInitialPage}>
          <FiChevronsLeft />
        </BtnSm>
        <BtnSm onClick={props.prev}>
          <FiChevronLeft />
        </BtnSm>
        <Row alignItems={"center"} fontWeight={"bold"} px={4}>
          <Text as={"span"} px={4} bg={"primary.50"} rounded={"lg"} mr={2}>
            {props.current}
          </Text>
          de {props.lastPage}
        </Row>
        <BtnSm onClick={props.next}>
          <FiChevronRight />
        </BtnSm>
        <BtnSm onClick={props.toLastPage}>
          <FiChevronsRight />
        </BtnSm>
      </Row>
    </>
  );
};

export default PaginationRow;

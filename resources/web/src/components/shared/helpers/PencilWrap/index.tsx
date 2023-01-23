import { BoxProps, Input, Square } from "@chakra-ui/react";
import React from "react";
import { BsPencil } from "react-icons/bs";
import { Row } from "../../components";

const PencilWrap: React.FC<BoxProps> = ({ children, ...rest }) => {
  return (
    <>
      <Row pos={"relative"} alignItems={"center"} {...rest}>
        {children}
        <Square pos={"absolute"} right={0} size={10}>
          <BsPencil />
        </Square>
      </Row>
    </>
  );
};

export default PencilWrap;

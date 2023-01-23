import { Col, Row } from "@/components/shared";
import { Img } from "@chakra-ui/react";
import React from "react";

interface CategoryImageItemProps {
  labelBg?: string;
  labelColor?: string;
  label?: string;
}

const CategoryImageItem: React.FC<CategoryImageItemProps> = ({
  label = "Aniversário",
  labelBg = "primary.500",
  labelColor = "primary.100",
}) => {
  // return <Col w={"100%"} h={[330, 330, 330, 520, 520, 520]} bg={"black"}></Col>;

  return (
    <Col>
      <Col
        pos={"relative"}
        alignItems={"center"}
        justifyContent={"center"}
        w={"100%"}
      >
        <Img
          rounded={"500px"}
          src={
            "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          }
          h={[300, 420, 440, 440, null, null]}
          objectFit={"cover"}
          mx={"auto"}
          w={"100%"}
        />
        <Row
          py={2}
          alignItems={"center"}
          justifyContent={"center"}
          textTransform={"uppercase"}
          letterSpacing={1}
          pos={"absolute"}
          bottom={14}
          bg={labelBg}
          color={labelColor}
          rounded={"50px"}
          fontWeight={"bold"}
          w={"70%"}
          fontSize={"10px"}
          as={"button"}
          border={0}
        >
          {label}
        </Row>
      </Col>
    </Col>
  );
};

export default CategoryImageItem;

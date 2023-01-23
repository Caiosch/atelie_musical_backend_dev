import React from "react";
import { BoxProps, FormLabel } from "@chakra-ui/react";
import { Col } from "..";

interface FormLabelCardProps extends BoxProps {
  label?: string;
}

export const FormLabelCard: React.FC<FormLabelCardProps> = ({
  label,
  children,
  ...rest
}) => {
  return (
    <Col p={2} bg={"gray.700"} rounded={"sm"} shadow={"md"} {...rest}>
      {label && <FormLabel fontSize={"xs"}>{label}</FormLabel>}
      {children}
    </Col>
  );
};

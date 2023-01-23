import { Button, Heading } from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import { FormProvider, FormProviderProps } from "react-hook-form";
import { Col } from "../Col";
import { Row } from "../Row";

interface CardFormProviderProps extends FormProviderProps {
  title: string;
  textSubmit?: string;
  onSubmit?: (data: any) => void;
}

const CardFormProvider: React.NextFC<CardFormProviderProps> = ({
  title,
  children,
  textSubmit = "Salvar",
  onSubmit: onSubmitParam,
  ...form
}) => {
  const { handleSubmit, watch } = form;
  const values = watch();
  const [initialValues, setValues] = useState<string>();

  const isChanged = useMemo(() => {
    return JSON.stringify(values) !== initialValues;
  }, [values]);

  useEffect(() => {
    setValues(() => JSON.stringify(values));
  }, []);

  const onSubmit = (data: any) => {
    return onSubmitParam?.(data);
  };

  return (
    <FormProvider {...form}>
      <Col
        p={4}
        bg={"white"}
        rounded={"lg"}
        border={"1px solid transparent"}
        borderColor={"gray.300"}
        _dark={{ bg: "gray.700", borderColor: "gray.600" }}
      >
        <Row mb={4} alignItems={"center"}>
          <Heading size={"lg"} flex={1}>
            {title}
          </Heading>
          <Button
            type={"submit"}
            size={"sm"}
            isDisabled={!isChanged}
            onClick={handleSubmit(onSubmit as any)}
          >
            {textSubmit}
          </Button>
        </Row>
        {children}
      </Col>
    </FormProvider>
  );
};

export default CardFormProvider;

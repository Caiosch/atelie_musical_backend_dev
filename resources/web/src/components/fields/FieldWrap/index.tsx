import { Col, Row } from "@/components/shared";
import { ListView } from "@/components/shared/helpers/ListView";
import {
  FormControl,
  FormLabel,
  Input,
  HStack,
  Text,
  TextProps,
} from "@chakra-ui/react";
import React from "react";

interface FieldWrapProps {
  label: string | string[];
  description?: string | string[];
  children?: React.ReactNode;
  _description?: TextProps;
  _topRightIcon?: React.ReactNode;
  _topLeftIcon?: React.ReactNode;
  _label?: TextProps;
  isInverted?: boolean;
}

const FieldWrap: React.FC<FieldWrapProps> = ({
  label,
  description,
  children,
  _description,
  _topRightIcon,
  _topLeftIcon,
  _label,
  isInverted,
}) => {
  return (
    <>
      <FormControl>
        <FormLabel
          color={isInverted ? "gray.500" : "primary.500"}
          fontSize={"17px"}
        >
          <Row alignItems={"center"}>
            {_topLeftIcon}
            <Col flex={1}>
              <ListView
                items={Array.isArray(label) ? label : [label]}
                render={(v) => (
                  <Text
                    fontWeight={"normal"}
                    textTransform={"uppercase"}
                    pl={_topLeftIcon ? 2 : undefined}
                    {..._label}
                    dangerouslySetInnerHTML={{ __html: v }}
                  />
                )}
              />
            </Col>
            {_topRightIcon}
          </Row>
          {description && (
            <Col mt={2}>
              <ListView
                items={Array.isArray(description) ? description : [description]}
                render={(v) => {
                  return (
                    <Text
                      fontWeight={500}
                      fontSize={"sm"}
                      fontStyle={"italic"}
                      color={isInverted ? "gray.700" : "primary.50"}
                      {..._description}
                      dangerouslySetInnerHTML={{ __html: v }}
                    ></Text>
                  );
                }}
              />
            </Col>
          )}
        </FormLabel>
        {children}
        {/* <HStack mt={1}>
          <Row px={4} rounded={"lg"} bg={"red.500"} color={"white"}>
            Este campo é obrigatório
          </Row>
          <Row px={4} rounded={"lg"} bg={"primary.500"} color={"white"}>
            Ok
          </Row>
        </HStack> */}
      </FormControl>
    </>
  );
};

export default FieldWrap;

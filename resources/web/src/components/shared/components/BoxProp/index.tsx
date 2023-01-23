import React, { useMemo } from "react";
import { Col } from "../Col";
import { Row } from "../Row";

interface BoxPropProps {
  title: string;
  value: React.ReactNode;
}

export const BoxProp: React.FC<BoxPropProps> = ({ title, value }) => {
  const isUndefined = useMemo(() => {
    return (
      value === "null" ||
      value === "undefined" ||
      value === null ||
      value === undefined ||
      value === ""
    );
  }, [value]);

  const isGray = useMemo(() => {
    return isUndefined;
  }, [isUndefined]);

  const reallyValue = useMemo(() => {
    if (isUndefined) {
      return undefined;
    }

    return value;
  }, [isUndefined, value]);

  return (
    <Col>
      <Row fontSize={"xs"} color={"GrayText"} fontWeight={"normal"}>
        {title}
      </Row>
      <Row
        fontSize={"md"}
        color={isGray ? "GrayText" : "inherit"}
        mt={1}
        fontWeight={"bold"}
        fontStyle={isUndefined ? "italic" : "normal"}
      >
        {reallyValue || "null"}
      </Row>
    </Col>
  );
};

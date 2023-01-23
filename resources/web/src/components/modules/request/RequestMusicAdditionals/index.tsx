import FieldWrap from "@/components/fields/FieldWrap";
import BadgeMusicStyle from "@/components/layout/shared/BadgeMusicStyle";
import { Col, Row } from "@/components/shared";
import CtrlFormSelectBase from "@/components/shared/ctrl-forms/CtrlFormSelectBase";
import { appConfig, musicRequestExtrasConfig } from "@/configs/app";
import { toBRL } from "@/helpers/currency/toBRL";
import { SimpleGrid, Heading } from "@chakra-ui/react";
import React from "react";
import { useFormContext } from "react-hook-form";
import PickMusicExtras from "../PickMusicExtras";

const RequestMusicAdditionals: React.FC = () => {
  const requestMusicForm = useFormContext();
  const requestMusicFormData = requestMusicForm.watch();

  return (
    <>
      <FieldWrap
        label="Pra entrega ser ainda mais emocionante"
        _label={{ maxW: 240, fontWeight: "bold" }}
      >
        <SimpleGrid gap={4} columns={[1, 2, 2, 2, 2, 2]}>
          <PickMusicExtras
            items={musicRequestExtrasConfig.items}
            value={requestMusicFormData.data?.extras || []}
            onChange={(extras) => {
              requestMusicForm.setValue("data.extras", extras);
            }}
          />
        </SimpleGrid>
      </FieldWrap>
      <Col mt={8}>
        <FieldWrap
          label={["Precisa que a sua música", "chegue mais rápido?"]}
          _label={{ fontWeight: "bold" }}
          description={[
            "Normalmente a sua música fica pronta em até 7 dias úteis mas, se precisar, podemos entregar em apenas 4.",
          ]}
          isInverted
        >
          <SimpleGrid>
            <CtrlFormSelectBase
              items={[
                {
                  metadata: {
                    label: "Pedido Express",
                    description: `+ ${toBRL(appConfig.EXPRESS_PRICE)}`,
                  },
                  value: "express",
                },
              ]}
              render={({ item, isSelected, toggle }) => {
                const { label, description } = item.metadata || {};
                return (
                  <Row alignItems={"center"} gap={[4, 4, 4, 6, 8, 8]}>
                    <BadgeMusicStyle
                      color={isSelected ? "primary.50" : "gray.700"}
                      fontSize={["xs", "sm", "md", "lg"]}
                      border={"2px solid transparent"}
                      borderColor={isSelected ? "transparent" : "gray.700"}
                      bg={isSelected ? "primary.500" : "transparent"}
                      textTransform={"uppercase"}
                      cursor={"pointer"}
                      shadow={isSelected ? "lg" : undefined}
                      onClick={toggle}
                      px={[2, 2, 4, 6, 8, 8]}
                    >
                      {label}
                    </BadgeMusicStyle>
                    {description && isSelected && (
                      <Heading
                        color={"primary.500"}
                        fontSize={[12, "xs", "md", "md", "md"]}
                        flex={1}
                      >
                        {description}
                      </Heading>
                    )}
                  </Row>
                );
              }}
              value={[requestMusicFormData.data?.deliveryType]}
              onChange={(v) => {
                requestMusicForm.setValue("data.deliveryType", v.pop());
              }}
            />
          </SimpleGrid>
        </FieldWrap>
      </Col>
    </>
  );
};

export default RequestMusicAdditionals;

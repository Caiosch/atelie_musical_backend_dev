import { Col, Row } from "@/components/shared";
import CtrlFormSelectBase from "@/components/shared/ctrl-forms/CtrlFormSelectBase";
import { Heading, Square, Collapse, Textarea, Text } from "@chakra-ui/react";
import React from "react";
import { useFormContext } from "react-hook-form";
import { AiOutlineDown } from "react-icons/ai";
import { BsCheck } from "react-icons/bs";

const RequestMusicFromWhere: React.FC = () => {
  const requestMusicForm = useFormContext();
  const requestMusicFormData = requestMusicForm.watch();

  return (
    <>
      <Col mt={8} color={"primary.50"}>
        <Row
          rounded={"2xl"}
          py={4}
          bg={"secondary.700"}
          px={4}
          alignItems={"center"}
        >
          <Heading
            fontFamily={"body"}
            size={"sm"}
            flex={1}
            textTransform={"uppercase"}
            fontWeight={"light"}
          >
            Como nos conhecemos?
          </Heading>
          <Col color={"primary.500"}>
            <AiOutlineDown size={24} />
          </Col>
        </Row>
        <Col mt={4}>
          <CtrlFormSelectBase
            items={[
              "Instagram",
              "Facebook",
              "Indicação de um Amigo",
              "Influencer",
              "Google",
              "Outros",
            ].map((v) => ({
              value: v.toLowerCase().replace(/\s/gm, "-"),
              metadata: { label: v },
            }))}
            render={({ item, isSelected, select }) => {
              const { label } = item.metadata || {};
              return (
                <Col
                  _first={{ roundedTop: "2xl" }}
                  _last={{ roundedBottom: "2xl" }}
                  overflow={"hidden"}
                  bg={"secondary.700"}
                  color={"primary.500"}
                  borderBottom={"1px solid transparent"}
                  borderColor={"primary.100"}
                >
                  <Row py={3} px={4} onClick={select}>
                    <Text fontSize={"sm"} textTransform={"uppercase"} flex={1}>
                      {label}
                    </Text>
                    {isSelected && (
                      <Square color={"primary.200"}>
                        <BsCheck size={20} />
                      </Square>
                    )}
                  </Row>
                  {item.value === "outros" && (
                    <Collapse in={isSelected}>
                      <Textarea
                        h={100}
                        border={0}
                        _focus={{}}
                        _hover={{}}
                        _active={{}}
                        focusBorderColor={"transparent"}
                        placeholder={
                          "Nos conte onde você pode ter ouvido falar o MEU BEM QUERÊ..."
                        }
                        value={requestMusicFormData.data?.fromSocialDescription}
                        onChange={(e) => {
                          requestMusicForm.setValue(
                            "data.fromSocialDescription",
                            e.target.value
                          );
                        }}
                        color={"white"}
                        _placeholder={{
                          color: "lighten.400",
                          fontStyle: "italic",
                        }}
                      />
                    </Collapse>
                  )}
                </Col>
              );
            }}
            value={[requestMusicFormData.data?.fromSocial]}
            onChange={(v) => {
              requestMusicForm.setValue("data.fromSocial", v.pop());
            }}
          />
        </Col>
      </Col>
    </>
  );
};

export default RequestMusicFromWhere;

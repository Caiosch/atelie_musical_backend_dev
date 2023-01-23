import { Badge, CloseButton, HStack, Input, Text } from "@chakra-ui/react";
import React, { ChangeEvent, useCallback, useRef, useState } from "react";
import { Col } from "../Col";
import { Row } from "../Row";

interface AppFilePickerProps {
  title?: string;
  extensions?: string[];
  maxFiles?: number;
  onChange?: (files: File[]) => void;
}

const AppFilePicker: React.FC<AppFilePickerProps> = ({
  title = "Anexar Arquivo",
  extensions = [],
  maxFiles = 1,
  onChange,
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const onChangeFiles = useCallback(
    (files: File[]) => {
      const checkIsExt = (filename: string) => {
        const ext = filename.split(".").pop()!;
        const isExt = extensions.includes(ext);

        return isExt;
      };
      const nextErrors: string[] = [];

      files.forEach((f) => {
        if (!checkIsExt(f.name)) {
          nextErrors.push(`Arquivo ${f.name} não suportado`);
        }
      });

      const nextFiles = files.filter((f) => {
        return checkIsExt(f.name);
      });

      setFiles(() => nextFiles);
      setErrors(() => nextErrors);

      onChange?.(nextFiles);

      setTimeout(() => {
        setErrors(() => []);
      }, 1000 * 5); // 5 seconds
    },
    [extensions]
  );

  return (
    <>
      <Col>
        <Row
          rounded={"lg"}
          h={20}
          border={"2px dashed transparent"}
          borderColor={errors.length > 0 ? "red.400" : "gray.600"}
          bg={"gray.700"}
          color={"gray.400"}
          cursor={"pointer"}
          userSelect={"none"}
          p={2}
          alignItems={"center"}
        >
          <Col
            flex={1}
            onClick={() => {
              inputRef.current?.click();
            }}
          >
            {files.length <= 0 && (
              <Text fontSize={"md"} fontWeight={"bold"}>
                {title}
              </Text>
            )}
            {files.length > 0 && (
              <Text fontSize={"md"} fontWeight={"bold"}>
                {files.map((f) => f.name)}
              </Text>
            )}
            <Text fontSize={"xs"}>Max. Arquivos: {maxFiles}</Text>
            {extensions.length > 0 && (
              <HStack spacing={2} mt={1}>
                {extensions.map((ext, keyExt) => (
                  <Badge fontSize={"xs"} key={`ext${keyExt}`}>
                    .{ext}
                  </Badge>
                ))}
              </HStack>
            )}
          </Col>
          {files.length > 0 && (
            <CloseButton
              onClick={() => {
                setFiles(() => []);
              }}
            />
          )}
          <Input
            type={"file"}
            display={"none"}
            ref={inputRef}
            accept={extensions.map((e) => `.${e}`).join(",")}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              onChangeFiles(Array.from(e.target.files || []));
              e.target.value = "";
            }}
            multiple={maxFiles > 1 ? true : false}
          />
        </Row>
        {errors.map((err, keyErr) => (
          <Row fontSize={"xs"} color={"red.500"} key={`err${keyErr}${err}`}>
            {err}
          </Row>
        ))}
      </Col>
    </>
  );
};

export default AppFilePicker;

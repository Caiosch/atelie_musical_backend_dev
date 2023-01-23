import { Col } from "@/components/shared";
import {
  Center,
  Circle,
  Heading,
  Img,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import React from "react";

interface HowWorkItemProps {
  title: string;
  description?: string[];
  listItems: string[];
  isDown?: boolean;
}

const HowWorkItem: React.FC<HowWorkItemProps> = ({
  title,
  listItems,
  description,
  isDown,
}) => {
  return (
    <Col alignItems={"center"} w={"100%"} mb={8}>
      <Col w={"100%"} color={"primary.100"} mb={4} px={4}>
        <Heading
          size={"sm"}
          fontSize={"md"}
          textAlign={"center"}
          textTransform={"uppercase"}
          mb={4}
        >
          {title}
        </Heading>
        <List>
          {listItems.map((item, keyItem) => (
            <ListItem
              alignItems={"center"}
              textAlign={"center"}
              key={`item${keyItem}`}
              display={"flex"}
              textTransform={"uppercase"}
              fontSize={"md"}
              fontWeight={"normal"}
            >
              <Center mx={"auto"}>
                <Circle mr={2} size={1} bg={"primary.50"} />
                {item}
              </Center>
            </ListItem>
          ))}
        </List>
        {description && (
          <>
            {description.map((d, keyD) => (
              <Text key={`desc${keyD}`} fontSize={"sm"}>
                {d}
              </Text>
            ))}
          </>
        )}
      </Col>
      <Img
        h={230}
        bg={"black"}
        objectFit={"cover"}
        w={"50%"}
        src={
          "https://images.unsplash.com/photo-1579191748614-4df6344b2ad7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        }
        {...{ [isDown ? "roundedBottom" : "roundedTop"]: "2000px" }}
      />
    </Col>
  );
};

export default HowWorkItem;

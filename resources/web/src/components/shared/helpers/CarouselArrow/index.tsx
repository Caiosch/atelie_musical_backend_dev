import { Col } from "@/components/shared";
import { IconButton } from "@chakra-ui/react";
import { RenderArrowProps } from "react-elastic-carousel";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const CarouselArrow = ({ isEdge, onClick, type }: RenderArrowProps) => {
  return (
    <Col
      pos={"absolute"}
      zIndex={100}
      left={type === "NEXT" ? undefined : 0}
      right={type === "NEXT" ? 0 : undefined}
      // bg={"white"}
      // h={"100%"}
      top={"50%"}
      transform={"translateY(-50%)"}
    >
      <IconButton
        aria-label="Trocar"
        isDisabled={isEdge}
        my={"auto"}
        onClick={onClick}
        position={"relative"}
        rounded={`xl`}
        bg={"primary.100"}
        color={"primary.600"}
        border={"2px solid transparent"}
        borderColor={"primary.500"}
        fontSize={"3xl"}
        mx={[2, null, null, 4, null, null]}
        _hover={{ bg: "primary.400", color: "primary.800" }}
        _active={{ bg: "primary.300", color: "primary.800" }}
      >
        {type === "NEXT" ? (
          <>
            <AiOutlineRight />
          </>
        ) : (
          <>
            <AiOutlineLeft />
          </>
        )}
      </IconButton>
    </Col>
  );
};

export default CarouselArrow;

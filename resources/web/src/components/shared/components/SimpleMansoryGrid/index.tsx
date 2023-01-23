import {
  SimpleGrid,
  SimpleGridProps,
  useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";
import Masonry from "react-masonry-css";
import { Col } from "../Col";

interface SimpleMansoryGridProps extends SimpleGridProps {
  columns?: number | number[];
  gap?: any;
}

export const SimpleMansoryGrid: React.NextFC<SimpleMansoryGridProps> = ({
  columns = 2,
  gap = 4,
  children,
  ...rest
}) => {
  const nextColumns = useBreakpointValue(
    typeof columns === "number" ? [columns || 1] : columns || [1]
  );

  return (
    <Col
      sx={{
        ".my-masonry-grid": {
          display: "flex",
          marginLeft: -gap,
          width: "auto",
        },
        ".my-masonry-grid_column": {
          paddingLeft: gap,
          backgroundClip: "padding-box",
        },
        ".my-masonry-grid_column > div": {
          marginBottom: gap,
        },
      }}
    >
      <SimpleGrid
        as={Masonry}
        breakpointCols={nextColumns}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
        {...rest}
      >
        {children}
      </SimpleGrid>
    </Col>
  );
};

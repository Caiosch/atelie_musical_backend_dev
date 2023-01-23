import CarouselArrow from "../../helpers/CarouselArrow";
import {
  SimpleGrid,
  SimpleGridProps,
  useBreakpointValue,
} from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import Carousel, { ReactElasticCarouselProps } from "react-elastic-carousel";
import { Col } from "../Col";
import { SimpleMansoryGrid } from "../SimpleMansoryGrid";

interface AppGridProps extends SimpleGridProps {
  type: "slide" | "grid" | "masonry";
  columns?: number | number[];
  outerSpacing?: number;
  children: React.ReactNode;
  _carousel?: Partial<ReactElasticCarouselProps>;
  onCarousel?: (carousel: Carousel) => void;
}

export const AppGrid: React.FC<AppGridProps> = ({
  columns,
  children,
  type,
  _carousel,
  onCarousel,
  ...rest
}) => {
  const nextColumns = useBreakpointValue(
    typeof columns === "number" ? [columns || 1] : columns || [1]
  );

  const carouselRef = useRef<Carousel>(null);
  const isEmitted = useRef(false);

  useEffect(() => {
    const checkRef = () => {
      if (!carouselRef.current) return;

      if (!isEmitted.current) {
        onCarousel?.(carouselRef.current);
      }
    };

    checkRef();
  }, []);

  if (type === "slide") {
    return (
      <>
        <Col {...rest}>
          {/* @ts-ignore */}
          <Carousel
            isRTL={false}
            itemsToShow={nextColumns}
            enableAutoPlay={false}
            autoPlaySpeed={5000}
            enableMouseSwipe={false}
            pagination={false}
            outerSpacing={rest.outerSpacing}
            itemPadding={[rest.gap, rest.gap, rest.gap, rest.gap]}
            renderArrow={CarouselArrow}
            ref={carouselRef}
            showArrows={false}
            onChange={_carousel?.onChange}
            {..._carousel}
          >
            {children}
          </Carousel>
        </Col>
      </>
    );
  }

  if (type === "grid") {
    return (
      <SimpleGrid columns={columns} {...rest}>
        {children}
      </SimpleGrid>
    );
  }

  if (type === "masonry") {
    return (
      <SimpleMansoryGrid columns={columns} {...rest}>
        {children}
      </SimpleMansoryGrid>
    );
  }

  return <></>;
};

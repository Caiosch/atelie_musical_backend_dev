import { Row } from "@/components/shared";
import { ListView } from "@/components/shared/helpers/ListView";
import { Center, Circle } from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import { BsPerson } from "react-icons/bs";

interface ScrollCheckpointNavigatorProps {
  items: Array<
    {
      icon: React.ReactNode;
    } & { queryElement: string }
  >;
}

const ScrollCheckpointNavigator: React.FC<ScrollCheckpointNavigatorProps> = ({
  items,
}) => {
  const [currentIndex, setIndex] = useState(0);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const orderedItems = useMemo(() => {
    const nextItems = items
      .map((i) => {
        const topDistance =
          (document.querySelector(i.queryElement)?.getBoundingClientRect()
            .top || 0) - 120;
        const offsetDistance =
          // @ts-ignore
          (document.querySelector(i.queryElement)?.offsetTop || 0) - 100;
        return {
          ...i,
          distance: offsetDistance,
          isActive: topDistance <= 0,
        };
      })
      .filter((a) => a.distance > 0)
      .sort((a, b) => a.distance - b.distance);

    return nextItems;
  }, [items, lastUpdate]);

  const scrollTo = (distance: number) => {
    window.scrollTo({
      top: distance,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const onScroll = () => {
      const distanceTop =
        window.pageYOffset ||
        (document.documentElement || document.body.parentNode || document.body)
          .scrollTop;

      let nextIndex = 0;
      for (const index in orderedItems) {
        const i = orderedItems[index];
        if (i.isActive) {
          nextIndex = Number(index);
        }
      }

      // console.log(
      //   JSON.stringify(
      //     {
      //       distanceTop,
      //       orderedItems: orderedItems.map((O) => ({ ...O, icon: undefined })),
      //     },
      //     null,
      //     2
      //   )
      // );
      setLastUpdate(() => distanceTop);
      setIndex(() => nextIndex);
    };

    const timer = setInterval(() => {
      onScroll();
      setLastUpdate(() => Date.now());
    }, 10);

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      clearInterval(timer);
    };
  }, [orderedItems]);

  return (
    <Row
      pos={"fixed"}
      bottom={0}
      left={0}
      w={"100%"}
      zIndex={100}
      justifyContent={"space-between"}
      alignItems={"center"}
      px={4}
      py={2}
    >
      <ListView
        items={orderedItems}
        render={(item, index) => (
          <Circle
            as={"span"}
            display={"inline-block"}
            size={index === currentIndex ? 14 : 10}
            bg={index === currentIndex ? "primary.50" : "primary.500"}
            // border={"4px solid transparent"}
            borderColor={index === currentIndex ? "primary.500" : "primary.50"}
            fontSize={index === currentIndex ? "2xl" : "lg"}
            color={index === currentIndex ? "primary.500" : "primary.50"}
            transition={"all .2s ease-in-out"}
            onClick={() => {
              scrollTo(item.distance);
            }}
          >
            <Center w={"100%"} h={"100%"}>
              {item.icon}
            </Center>
          </Circle>
        )}
      />
    </Row>
  );
};

export default ScrollCheckpointNavigator;

export function getInputTextProps(type: "inverted" | "normal" = "normal") {
  return {
    rounded: "1000px",
    variant: "outline",
    colorScheme: "primary",
    borderColor: type === "inverted" ? "black" : "lighten.200",
    focusBorderColor: "primary.400",
    color: type === "inverted" ? "primary.700" : "white",
    fontWeight: "bold",
    _placeholder: {
      color: type === "inverted" ? "black" : "primary.50",
      fontStyle: "italic",
      lineHeight: "180%",
      opacity: 0.5,
    },
  };
}

export function getAdminTextProps() {
  return {
    rounded: "3xl",
    borderWidth: 2,
    focusBorderColor: "primary.500",
    fontStyle: "italic",
  };
}

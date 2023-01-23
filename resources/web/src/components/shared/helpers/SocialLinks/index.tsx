import { HStack, Square, SquareProps, StackProps } from "@chakra-ui/react";
import React from "react";
import { BsInstagram, BsYoutube, BsLinkedin } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";

// import { Container } from './styles';

const SocialLinks: React.FC<
  StackProps & {
    size?: number;
    facebookLink?: string;
    instagramLink?: string;
    youtubeLink?: string;
    linkedinLink?: string;
  }
> = ({
  size = 26,
  facebookLink,
  instagramLink,
  youtubeLink,
  linkedinLink,
  ...rest
}) => {
  const BtnLink: React.FC<{ href: string } & SquareProps> = ({
    href,
    ...rest
  }) => {
    return (
      <Square
        as={"a"}
        target={"_blank"}
        size={10}
        href={href}
        {...rest}
      ></Square>
    );
  };

  return (
    <>
      <HStack
        spacing={2}
        alignItems={"center"}
        justifyContent={"center"}
        {...rest}
      >
        {facebookLink && (
          <BtnLink href={facebookLink} size={10}>
            <FaFacebook size={size} />
          </BtnLink>
        )}
        {instagramLink && (
          <BtnLink href={instagramLink} size={10}>
            <BsInstagram size={size} />
          </BtnLink>
        )}
        {youtubeLink && (
          <BtnLink href={youtubeLink} size={10}>
            <BsYoutube size={size * 1.3} />
          </BtnLink>
        )}
        {linkedinLink && (
          <BtnLink href={linkedinLink} size={10}>
            <BsLinkedin size={size} />
          </BtnLink>
        )}
      </HStack>
    </>
  );
};

export default SocialLinks;

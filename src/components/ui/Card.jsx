import React from "react";
import styled, { css } from "styled-components";
import { motion } from "framer-motion";

const CardContainer = styled(motion.div).withConfig({
  shouldForwardProp: (prop) =>
    ![
      "bgColor",
      "borderRadius",
      "elevation",
      "hoverable",
      "fullHeight",
    ].includes(prop),
})`
  background-color: ${({ bgColor, theme }) => bgColor || theme.colors.light};
  border-radius: ${({ borderRadius, theme }) =>
    borderRadius || theme.borderRadius.md};
  overflow: hidden;
  position: relative;
  box-shadow: ${({ elevation, theme }) => {
    switch (elevation) {
      case "small":
        return theme.shadows.sm;
      case "medium":
        return theme.shadows.md;
      case "large":
        return theme.shadows.lg;
      case "none":
        return "none";
      default:
        return theme.shadows.sm;
    }
  }};
  transition: ${({ theme }) => theme.transitions.default};
  height: ${({ fullHeight }) => (fullHeight ? "100%" : "auto")};
  display: flex;
  flex-direction: column;

  ${({ hoverable }) =>
    hoverable &&
    css`
      cursor: pointer;
      &:hover {
        transform: translateY(-5px);
        box-shadow: ${({ theme }) => theme.shadows.lg};
      }
    `}
`;

const CardImage = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !["image", "imageHeight", "imageOverlay"].includes(prop),
})`
  position: relative;
  height: ${({ imageHeight }) => imageHeight || "200px"};
  background-image: url(${({ image }) => image});
  background-size: cover;
  background-position: center;

  ${({ imageOverlay, theme }) =>
    imageOverlay &&
    css`
      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0.1) 0%,
          rgba(0, 0, 0, 0.5) 100%
        );
      }
    `}
`;

const CardBody = styled.div.withConfig({
  shouldForwardProp: (prop) => !["padding", "fullHeight"].includes(prop),
})`
  padding: ${({ padding, theme }) => padding || theme.space.lg};
  flex-grow: ${({ fullHeight }) => (fullHeight ? "1" : "0")};
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.h3`
  margin-top: 0;
  margin-bottom: ${({ theme }) => theme.space.sm};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const CardSubtitle = styled.h4`
  margin-bottom: ${({ theme }) => theme.space.md};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const CardText = styled.p`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSizes.md};
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const CardFooter = styled.div`
  padding: ${({ theme }) => `${theme.space.md} ${theme.space.lg}`};
  border-top: 1px solid ${({ theme }) => theme.colors.gray};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
  hover: {
    y: -5,
    transition: {
      duration: 0.2,
    },
  },
};

const Card = ({
  children,
  title,
  subtitle,
  text,
  image,
  imageHeight,
  imageOverlay = false,
  footer,
  elevation = "small",
  bgColor,
  borderRadius,
  hoverable = false,
  fullHeight = false,
  padding,
  ...props
}) => {
  return (
    <CardContainer
      bgColor={bgColor}
      borderRadius={borderRadius}
      elevation={elevation}
      hoverable={hoverable}
      fullHeight={fullHeight}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={hoverable ? "hover" : undefined}
      {...props}
    >
      {image && (
        <CardImage
          image={image}
          imageHeight={imageHeight}
          imageOverlay={imageOverlay}
        />
      )}

      <CardBody padding={padding} fullHeight={fullHeight}>
        {title && <CardTitle>{title}</CardTitle>}
        {subtitle && <CardSubtitle>{subtitle}</CardSubtitle>}
        {text && <CardText>{text}</CardText>}
        {children}
      </CardBody>

      {footer && <CardFooter>{footer}</CardFooter>}
    </CardContainer>
  );
};

export default Card;

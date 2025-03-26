import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const TitleContainer = styled(motion.div)`
  margin-bottom: 1.5rem;
  position: relative;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.darkAccent};
  margin: 0 0 0.5rem 0;
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1.75rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1.5rem;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -0.5rem;
    left: 0;
    width: 60px;
    height: 4px;
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 2px;
  }
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 1rem 0 0 0;
  max-width: 800px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1rem;
  }
`;

export const SectionTitle = ({
  children,
  subtitle,
  centered = false,
  ...props
}) => {
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const subtitleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, delay: 0.2 },
    },
  };

  return (
    <TitleContainer
      {...props}
      style={{ textAlign: centered ? "center" : "left" }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <Title
        as={motion.h2}
        variants={titleVariants}
        style={{
          "&::after": {
            left: centered ? "50%" : "0",
            transform: centered ? "translateX(-50%)" : "none",
          },
        }}
      >
        {children}
      </Title>

      {subtitle && (
        <Subtitle as={motion.p} variants={subtitleVariants}>
          {subtitle}
        </Subtitle>
      )}
    </TitleContainer>
  );
};

export default SectionTitle;

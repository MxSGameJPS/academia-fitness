import React from "react";
import styled from "styled-components";

const SectionContainer = styled.section.withConfig({
  shouldForwardProp: (prop) =>
    !["bgColor", "padding", "mobilePadding"].includes(prop),
})`
  padding: ${({ padding }) => padding || "4rem 2rem"};
  background-color: ${({ bgColor, theme }) =>
    typeof bgColor === "function"
      ? bgColor(theme)
      : bgColor || theme.colors.background};
  position: relative;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ mobilePadding }) => mobilePadding || "3rem 1rem"};
  }
`;

const SectionContent = styled.div.withConfig({
  shouldForwardProp: (prop) => !["fullWidth"].includes(prop),
})`
  max-width: ${({ fullWidth }) => (fullWidth ? "100%" : "1200px")};
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const BackgroundOverlay = styled.div.withConfig({
  shouldForwardProp: (prop) => !["overlayColor"].includes(prop),
})`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ overlayColor }) => overlayColor || "transparent"};
  z-index: 1;
`;

const Section = ({
  children,
  bgColor,
  padding,
  mobilePadding,
  fullWidth = false,
  id,
  className,
  overlayColor,
}) => {
  return (
    <SectionContainer
      bgColor={bgColor}
      padding={padding}
      mobilePadding={mobilePadding}
      id={id}
      className={className}
    >
      {overlayColor && <BackgroundOverlay overlayColor={overlayColor} />}
      <SectionContent fullWidth={fullWidth}>{children}</SectionContent>
    </SectionContainer>
  );
};

export { Section };
export default Section;

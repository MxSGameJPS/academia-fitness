import React from "react";
import styled, { css } from "styled-components";

const getColumnsTemplate = (columns) => {
  if (typeof columns === "number" || !isNaN(parseInt(columns))) {
    return `repeat(${columns}, 1fr)`;
  }
  return columns;
};

const GridContainer = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    ![
      "columns",
      "gap",
      "autoFit",
      "minWidth",
      "columnsSm",
      "columnsMd",
      "columnsLg",
      "responsive",
    ].includes(prop),
})`
  display: grid;
  grid-template-columns: ${({ columns }) => getColumnsTemplate(columns)};
  gap: ${({ gap, theme }) => gap || theme.space.md};
  width: 100%;

  ${({ autoFit, minWidth }) =>
    autoFit &&
    css`
      grid-template-columns: repeat(
        auto-fit,
        minmax(${minWidth || "280px"}, 1fr)
      );
    `}

  ${({ responsive, theme }) =>
    responsive &&
    responsive.map(
      ({ breakpoint, columns }) => `
      @media (max-width: ${theme.breakpoints[breakpoint]}) {
        grid-template-columns: ${getColumnsTemplate(columns)};
      }
    `
    )}

  ${({ columnsSm, theme }) =>
    columnsSm &&
    css`
      @media (max-width: ${theme.breakpoints.sm}) {
        grid-template-columns: repeat(${columnsSm}, 1fr);
      }
    `}

  ${({ columnsMd, theme }) =>
    columnsMd &&
    css`
      @media (max-width: ${theme.breakpoints.md}) {
        grid-template-columns: repeat(${columnsMd}, 1fr);
      }
    `}

  ${({ columnsLg, theme }) =>
    columnsLg &&
    css`
      @media (max-width: ${theme.breakpoints.lg}) {
        grid-template-columns: repeat(${columnsLg}, 1fr);
      }
    `}

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const GridItem = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !["span", "spanLg", "spanMd", "spanSm", "spanXs"].includes(prop),
})`
  grid-column: span ${({ span }) => span || 1};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-column: span ${({ spanLg, span }) => spanLg || span || 1};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-column: span
      ${({ spanMd, spanLg, span }) => spanMd || spanLg || span || 1};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-column: span
      ${({ spanSm, spanMd, spanLg, span }) =>
        spanSm || spanMd || spanLg || span || 1};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    grid-column: span 1;
  }
`;

const Grid = ({
  children,
  columns = 3,
  gap,
  autoFit = false,
  minWidth,
  columnsSm,
  columnsMd,
  columnsLg,
  responsive,
  className,
  as,
  ...rest
}) => {
  return (
    <GridContainer
      columns={columns}
      gap={gap}
      autoFit={autoFit}
      minWidth={minWidth}
      columnsSm={columnsSm}
      columnsMd={columnsMd}
      columnsLg={columnsLg}
      responsive={responsive}
      className={className}
      as={as}
      {...rest}
    >
      {children}
    </GridContainer>
  );
};

Grid.Item = GridItem;

export default Grid;

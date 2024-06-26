import React from "react";
import styled from "styled-components";

const SectionContainer = styled.div`
  max-width: 1200px;
  margin: auto;
`;

const Section_solution = ({ children, className }) => {
  return <SectionContainer className={className}>{children}</SectionContainer>;
};

export default Section_solution;

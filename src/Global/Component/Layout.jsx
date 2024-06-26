


import React from "react";
import styled from "styled-components";

const LayoutContainer = styled.div`
  padding: 80px 20px; /* Updated padding */
  background-color: #E2EBF0;
  
  @media (max-width: 768px) {
    padding: 60px 20px; /* Adjusted padding for smaller devices */
  }

  @media (max-width: 576px) {
    padding: 40px 20px; /* Further adjusted padding for even smaller devices */
  }
`;

const Layout = ({ children, className }) => {
  return <LayoutContainer className={className}>{children}</LayoutContainer>;
};

export default Layout;

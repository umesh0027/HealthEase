


import React from 'react';
import styled from "styled-components";

import Layout from "../../Global/Component/Layout";
import Section_solution from "../../Global/Component/Section_solution";
import data from "../../data/StepSolution";

const Title = styled.div`
  text-align: center;
  text-transform: uppercase;
  color: #291100;
  font-weight: 600;
  font-size: 40px;
  margin-bottom: 10px;
`;

const SuperTitle = styled.div`
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.085em;
  font-size: 18px;
  color: #CFA64F;
  font-weight: 600;
  margin-bottom: 40px;
`;

const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
`;

const GridItem = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 32px;
  box-sizing: border-box;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateY(-15px);
     background-color: #0A5A72;
  }
`;

const GridTop = styled.div`
  margin-bottom: 16px;
`;

const GridTitle = styled.div`
  font-size: 22px;
  font-weight: 500;
  color: black;
`;

const GridBottom = styled.div`
  font-size: 18px;
  color: grey;
`;

const GridImageContainer = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

`;

const SolutionsSteps = () => {
  return (
    <Layout>
      <Section_solution>
        <Title>Fastest Solution</Title>
        <SuperTitle>4 easy steps to get your solution</SuperTitle>
        <StepsGrid>
          {data.map((item) => (
            <GridItem key={item.id}>
              <GridTop>
                <GridImageContainer>
                  <img src={item.imageUrl} alt={item.title} width={60} height={60} />
                </GridImageContainer>
                <GridTitle>{item.title}</GridTitle>
              </GridTop>
              <GridBottom>{item.description}</GridBottom>
            </GridItem>
          ))}
        </StepsGrid>
      </Section_solution>
    </Layout>
  )
}

export default SolutionsSteps;

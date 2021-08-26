import styled from "styled-components";
import { Align, Justify } from "../types";

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const FlexCol = styled.div<{ justify?: Justify; align?: Align }>`
  display: flex;
  justify-content: ${({ justify }) =>
    justify ? justify : "space-between"}; //flex-start
  align-items: ${({ align }) => (align ? align : "flex-start")}; //center
  flex-direction: column;
  align-items: center;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  width: 100%;
  /* margin-bottom: 20px; */
  font-weight: 500;
  font-size: 0.875rem;
  /* &:not(:last-child) {
    @media (min-width: 768px) {
      margin-right: 1.25rem;
    }
  } */
  a {
    text-decoration: underline;
  }
`;

const AppContainer = styled(FlexCol)`
  padding: 30% 15% 10%;
`;

export { AppContainer, FlexRow, FlexCol, Label };

import styled from 'styled-components/native';

export const Container = styled.View`
  flex:1;
`;

export const InputSlot = styled.View`
  background-color: ${({theme}) => theme.colors.background.medium};
  flex-direction:row;
  justify-content:space-between;
  align-items:center;
  padding: 10px 20px;
`;

export const ResultSlot = styled.View`
  flex:1;
  padding: 20px;
`;



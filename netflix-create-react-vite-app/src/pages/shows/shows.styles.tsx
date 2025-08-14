import  styled  from 'styled-components';

export const StyledContainer = styled.div`
  margin-top: ${(props) => props.theme.space[10]};
  gap: ${({ theme }) => theme.space[9]};
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

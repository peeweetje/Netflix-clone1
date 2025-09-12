import styled from 'styled-components';

export const EmptyStateContainer = styled.div<{ className?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  ${({ className }) => className && className}
`;

export const EmptyStateContent = styled.div`
  text-align: center;
`;

export const EmptyStateTitle = styled.h2`
  font-size: ${(props) => props.theme.fontSize[5]};
  font-weight: 600;
  margin-bottom: ${(props) => props.theme.space[4]};
  color: ${(props) => props.theme.colors.white};
`;

export const EmptyStateMessage = styled.p`
  color: ${(props) => props.theme.colors.white};
`;

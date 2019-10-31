import styled from 'styled-components'

export const Cell = styled.div<{ activated?: boolean }>`
  flex: 1;
  display: block;
  min-height: 80px;
  border-bottom: 1px solid #eeeeee;
  border-right: 1px solid #eeeeee;
  &:first-child {
    border-left: 1px solid #eeeeee;
  }
  > h2 {
    font-size: 1rem;
    font-weight: normal;
    ${({ activated = false }) => activated && `
      color: blue;
      font-weight: bolder;
    `}
  }
`
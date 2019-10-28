import React from 'react'
import styled from 'styled-components'

interface HeaderCellProps {
  className?: string;
  children: React.ReactNode;
}

const HeaderCell = styled(({
  className,
  children
}: HeaderCellProps) => {
  return (
    <div className={className}>
      <h2>
        {children}
      </h2>
    </div>
  )
})`
  flex: 1;
  text-align: center;
  border-right: 1px solid #eeeeee;
  border-bottom: 1px solid #eeeeee;
  border-top: 1px solid #eeeeee;
  &:first-child {
    border-left: 1px solid #eeeeee;
  }
  box-sizing: border-box;
  > h2 {
    font-weight: normal;
    font-size: .9rem;
  }
`

export default HeaderCell

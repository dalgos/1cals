import styled from 'styled-components'

import EventCell from 'components/EventCell'

export const Grid = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  text-align: center;
`

export const RowGroup = styled.div`
  display: flex;
  flex-flow: row;
  position: relative;
`

export const Row = styled.div`
  flex: 1;
  display: flex;
  flex-flow: row;
`

export const MonthlyEventCell = styled(EventCell)<{ left?: number; }>`
  display: block;
  left: ${({left = 0}) => left};
  height: 1rem;
  flex: 1;
  font-size: .8rem;
  background-color: lightcoral;
  color: white;
  text-align: left;
  padding: 0 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
`

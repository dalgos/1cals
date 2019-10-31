import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import MonthlyView from 'containers/MonthlyView'
import WeeklyView from 'containers/WeeklyView'

const Wrapper = styled.div`
  flex: 1;
`

export default function Calendar() {
  const mode = useSelector((state: CalState) => state.display.mode)

  return (
    <Wrapper>
      {mode === 'monthly' ?
        <MonthlyView />
        : <WeeklyView />
      }
    </Wrapper>
  );
}
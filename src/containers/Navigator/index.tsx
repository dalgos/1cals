import React, { useEffect, useState } from 'react'
import { Container, Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { format, getWeekOfMonth } from 'date-fns'

import NavButton, { DIRECTION } from '../../components/NavButton'
import DisplayModeSelects from 'components/DisplayModeSelects'
import { navigatorStateSelector } from 'selectors'
import { takeChangeDisplayMode } from 'ducks/display'
import { takeMovePeriod, takeResetPeriod } from 'ducks/dateInfo'

export default function Navigator() {
  const { currentDate, mode } = useSelector(navigatorStateSelector)
  const { 0: title, 1: setTitle } = useState('')

  const dispatch = useDispatch()
  const handleDisplayModeChange = (evt: any) => {
    dispatch(takeChangeDisplayMode(evt.target.value))
  }
  /**
   * 좌우 내비게이션 버튼 클릭 핸들러 생성자
   * @param {'next' | 'prev'} direction 다음 또는 이전
   */
  const handleNavClick = (direction: 'next' | 'prev') => () => {
    dispatch(takeMovePeriod(mode, direction))
  }
  /**
   * 타이틀 클릭 이벤트 핸들러
   */
  const handleTitleClick = () => dispatch(takeResetPeriod())

  useEffect(() => {
    setTitle(
      format(
        currentDate,
        mode === 'monthly' ?
          'yyyy년 MM월'
          : `MM월 ${getWeekOfMonth(currentDate)}주`
      )
    )
  }, [currentDate, mode, setTitle])

  return (
    <Container>
      <DisplayModeSelects
        onChange={handleDisplayModeChange}
        value={mode}
        values={[
          { text: '월별', value: 'monthly' },
          { text: '주별', value: 'weekly' },
        ]}
      />
      <NavButton
        onClick={handleNavClick('prev')}
      />
      <Button
        onClick={handleTitleClick}
      >
        {title}
      </Button>
      <NavButton
        direction={DIRECTION.RIGHT}
        onClick={handleNavClick('next')}
      />
    </Container>
  );
}
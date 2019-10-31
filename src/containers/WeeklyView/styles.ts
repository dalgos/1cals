import styled from 'styled-components'

import EventCell from 'components/EventCell'

export const Container = styled.div`
  display: flex;
`

export const Headers = styled.div`
  display: flex;
`

export const Header = styled.div`
  min-width: 80px;
  flex: 1 0 auto;
  text-align: center;
`

export const HeadersWrapper = styled.div`
  overflow: hidden;
  flex: 1;
`

export const Gap = styled.div`
  width: 60px;
`

export const PlansContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
`

export const Timeline = styled.div`
  width: 60px;
  > div {
    height: 40px;
    > span {
      position: relative;
      display: block;
      font-size: 11px;
      top: -6px;
    }
    &:first-child {
      > span {
        display: none;
      }
    }
  }
`

export const PlansWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  position: relative;
`

export const Underlines = styled.div`
  display: block;
  > div {
    width: 0;
    height: 40px;
    &:after {
      border-bottom: 1px solid #eeeeee;
      content: "";
      margin-top: -1;
      width: 100%;
      position: absolute;
    }
  }
`

export const PlansColumn = styled.div`
  flex: 1;
  border-right: 1px solid #eeeeee;
  box-sizing: border-box;
  position: relative;
`

export const Panel = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
`

export const Presentaion = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`

export const WeeklyEventCell = styled(EventCell)<{ base?: number; size?: number; }>`
  position: absolute;
  height: ${({ size = 1 }) => size * 40}px;
  overflow: hidden;
  padding: .2rem;
  background-color: skyblue;
  width: 100%;
  box-sizing: border-box;
  top: ${({ base = 0 }) => 40 * base}px;
`
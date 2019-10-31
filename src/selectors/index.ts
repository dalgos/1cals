import { createSelector } from 'reselect'

export const dateInfoSelector = (state: CalState) => state.dateInfo

export const displaySelector = (state: CalState) => state.display

export const eventFormSelector = (state: CalState) => state.eventForm

export const eventsSelector = (state: CalState) => state.events

/**
 * 내비게이션에서 사용하는 state 선택자
 */
export const navigatorStateSelector = createSelector(
  dateInfoSelector,
  displaySelector,
  ({ currentDate }, { mode }) => ({
    currentDate,
    mode,
  })
)

import { addWeeks, addMonths } from 'date-fns'

interface TakeMovePeriodAction {
  (mode: Display['mode'], direction: 'next' | 'prev'): {
    payload: {
      mode: Display["mode"];
      direction: 'next' | 'prev';
    },
    type: 'MOVE_PERIOD',
  }
}

/**
 * mode를 기준으로 다음 표시 기간으로 이동하는 액션
 * mode === 'monthly' 다음달
 * @param mode 
 */
export const takeMovePeriod: TakeMovePeriodAction = (mode, direction) => ({
  payload: {
    mode,
    direction,
  },
  type: 'MOVE_PERIOD',
})

interface TakeResetPeriodAction {
  (): {
    type: 'RESET_PERIOD',
  }
}
/**
 * 표시 날짜 기준을 현재 기준으로 초기화
 */
export const takeResetPeriod: TakeResetPeriodAction = () => ({
  type: 'RESET_PERIOD',
})

type EnhancedAction =
  ReturnType<TakeMovePeriodAction> |
  ReturnType<TakeResetPeriodAction>

export default function dateInfoReducer(
  state: DateInfo = {
    currentDate: new Date(),
  },
  action: EnhancedAction
): DateInfo {
  switch (action.type) {
    case 'MOVE_PERIOD':
      const { mode, direction } = action.payload;
      const amount = direction === 'next' ? 1 : -1;
      const nextDate = mode === 'monthly' ?
        addMonths(state.currentDate, amount)
        : addWeeks(state.currentDate, amount)
      return {
        ...state,
        currentDate: nextDate,
      }
    case 'RESET_PERIOD':
      return {
        ...state,
        currentDate: new Date(),
      }
    default:
      return state;
  }
}
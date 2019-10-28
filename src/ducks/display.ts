import { Action } from 'redux'

interface ChangeDisplayAction {
  payload: Display['mode'];
  type: 'CHANGE_DISPLAY_MODE';
}

/**
 * 일정표의 표시 모드를 변경하는 액션 생성자
 * @param {Display['mode']} nextMode 변경할 표시 모드
 */
export const takeChangeDisplayMode = (nextMode: Display['mode']): ChangeDisplayAction => ({
  payload: nextMode,
  type: 'CHANGE_DISPLAY_MODE',
})

type EnhancedAction = ChangeDisplayAction

export default function displayReducer(
  state: Display = {
    mode: 'monthly',
    weekIndex: 1,
  },
  action: EnhancedAction) {
  switch (action.type) {
    case 'CHANGE_DISPLAY_MODE':
      return {
        ...state,
        mode: action.payload,
      }
    default:
      return state
  }
}
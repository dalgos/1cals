export enum ActionTypes {
  OPEN_EVENT_FORM = 'OPEN_EVENT_FORM',
  CLOSE_EVENT_FORM = 'CLOSE_EVENT_FORM',
  SUBMIT_EVENT_FORM_REQUEST = 'SUBMIT_EVENT_FORM_REQUEST',
  SUBMIT_EVENT_FORM_SUCCESS = 'SUBMIT_EVENT_FORM_SUCCESS',
  SUBMIT_EVENT_FORM_FAILURE = 'SUBMIT_EVENT_FORM_FAILURE',
}

interface TakeOpenEventForm {
  (payload: {
    startDate: Date,
    endDate: Date,
    mode: 'create' | 'edit',
  }): {
    payload: {
      startDate: Date,
      endDate: Date,
      mode: 'create' | 'edit',
    },
    type: ActionTypes.OPEN_EVENT_FORM,
  }
}

/**
 * 이벤트 Form Open 액션 생성자
 * @param payload 
 */
export const takeOpenEventForm: TakeOpenEventForm = (payload) => ({
  payload,
  type: ActionTypes.OPEN_EVENT_FORM,
})

interface TakeCloseEventForm {
  (): { type: ActionTypes.CLOSE_EVENT_FORM }
}

/**
 * 이벤트 Form Close 액션 생성자
 */
export const takeCloseEventForm: TakeCloseEventForm = () => ({
  type: ActionTypes.CLOSE_EVENT_FORM,
})

export const takeSubmitEventForm = (payload: { startTime: number; endTime: number; title: string }) => ({
  payload,
  type: ActionTypes.SUBMIT_EVENT_FORM_REQUEST,
})

type EnhancedAction = ReturnType<TakeOpenEventForm> | ReturnType<TakeCloseEventForm>;

const initialState: EventForm = {
  open: false,
  startDate: new Date(),
  endDate: new Date(),
  mode: 'create',
}

export default function reducer(
  state: EventForm = initialState,
  action: EnhancedAction
): EventForm {
  switch (action.type) {
    case ActionTypes.OPEN_EVENT_FORM:
      console.log(action.payload.startDate)
      return {
        ...state,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
        mode: action.payload.mode,
        open: true,
      };
    case ActionTypes.CLOSE_EVENT_FORM:
      return {
        ...state,
        open: false,
      }
    default:
      return state;
  }
}
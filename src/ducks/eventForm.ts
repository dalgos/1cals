export enum ActionTypes {
  OPEN_EVENT_FORM = 'OPEN_EVENT_FORM',
  CLOSE_EVENT_FORM = 'CLOSE_EVENT_FORM',
  SUBMIT_EVENT_FORM_REQUEST = 'SUBMIT_EVENT_FORM_REQUEST',
  SUBMIT_EVENT_FORM_SUCCESS = 'SUBMIT_EVENT_FORM_SUCCESS',
  SUBMIT_EVENT_FORM_FAILURE = 'SUBMIT_EVENT_FORM_FAILURE',
  DELETE_EVENT_REQUEST = 'DELETE_EVENT_REQUEST',
  DELETE_EVENT_SUCCESS = 'DELETE_EVENT_SUCCESS',
  DELETE_EVENT_FAILURE = 'DELETE_EVENT_FAILURE',
}

interface TakeOpenEventForm {
  (payload: {
    startDate: Date,
    endDate: Date,
    title?: string,
    mode: 'create' | 'edit',
    id?: number,
  }): {
    payload: {
      startDate: Date,
      endDate: Date,
      mode: 'create' | 'edit',
      title?: string,
      id?: number,
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

export const takeSubmitEvent = (payload: { startTime: number; endTime: number; title: string; id: number; }) => ({
  payload,
  type: ActionTypes.SUBMIT_EVENT_FORM_REQUEST,
})

export const takeDeleteEvent = (payload: string) => ({
  payload,
  type: ActionTypes.DELETE_EVENT_REQUEST,
})

type EnhancedAction = ReturnType<TakeOpenEventForm> | ReturnType<TakeCloseEventForm>;

const initialState: EventForm = {
  open: false,
  startDate: new Date(),
  endDate: new Date(),
  mode: 'create',
  title: '',
  id: -1,
}

export default function reducer(
  state: EventForm = initialState,
  action: EnhancedAction
): EventForm {
  switch (action.type) {
    case ActionTypes.OPEN_EVENT_FORM:
      return {
        ...state,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
        mode: action.payload.mode,
        open: true,
        title: action.payload.title || '',
        id: action.payload.id || -1,
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
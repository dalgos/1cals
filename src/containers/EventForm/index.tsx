import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTime } from 'date-fns'

import EventFormDialog, { SubmitParams } from 'components/EventFormDialog'
import { eventFormSelector } from 'selectors'
import { takeCloseEventForm, takeSubmitEvent, takeDeleteEvent } from 'ducks/eventForm'

const EventForm = () => {
  const dispatch = useDispatch()
  const {
    open,
    startDate,
    endDate,
    mode,
    title,
    id,
  } = useSelector(eventFormSelector)
  /**
   * EventFormDialog close 이벤트 핸들러
   */
  const handleClose = () => dispatch(takeCloseEventForm())
  const handleSubmit = ({ startDate, endDate, title, id }: SubmitParams) => {
    dispatch(takeSubmitEvent({
      startTime: getTime(startDate),
      endTime: getTime(endDate),
      title,
      id,
    }))
  }
  const handleDelete = () => dispatch(takeDeleteEvent(id.toString()))
  return (
    <EventFormDialog
      id={id}
      open={open}
      onClose={handleClose}
      startDate={startDate}
      endDate={endDate}
      mode={mode}
      onSubmit={handleSubmit}
      title={title}
      onDelete={handleDelete}
    />
  );
}

export default EventForm

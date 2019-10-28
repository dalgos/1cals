import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import EventFormDialog from 'components/EventFormDialog'
import { eventFormSelector } from 'selectors'
import { takeCloseEventForm } from 'ducks/eventForm'

const EventForm = () => {
  const dispatch = useDispatch()
  const {
    open,
    startDate,
    endDate,
    mode,
  } = useSelector(eventFormSelector)
  /**
   * EventFormDialog close 이벤트 핸들러
   */
  const handleClose = () => dispatch(takeCloseEventForm())
  return (
    <EventFormDialog
      open={open}
      onClose={handleClose}
      startDate={startDate}
      endDate={endDate}
      mode={mode}
    />
  );
}

export default EventForm

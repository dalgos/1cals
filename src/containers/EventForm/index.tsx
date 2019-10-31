import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTime } from 'date-fns'

import EventFormDialog from 'components/EventFormDialog'
import { eventFormSelector } from 'selectors'
import { takeCloseEventForm, takeSubmitEventForm } from 'ducks/eventForm'

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
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const date = formData.get('date')
    const time = formData.get('time')
    const duration = formData.get('duration')

    const title = formData.get('title') as string
    const startTime = getTime(new Date(`${date} ${time}`))
    const endTime = startTime + (parseInt(duration as string) * 1000 * 60 * 60)

    dispatch(takeSubmitEventForm({
      startTime,
      endTime,
      title,
    }))
  }
  return (
    <EventFormDialog
      open={open}
      onClose={handleClose}
      startDate={startDate}
      endDate={endDate}
      mode={mode}
      onSubmit={handleSubmit}
    />
  );
}

export default EventForm

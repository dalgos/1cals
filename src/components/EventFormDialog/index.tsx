import React, { useEffect, useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Select,
  MenuItem,
  TextField,
} from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  MaterialUiPickersDate,
} from '@material-ui/pickers'
import { format } from 'date-fns'

import DurationSelects from 'components/DurationSelects'

interface Props {
  open?: boolean;
  onClose?: () => void;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  startDate: Date;
  endDate: Date;
  mode: 'create' | 'edit';
}

/**
 * 일정 추가를 위한 Form을 포함하고 있는 Dialog Component
 * @param {Props} props
 */
export default function EventFormDialog({
  open = true,
  onClose,
  startDate,
  endDate,
  mode,
}: Props): JSX.Element {
  const { 0: selectedDate, 1: setSelectedDate } = useState(startDate)
  const { 0: time, 1: setTime } = useState(format(new Date(), 'hh:mm'))
  const handleDatePickerChange = (date: MaterialUiPickersDate) => {
    setSelectedDate(date as Date)
  }

  useEffect(() => {
    setSelectedDate(startDate)
    setTime(format(
      mode === 'create' ?
        new Date()
        : startDate,
      'hh:mm'
    ))
  }, [startDate, mode])
  return (
    <Dialog open={open}>
      <DialogTitle>일정 등록</DialogTitle>
      <DialogContent>
        <DialogContentText>
          일정의 등록, 변경, 삭제가 가능합니다.
        </DialogContentText>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <KeyboardDatePicker
                  id="date"
                  label="날짜"
                  onChange={handleDatePickerChange}
                  value={selectedDate}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="startTime"
                  label="시간"
                  defaultValue={format(startDate, 'hh:mm')}
                />
              </Grid>
              <Grid item xs={3}>
                <DurationSelects />
              </Grid>
            </Grid>
          </form>
        </MuiPickersUtilsProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>취소</Button>
        <Button>추가</Button>
      </DialogActions>
    </Dialog>
  )
}
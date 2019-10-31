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
import { makeStyles } from '@material-ui/core/styles'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  MaterialUiPickersDate,
} from '@material-ui/pickers'
import { format } from 'date-fns'

import DurationSelects from 'components/DurationSelects'

const useStyles = makeStyles(() => ({
  textField: {
    width: '100%',
  }
}))

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
  onSubmit,
}: Props): JSX.Element {
  const { 0: selectedDate, 1: setSelectedDate } = useState(startDate)
  const { 0: time, 1: setTime } = useState(format(new Date(), 'hh:mm'))
  const classes = useStyles()

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
      <form onSubmit={onSubmit}>
        <DialogContent>
          <DialogContentText>
            일정의 등록, 변경, 삭제가 가능합니다.
          </DialogContentText>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <KeyboardDatePicker
                    id="date"
                    name="date"
                    label="날짜"
                    onChange={handleDatePickerChange}
                    value={selectedDate}
                    format="yyyy/MM/dd"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="time"
                    name="time"
                    label="시간"
                    type="time"
                    defaultValue={format(startDate, 'hh:mm')}
                    className={classes.textField}
                  />
                </Grid>
                <Grid item xs={3}>
                  <DurationSelects />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="title"
                    name="title"
                    label="일정 제목"
                    margin="normal"
                    className={classes.textField}
                    required
                  />
                </Grid>
              </Grid>
          </MuiPickersUtilsProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>취소</Button>
          {mode === 'edit' && <Button>삭제</Button>}
          <Button type="submit">추가</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
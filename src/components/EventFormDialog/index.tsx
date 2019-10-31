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
import { format, differenceInHours } from 'date-fns'

import DurationSelects, { SelectChangeEventHandler } from 'components/DurationSelects'

const useStyles = makeStyles(() => ({
  textField: {
    width: '100%',
  }
}))

interface Props {
  open?: boolean;
  onClose?: () => void;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  onDelete?: () => {};
  startDate: Date;
  endDate: Date;
  mode: 'create' | 'edit';
  title: string;
  id: number;
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
  onDelete,
  title,
  id,
}: Props): JSX.Element {
  const { 0: formState, 1: setFormState } = useState({
    date: startDate,
    time: format(new Date(), 'hh:mm'),
    duration: '1',
    title,
    id,
  })
  // Form의 편집 모드 boolean
  const isEditMode = mode === 'edit'
  const classes = useStyles()

  const handleDatePickerChange = (date: MaterialUiPickersDate) => {
    // setSelectedDate(date as Date)
    setFormState((prevState) => ({
      ...prevState,
      date: date as Date,
    }))
  }

  const handleTitleChange: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
    const title = evt.currentTarget.value
    setFormState((prevState) => ({
      ...prevState,
      title,
    }))
  }

  const handleTimeChange: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
    const time = evt.currentTarget.value
    setFormState((prevState) => ({
      ...prevState,
      time,
    }))
  }

  const handleDurationChange: SelectChangeEventHandler = (event) => {
    setFormState((prevState) => ({
      ...prevState,
      duration: event.target.value as string,
    }))
  }

  const handleDeleteClick = () => {
    onDelete && onDelete()
  }

  useEffect(() => {
    setFormState((prevState) => ({
      ...prevState,
      date: startDate as Date,
      time: format(
        startDate,
        'HH:mm'
      ),
      title,
      duration: `${differenceInHours(endDate, startDate)}`,
      id,
    }))
  }, [startDate, mode, title, endDate, id])

  return (
    <Dialog open={open}>
      <DialogTitle>일정 등록</DialogTitle>
      <form onSubmit={onSubmit}>
        <input type="hidden" name="id" value={formState.id} />
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
                    value={formState.date}
                    format="yyyy/MM/dd"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="time"
                    name="time"
                    label="시간"
                    type="time"
                    value={formState.time}
                    onChange={handleTimeChange}
                    className={classes.textField}
                  />
                </Grid>
                <Grid item xs={3}>
                  <DurationSelects
                    onChange={handleDurationChange}
                    value={formState.duration}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="title"
                    name="title"
                    label="일정 제목"
                    margin="normal"
                    className={classes.textField}
                    value={formState.title}
                    onChange={handleTitleChange}
                    required
                  />
                </Grid>
              </Grid>
          </MuiPickersUtilsProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>취소</Button>
          {isEditMode &&
            <Button
              onClick={handleDeleteClick}
            >삭제</Button>
          }
          <Button type="submit">{isEditMode ? '수정' : '추가'}</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
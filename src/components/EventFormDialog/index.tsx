import React, { useEffect, useState, ReactHTML } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  MaterialUiPickersDate,
} from '@material-ui/pickers'
import { format, differenceInHours, set, getYear, getMonth, getDay } from 'date-fns'

import DurationSelects, { SelectChangeEventHandler } from 'components/DurationSelects'
import { setHours, setMinutes } from 'date-fns/esm'

const useStyles = makeStyles(() => ({
  textField: {
    width: '100%',
  }
}))

export interface SubmitParams {
  startDate: Date;
  endDate: Date;
  title: string;
  id: number;
}

interface Props {
  open?: boolean;
  onClose?: () => void;
  onSubmit: (params: SubmitParams) => void;
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
    startDate,
    endDate,
    title,
    id,
  })
  // Form의 편집 모드 boolean
  const isEditMode = mode === 'edit'
  const classes = useStyles()

  const handleDateChange = (propName: 'startDate' | 'endDate') => (pickedDate: MaterialUiPickersDate) => {
    setFormState((prevState) => ({
      ...prevState,
      [propName]: pickedDate as Date,
    }))
  }

  const handleTitleChange: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
    const title = evt.currentTarget.value
    setFormState((prevState) => ({
      ...prevState,
      title,
    }))
  }

  const handleTimeChange = (propName: 'startDate' | 'endDate') => (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { 0: hours, 1: minutes } = evt.currentTarget.value.split(':')
    setFormState((prevState) => ({
      ...prevState,
      [propName]: setHours(setMinutes(prevState[propName], parseInt(minutes)), parseInt(hours)),
    }))
  }

  const handleDeleteClick = () => {
    onDelete && onDelete()
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (evt) => {
    evt.preventDefault()
    const { startDate, endDate, title, id } = formState
    onSubmit && onSubmit({
      startDate,
      endDate,
      title,
      id,
    })
  }

  useEffect(() => {
    setFormState((prevState) => ({
      ...prevState,
      startDate: startDate as Date,
      endDate: endDate as Date,
      // time: format(startDate, 'HH:mm'),
      title,
      // duration: `${differenceInHours(endDate, startDate)}`,
      id,
    }))
  }, [startDate, title, endDate, id, setFormState])

  return (
    <Dialog maxWidth="lg" open={open}>
      <DialogTitle>일정 등록</DialogTitle>
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="id" value={formState.id} />
        <DialogContent>
          <DialogContentText>
            일정의 등록, 변경, 삭제가 가능합니다.
          </DialogContentText>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <KeyboardDatePicker
                    id="startDate"
                    name="date"
                    label="시작 날짜"
                    onChange={handleDateChange('startDate')}
                    value={formState.startDate}
                    format="yyyy/MM/dd"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="startTime"
                    name="startTime"
                    label="시작 시간"
                    type="time"
                    value={format(formState.startDate, 'HH:mm')}
                    onChange={handleTimeChange('startDate')}
                    className={classes.textField}
                  />
                </Grid>
                <Grid item xs={3}>
                  <KeyboardDatePicker
                    id="endDate"
                    name="endDate"
                    label="종료 날짜"
                    onChange={handleDateChange('endDate')}
                    value={formState.endDate}
                    format="yyyy/MM/dd"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="endTime"
                    name="endTime"
                    label="종료 시간"
                    type="time"
                    value={format(formState.endDate, 'HH:mm')}
                    onChange={handleTimeChange('endDate')}
                    className={classes.textField}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
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
import React, { useState } from 'react'
import {
  InputLabel,
  FormControl,
  MenuItem,
  Select,
} from '@material-ui/core'

export interface SelectChangeEventHandler {
  (
    event: React.ChangeEvent<{ name?: string; value: unknown }>,
    child: React.ReactNode,
  ): void;
}

interface Props {
  onChange?: SelectChangeEventHandler;
  value: string;
}

export default function DurationSelects({ onChange, value }: Props) {
  const { 0: valueState, 1: setValueState } = useState(value)
  const handleChange: SelectChangeEventHandler = (evt, child) => {
    setValueState(evt.target.value as string)
    onChange && onChange(evt, child)
  }
  return (
    <FormControl>
      <InputLabel htmlFor="duration">시간</InputLabel>
      <Select
        onChange={handleChange}
        value={valueState}
        inputProps={{
          name: 'duration',
          id: 'duration',
        }}
      >
        <MenuItem value="1">1시간</MenuItem>
        <MenuItem value="2">2시간</MenuItem>
        <MenuItem value="3">3시간</MenuItem>
      </Select>
    </FormControl>
  )
}
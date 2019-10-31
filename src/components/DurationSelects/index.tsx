import React, { useState } from 'react'
import {
  InputLabel,
  FormControl,
  MenuItem,
  Select,
} from '@material-ui/core'

export default function DurationSelects() {
  const { 0: value, 1: setValue } = useState("1")
  const handleChange: React.ChangeEventHandler<{
    name?: string;
    value: unknown;
  }> = (evt) => {
    setValue(evt.target.value as string)
  }
  return (
    <FormControl>
      <InputLabel htmlFor="duration">시간</InputLabel>
      <Select
        onChange={handleChange}
        value={value}
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
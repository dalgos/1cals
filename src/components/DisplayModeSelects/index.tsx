import React from 'react'
import { MenuItem, Select } from '@material-ui/core'

interface Props {
  onChange: React.ChangeEventHandler<{ name?: string; value: unknown; }>;
  values: Array<{
    text: string;
    value: string;
  }>;
  value: string;
}

const DisplayModeSelect: React.FC<Props> = ({
  onChange,
  value,
  values,
}) => {
  return (
    <Select
      onChange={onChange}
      inputProps={{
        name: 'displayMode',
        id: 'display-mode',
      }}
      value={value}
    >
      {values.map(({ text, value }) => (
        <MenuItem value={value}>{text}</MenuItem>
      ))}
    </Select>
  )
}

export default DisplayModeSelect

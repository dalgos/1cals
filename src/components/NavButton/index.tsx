import React from 'react'
import { IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { ChevronLeft, ChevronRight } from '@material-ui/icons'

export enum DIRECTION {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

interface Props {
  direction?: DIRECTION;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  }
}))

const NavButton: React.FC<Props> = ({
  direction = DIRECTION.LEFT,
  onClick,
}) => {
  const classes = useStyles()
  return (
    <IconButton
      className={classes.button}
      onClick={onClick}
    >
      {direction === DIRECTION.LEFT && <ChevronLeft />}
      {direction === DIRECTION.RIGHT && <ChevronRight />}
    </IconButton>
  )
}

export default NavButton
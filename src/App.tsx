import React from 'react';
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Calendar from './containers/Calendar'
import Navigator from './containers/Navigator'
import EventForm from 'containers/EventForm'

const useStyles = makeStyles(() => ({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
}))

const App: React.FC = () => {
  const classes = useStyles()
  return (
    <>
      <Container className={classes.container}>
        <Navigator/>
        <Calendar />
      </Container>
      <EventForm />
    </>
  );
}

export default App;

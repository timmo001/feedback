import React, { ReactElement } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import ArrowForward from '@material-ui/icons/ArrowForward';

const useStyles = makeStyles((theme: Theme) => ({
  fab: {
    margin: theme.spacing(1),
    position: 'fixed',
    right: '5px',
    bottom: '5px',
  },
}));

interface FabRunProps {
  disabled: boolean;
  handleRun: () => void;
}

export default function FabRun(props: FabRunProps): ReactElement {
  const { disabled, handleRun } = props;
  const classes = useStyles();
  return (
    <Fab
      color="primary"
      aria-label="Run"
      className={classes.fab}
      disabled={disabled}
      onClick={handleRun}>
      <ArrowForward />
    </Fab>
  );
}

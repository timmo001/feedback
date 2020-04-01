import React, { ReactElement } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(() => ({
  iconButton: {
    height: 148,
    width: 148,
  },
  iconButtonActive: {
    background: grey[600],
  },
  buttonText: {
    fontSize: '1.2rem',
  },
  icon: {
    width: 100,
    height: 100,
    backgroundSize: 'cover',
  },
}));

export interface Status {
  id: number;
  icon: string;
  desc: string;
}

interface ButtonProps {
  currentStatus?: Status;
  status: Status;
  handleStatusChange: (status: Status) => void;
}
export default function Button(props: ButtonProps): ReactElement {
  const { currentStatus, status, handleStatusChange } = props;

  const handleClick = (s: Status) => (): void => {
    handleStatusChange(s);
  };

  const classes = useStyles();
  return (
    <Grid item lg={2} md={4} sm={4} xs={6}>
      <IconButton
        className={clsx(
          classes.iconButton,
          currentStatus?.id === status.id && classes.iconButtonActive
        )}
        onClick={handleClick(status)}>
        <div
          className={classes.icon}
          style={{ backgroundImage: `url(${status.icon})` }}
        />
      </IconButton>
      <Typography className={classes.buttonText} variant="h4" component="h3">
        {status.desc}
      </Typography>
    </Grid>
  );
}

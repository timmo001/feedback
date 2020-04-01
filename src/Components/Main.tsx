import React, { Fragment, ReactElement, useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';

import Header from './Header';
import MinusOneIcon from '../resources/minusOne.svg';
import MinusTwoIcon from '../resources/minusTwo.svg';
import NeutralIcon from '../resources/zero.svg';
import parseToken from '../utils/parseToken';
import PlusOneIcon from '../resources/plusOne.svg';
import PlusTwoIcon from '../resources/plusTwo.svg';
import StatusButton, { Status } from './Button';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
    width: '100%',
    maxHeight: '100%',
    maxWidth: '100%',
  },
  fill: {
    flexGrow: 1,
  },
  margin: {
    margin: theme.spacing(0.5, 1),
  },
  gridStatus: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  textField: {
    flexBasis: '50%',
  },
  card: {
    margin: theme.spacing(1),
    textAlign: 'center',
  },
  error: {
    color: theme.palette.error.main,
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function Main(): ReactElement {
  const [comment, setComment] = useState<string>();
  const [loading, setLoading] = useState<boolean>();
  const [status, setStatus] = useState<Status>();
  const [success, setSuccess] = useState<boolean>();
  const [token, setToken] = useState<string>();

  useEffect(() => {
    if (window.location.search) setToken(parseToken());
  }, []);

  function handleStatusChange(s: Status): void {
    setStatus(s);
  }

  function handleCommentChange(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    setComment(event.target.value);
  }

  function handleSend(): void {
    console.log('handleSend');
  }

  const classes = useStyles();
  return (
    <Fragment>
      <CssBaseline />
      <Grid container alignItems="center" justify="center">
        <Grid item lg={6} md={10} sm={10} xs={12}>
          <Card className={classes.card}>
            <Header />
            {!success ? (
              <div>
                <CardContent>
                  <Typography variant="h4" component="h2">
                    {process.env.REACT_APP_TITLE ||
                      'How satisfied are you with our service?'}
                  </Typography>
                  <Grid
                    className={classes.gridStatus}
                    container
                    justify="space-around">
                    <StatusButton
                      currentStatus={status}
                      status={{
                        id: -2,
                        desc: 'Very Dissatisfied',
                        icon: MinusTwoIcon,
                      }}
                      handleStatusChange={handleStatusChange}
                    />
                    <StatusButton
                      currentStatus={status}
                      status={{
                        id: -1,
                        desc: 'Dissatisfied',
                        icon: MinusOneIcon,
                      }}
                      handleStatusChange={handleStatusChange}
                    />
                    <StatusButton
                      currentStatus={status}
                      status={{ id: 0, desc: 'Neutral', icon: NeutralIcon }}
                      handleStatusChange={handleStatusChange}
                    />
                    <StatusButton
                      currentStatus={status}
                      status={{ id: 1, desc: 'Satisfied', icon: PlusOneIcon }}
                      handleStatusChange={handleStatusChange}
                    />
                    <StatusButton
                      currentStatus={status}
                      status={{
                        id: 2,
                        desc: 'Very Satisfied',
                        icon: PlusTwoIcon,
                      }}
                      handleStatusChange={handleStatusChange}
                    />
                  </Grid>
                  <FormControl
                    className={clsx(classes.margin, classes.textField)}
                    fullWidth>
                    <InputLabel htmlFor="comment">
                      Any other comments?
                    </InputLabel>
                    <Input
                      id="comment"
                      type="text"
                      multiline
                      value={comment}
                      onChange={handleCommentChange}
                    />
                  </FormControl>
                </CardContent>
                <CardActions>
                  <div className={classes.fill} />
                  {status === undefined && (
                    <Typography
                      className={classes.error}
                      variant="body1"
                      component="h3">
                      Please choose an option
                    </Typography>
                  )}
                  <div className={classes.wrapper}>
                    <Button
                      className={clsx(success && classes.buttonSuccess)}
                      disabled={status === undefined || loading}
                      onClick={handleSend}>
                      Send
                    </Button>
                    {loading && (
                      <CircularProgress
                        size={24}
                        className={classes.buttonProgress}
                      />
                    )}
                  </div>
                </CardActions>
              </div>
            ) : (
              <CardContent>
                <Typography variant="h2" component="h2">
                  Thank you for your feedback!
                </Typography>
                <Typography variant="h4" component="h4">
                  You can now close this tab/window.
                </Typography>
              </CardContent>
            )}
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
}

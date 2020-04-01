import React, { ReactElement, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import queryString from 'query-string';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Header from './Header';
import Message from './Utils/Message';
import Table from './Table/EnhancedTable';

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
  card: {
    maxHeight: '100%',
    margin: theme.spacing(1),
  },
  cardContent: {
    padding: 0,
    '&:last-child': {
      paddingBottom: 0,
    },
  },
}));

const createData = (id: string, status: number, comment: string) => {
  return {
    id,
    status:
      status === -2
        ? 'Very Dissatisfied'
        : status === -1
        ? 'Dissatisfied'
        : status === 0
        ? 'Neutral'
        : status === 1
        ? 'Satisfied'
        : status === 2 && 'Very Satisfied',
    comment,
  };
};

export interface Data {
  comment?: string;
  id: string;
  status: number;
}

export default function Admin(props: RouteComponentProps): ReactElement {
  const { location } = props;

  const [apiUrl, setApiUrl] = useState<string>();
  const [data, setData] = useState<Data[]>();
  const [loading, setLoading] = useState<boolean>();
  const [page, setPage] = useState<string>();
  const [rowsPerPage, setRowsPerPage] = useState<number>();
  const [success, setSuccess] = useState<boolean>();

  useEffect(() => {
    setLoading(true);
    const values = queryString.parse(location.search);
    setApiUrl(
      `${
        values.apiUrl
          ? values.apiUrl
          : `${window.location.protocol}//${window.location.hostname}${
              process.env.REACT_APP_API_PORT
                ? `:${process.env.REACT_APP_API_PORT}`
                : ''
            }`
      }`
    );
    // const storedToken = sessionStorage.getItem('token');
    // const token = storedToken ? storedToken : prompt('Enter token:');
    // if (token)
    // request
    //   .post(`${state.apiUrl}/api/response/get-all`)
    //   .send({ token })
    //   .timeout({
    //     response: 10000,
    //     deadline: 60000,
    //   })
    //   .then((res) => {
    //     if (res.status === 200) {
    //       setState({ loading: false, success: true }, () => {
    //         console.log('Responses received.');
    //         sessionStorage.setItem('token', token);
    //         let data = [];
    //         res.body.map((i) =>
    //           data.push(createData(i.id, i.status, i.comment))
    //         );
    //         setState({ data });
    //       });
    //     } else {
    //       sessionStorage.removeItem('token');
    //       setState({ loading: false, success: false }, () => {
    //         console.error(`Error ${res.status}: ${res.body}`);
    //       });
    //     }
    //   })
    //   .catch((err) => {
    //     sessionStorage.removeItem('token');
    //     setState({ loading: false, success: false }, () => {
    //       if (err.response) {
    //         console.error(`Error: ${err.status} - ${err.response.text}`);
    //       } else {
    //         console.error(
    //           `Error: ${err.message} - Check your credentials and try again`
    //         );
    //       }
    //     });
    //   });
    // });
  }, []);

  const classes = useStyles();
  return (
    <Grid container alignItems="center" justify="center">
      <Grid item lg={6} md={10} sm={10} xs={12}>
        <Card className={classes.card}>
          <Header apiUrl={apiUrl} />
          <CardContent className={classes.cardContent}>
            <Typography variant="h4" component="h2">
              Responses
            </Typography>
            {data ? (
              <Table data={data} />
            ) : (
              <Message type="error" text="There is no data" />
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

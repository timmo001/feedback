import React, { ReactElement } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import imageExists from '../utils/imageExists';
import Logo from '../resources/logo.svg';

const useStyles = makeStyles((theme: Theme) => ({
  media: {
    backgroundSize: 'contain',
    height: 140,
    [theme.breakpoints.up('md')]: {
      height: 240,
    },
  },
}));

interface HeaderProps {
  apiUrl?: string;
}

export default function Header(props: HeaderProps): ReactElement {
  const { apiUrl } = props;

  let logo = Logo;
  const logoUrl = `${apiUrl}/logo.svg`;
  imageExists(logoUrl, (exists: boolean) => {
    if (exists) logo = logoUrl;
  });

  const classes = useStyles();
  return (
    <CardContent>
      <CardMedia className={classes.media} image={logo} title="Feedback" />
    </CardContent>
  );
}

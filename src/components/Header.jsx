import { AppBar, Toolbar, Typography, makeStyles } from "@material-ui/core";
import { HeadsetRounded } from "@material-ui/icons";
import React from "react";

const useStyles = makeStyles((theme) => ({
  title: {
    marginLeft: theme.spacing(2),
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <AppBar color="primary" position="fixed">
      <Toolbar>
        <HeadsetRounded />
        <Typography className={classes.title} variant="h6" component="h1">
          Blue Music Share
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

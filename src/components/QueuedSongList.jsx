import { useMutation } from "@apollo/client";
import {
  Avatar,
  IconButton,
  Typography,
  makeStyles,
  useMediaQuery,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React from "react";
import { ADD_OR_REMOVE_FROM_QUEUE } from "../graphql/mutation";

const QueuedSongList = ({ queue }) => {
  console.log({ queue });
  const greaterThanMedium = useMediaQuery((theme) =>
    theme.breakpoints.up("md")
  );

  // const song = {
  //   title: "Yes yes yeah",
  //   artist: "Rico Tati",
  //   thumbnail:
  //     "https://images.pexels.com/photos/196652/pexels-photo-196652.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  // };

  const useStyles = makeStyles({
    avatar: {
      width: 44,
      height: 44,
    },

    text: {
      textOverflow: "ellipsis",
      overflow: "hidden",
    },
    container: {
      display: "grid",
      gridAutoFlow: "column",
      gridTemplateColumns: "50px auto 50px",
      gridGap: 12,
      alignItems: "center",
      marginTop: 10,
    },

    songInfoContainer: {
      overflow: "hidden",
      whiteSpace: "nowrap",
    },
  });

  const UpcomingSong = ({ song }) => {
    const classes = useStyles();
    const [addOrRemoveFromQueue] = useMutation(ADD_OR_REMOVE_FROM_QUEUE, {
      onCompleted: (data) => {
        localStorage.setItem(
          "queue",
          JSON.stringify(data.addOrRemoveFromQueue)
        );
      },
    });
    const { thumbnail, artist, title } = song;

    const handleAddorRemoveFromQueue = () => {
      addOrRemoveFromQueue({
        variables: { input: { ...song, __typename: "Song" } },
      });
    };
    return (
      <div className={classes.container}>
        <Avatar
          className={classes.avatar}
          src={thumbnail}
          alt="song thumbnail"
        />
        <div className={classes.songInfoContainer}>
          <Typography className={classes.text} variant="subtitle2">
            {title}
          </Typography>
          <Typography
            className={classes.text}
            color="textSecondary"
            variant="body2"
          >
            {artist}
          </Typography>
        </div>
        <IconButton onClick={handleAddorRemoveFromQueue}>
          <Delete color="error" />
        </IconButton>
      </div>
    );
  };

  return (
    greaterThanMedium && (
      <div style={{ margin: "10px 0" }}>
        <Typography color="textSecondary" variant="button">
          Upcoming Songs ({queue.length})
        </Typography>
        {queue.map((song, i) => (
          <UpcomingSong key={i} song={song} />
        ))}
      </div>
    )
  );
};

export default QueuedSongList;

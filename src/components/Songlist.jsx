import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  IconButton,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { PlayArrow, Save, Pause } from "@material-ui/icons";
import React, { useContext, useEffect, useState } from "react";
import { useMutation, useSubscription } from "@apollo/react-hooks";
import { GET_SONGS } from "../graphql/subscription";
import { SongContext } from "../App";
import { ADD_OR_REMOVE_FROM_QUEUE } from "../graphql/mutation";
import { Delete } from "@material-ui/icons";

const Songlist = () => {
  // let loading = false;
  const { data, loading, error } = useSubscription(GET_SONGS);

  // const song = {
  //   title: "The Heat Wave",
  //   artist: "Papi Rico",
  //   thumbnail:
  //     "https://images.pexels.com/photos/6966/abstract-music-rock-bw.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  // };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 50,
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <div>Error getting songs</div>;
  }

  const useStyles = makeStyles((theme) => ({
    container: {
      margin: theme.spacing(3),
    },
    songInfoContainer: {
      display: "flex",
      alignItems: "center",
    },
    songInfo: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
    },
    thumbnail: {
      objectFit: "cover",
      width: 140,
      height: 140,
    },
  }));

  const Song = ({ song }) => {
    const { id } = song;
    const classes = useStyles();
    const [addOrRemoveFromQueue] = useMutation(ADD_OR_REMOVE_FROM_QUEUE, {
      onCompleted: (data) => {
        localStorage.setItem(
          "queue",
          JSON.stringify(data.addOrRemoveFromQueue)
        );
      },
    });
    const { thumbnail, title, artist } = song;
    const { state, dispatch } = useContext(SongContext);
    const [currentSongPlaying, setCurrentSongPlaying] = useState(false);

    useEffect(() => {
      const isSongPlaying = state.isPlaying && id === state.song.id;
      setCurrentSongPlaying(isSongPlaying);
    }, [id, state.song.id, state.isPlaying]);

    const handleTogglePlay = () => {
      dispatch({ type: "SET_SONG", payload: { song } });
      dispatch(
        state.isPlaying ? { type: "PAUSE_SONG" } : { type: "PLAY_SONG" }
      );
    };

    const handleAddorRemoveFromQueue = () => {
      addOrRemoveFromQueue({
        variables: { input: { ...song, __typename: "Song" } },
      });
    };

    // const handleAddorRemoveFromQueue = () => {
    //   addOrRemoveFromQueue({
    //     variables: { input: { ...song, __typename: "Song" } },
    //   });
    // };

    return (
      <Card className={classes.container}>
        <div className={classes.songInfoContainer}>
          <CardMedia className={classes.thumbnail} image={thumbnail} />
          <div className={classes.songInfo}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {title}
              </Typography>
              <Typography variant="body5" component="p" color="textSecondary">
                {artist}
              </Typography>
            </CardContent>
            <CardActions>
              <IconButton
                onClick={handleTogglePlay}
                size="small"
                color="primary"
              >
                {currentSongPlaying ? <Pause /> : <PlayArrow />}
              </IconButton>
              <IconButton
                onClick={handleAddorRemoveFromQueue}
                size="small"
                color="secondary"
              >
                <Save />
              </IconButton>
              {/* <IconButton onClick={handleAddorRemoveFromQueue}>
                <Delete color="error" />
              </IconButton> */}
            </CardActions>
          </div>
        </div>
      </Card>
    );
  };
  return (
    <div>
      {data.songs.map((song) => (
        <Song key={song.id} song={song} />
      ))}
    </div>
  );
};

export default Songlist;

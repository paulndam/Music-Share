import React, { useContext, useReducer } from "react";
import AddSong from "./components/AddSong";
import Header from "./components/Header";
import QueuedSongList from "./components/QueuedSongList";
import Songlist from "./components/Songlist";
import SongPlayer from "./components/SongPlayer";
import { Grid, useMediaQuery, Hidden } from "@material-ui/core";
import songReducer from "./reducer";

export const SongContext = React.createContext({
  song: {
    id: "8f551863-5eda-45d1-9d94-3538cd678470",
    title: "Davido - Jowo (Official Video)",
    artist: "Davido",
    thumbnail: "http://img.youtube.com/vi/l6QMJniQWxQ/0.jpg",
    url: "https://www.youtube.com/watch?v=l6QMJniQWxQ",
    duration: 177,
  },
  isPlaying: false,
});

function App() {
  const initialSongState = useContext(SongContext);
  const [state, dispatch] = useReducer(songReducer, initialSongState);
  const greaterThanMedium = useMediaQuery((theme) =>
    theme.breakpoints.up("md")
  );
  const greaterThanSmall = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  return (
    <SongContext.Provider value={{ state, dispatch }}>
      <Hidden only="xs">
        <Header />
      </Hidden>

      <Grid container spacing={3}>
        <Grid
          style={{
            paddingTop: greaterThanSmall ? 80 : 10,
          }}
          item
          xs={12}
          md={7}
        >
          <AddSong />
          <Songlist />
        </Grid>
        <Grid
          style={
            greaterThanMedium
              ? {
                  position: "fixed",
                  width: "100%",
                  right: 0,
                  top: 70,
                }
              : {
                  position: "fixed",
                  width: "100%",
                  left: 0,
                  bottom: 0,
                }
          }
          item
          xs={12}
          md={5}
        >
          <SongPlayer />
        </Grid>
      </Grid>
    </SongContext.Provider>
  );
}

export default App;

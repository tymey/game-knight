import React from 'react';
import axios from 'axios';
import {
  Box,
  TextField,
  Typography,
} from '@mui/material';

import Navbar from '../components/Navbar';
import GamesList from '../components/GamesList';

const {
  useState,
  useEffect,
} = React;

function Home() {
  // Tracks the state of the input field
  const [name, setName] = useState('');
  // Tracks the state of the games in the collection
  const [games, setGames] = useState([]);
  // Tracks whether there is an error in the input field
  const [inputNameError, setInputNameError] = useState(false);

  // Re-useable helper to make a request to the server for all games
  const getGames = () => {
    axios.get('/api/games')
      .then(({ data }) => {
        setGames(data);
      })
      .catch((err) => {
        console.error('Failed to getGames from DB:', err);
      });
  };

  // Sends POST request to add a game to the games collection
  const postGame = () => {
    axios.post('/api/games', { game: { name } })
      .then(({ data }) => {
        /*
          If no data is in the response, setInputNameError to true:
          This warns user that they have spelt the name of the board game incorrectly
        */
        if (!data) {
          setInputNameError(true);
        /*
          Otherwise, (1) setInputNameError to false to hide warning
          (2) fetchGames to render the newly added game
          (3) setName to '' to clear out the input field
        */
        } else {
          setInputNameError(false);
          getGames();
          setName('');
        }
      })
      .catch((err) => {
        console.error('Failed to postGame:', err);
      });
  };

  // When component mounts, make a get request for all games in the Games collection
  useEffect(() => {
    getGames();
  }, []);

  /**
   * TextField notes:
   *  - error: Uses boolean inputNameError state value to determine if there is an error
   *  - helperText: Shows different message depending on inputNameError state
   *  - onChange: Sets the state of name when user types
   *  - onKeyUp: Submits POST /api/games request on 'Enter'
   */
  return (
    <>
      <Navbar />
      <Box
        sx={{
          padding: 2,
        }}
      >
        <Typography variant="h6" style={{ paddingBottom: 10 }}>
          Add a Game to your collection:
        </Typography>
        <TextField
          error={inputNameError}
          label="Board Game Name"
          variant="outlined"
          value={name}
          helperText={inputNameError ? 'Check the spelling.' : 'Press \'Enter\' to submit.'}
          onChange={(e) => { setName(e.target.value); }}
          onKeyUp={({ key }) => {
            if (key === 'Enter') {
              postGame();
            }
          }}
        />
      </Box>
      <Box
        sx={{
          padding: 2,
        }}
      >
        <Typography variant="h4">
          Board Games Collection:
        </Typography>
        <GamesList
          games={games}
          getGames={getGames}
        />
      </Box>
    </>
  );
}

export default Home;

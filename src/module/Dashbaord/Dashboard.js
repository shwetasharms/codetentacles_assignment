import React, { useEffect, useState } from 'react'
import Countdown from 'react-countdown';
import { removeUserToken } from '../../_helper/secureToken';
import { useNavigate } from 'react-router';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
// Random component
function Dashboard() {
    const [seconds, setSeconds] = useState(60);
    let timer;
    useEffect(() => {
       timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
      // Clean up the interval when the component unmounts
      return () => clearInterval(timer);
    }, []);
  
    useEffect(() => {
      // When seconds reach 0, reset the counter
      if (seconds === 0) {
        // setSeconds(60);
        clearInterval(timer);
        removeUserToken(); // Remove the user token
        navigate('/login'); // Navigate to the login page
      }
    }, [seconds]);
  
    // Convert seconds to "MM:SS" format
    const displayTime = `${Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
  let navigate = useNavigate();
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    fontSize:"3rem",
    border:"1px solid grey"

  }));
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      removeUserToken();
      navigate("/login")
    } else {
      // Render a countdown
      return (
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{height:"100vh"}}
        >
           <Item> {displayTime}</Item>
        </Grid>
      )


    }
  };
  return (
    <div>
      <Countdown
        date={Date.now() + 6000}
        renderer={renderer}
      />
    </div>
  )
}

export default Dashboard  

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LandscapeIcon from '@mui/icons-material/Landscape';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { AlertTitle } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import IconButton from '@mui/material/IconButton';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/Samyang7">
        Sam Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// const theme = createTheme();

export default function Login() {

    const [mode, setMode] = React.useState('light');
    const colorMode = React.useMemo(
        () => ({
        toggleColorMode: () => {
            setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
        },
        }),
        [],
    );

    const theme = React.useMemo(
        () =>
          createTheme({
            palette: {
              mode,
            },
          }),
        [mode],
    );

  const navigate = useNavigate();

  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [error, setError] = React.useState(false);

  const updateEmail = (e) => {
    setEmail(e.target.value);
  }

  const updateUsername = (e) => {
    setUsername(e.target.value);
  }

  async function handleSubmit (event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console

    const email = data.get('email');
    const username = data.get('username');
    
    const url = 'https://jsonplaceholder.typicode.com/users';

    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        setError(true);
      } else {
        const datas = await response.json();
        console.log(data);

        let found = 0;
        datas.forEach(data => {
          if ((data.email).localeCompare(email) === 0 && (data.username).localeCompare(username) === 0) {
            found = 1;
          }
        });
        if (found === 1) {
          navigate('/home');
        } else {
          setError(true);
        }
      }
    } catch (e) {
      setError(true);
    }
   
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LandscapeIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => updateEmail(e)}
              value={email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="username"
              label="username"
              type="text"
              id="username"
              autoComplete="current-password"
              onChange={(e) => updateUsername(e)}
              value={username}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            {error &&
                <Alert
                severity='error'
                action={
                    <Button color='inherit' size='small' onClick={() => setError(false)}>
                    close
                    </Button>
                }
                sx={ {
                    mb: 2
                }}
                >
                <AlertTitle> Error </AlertTitle>
                Username or email is not correct!
                </Alert>
            }
            
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
        
        <Box textAlign='center'>
            {theme.palette.mode} mode
            <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
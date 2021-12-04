import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box } from '@mui/system';
import { AppBar, Button, IconButton, Toolbar, Typography, TextField } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import defaulthost from '../DefaultHost.png';
import ImageIcon from '@mui/icons-material/Image';
import { useParams } from 'react-router';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Container from '@mui/material/Container';

const Detail = () => {
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
  const { id } = useParams();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  }

  const logOut = () => {
    navigate('/');
  }

  const jumpToHome = () => {
    navigate('/home');
  }


  const [title, setTitle] = React.useState('');
  const [city, setCity] = React.useState('');
  const [street, setStreet] = React.useState('');
  const [suite, setSuite] = React.useState('');
  const [zipcode, setZipcode] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [website, setWebsite] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [company, setCompany] = React.useState({});


  async function getContactDetail () {
    const url = `https://jsonplaceholder.typicode.com/users/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    setTitle(data.name);
    setStreet(data.address.street);
    setCity(data.address.city);
    setSuite(data.address.suite);
    setZipcode(data.address.zipcode);
    setPhone(data.phone);
    setWebsite(data.website);
    setEmail(data.email);
    setCompany(data.company);
  }

  React.useEffect(() => {
    getContactDetail();
    // eslint-disable-next-line
  }, []);


  return (
    <div>
        <ThemeProvider theme={theme}>
        <Box sx= { { flexGrow: 1 } }>
          <AppBar position='static'>
            <Toolbar>
              <IconButton
                id="dropdown-button"
                aria-controls="simple-menu"
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleOpenMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseMenu}
                MenuListProps={{
                  'aria-labelledby': 'dropdown-button',
                }}
              >
                <MenuItem onClick={logOut}>Log out</MenuItem>
              </Menu>
              <Typography varient="h6" component="div" sx= { { flexGrow: 1, ml: 2 } }> Contacts </Typography>
              <Box textAlign='center'>
                {theme.palette.mode} mode
                <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                    {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
              </Box>  
            </Toolbar>
          </AppBar>
        </Box>

        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h4"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Your Contacts detail
            </Typography>

          </Container>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: { md: 'space-around' },
            alignItems: { xs: 'center', md: 'flex-start' },
            bgcolor: 'background.paper'
          }}
        >
          <Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant='h7' sx= {{ fontWeight: 'bold' }} color="text.primary">
                Contacter image
              </Typography>
            </Box>
            <br/>
            <Box
              component="img"
              sx={{
                height: 350,
                width: 350,
                maxHeight: { xs: 350, md: 350 },
                maxWidth: { xs: 350, md: 340 },
                mt: 3
              }}
              alt="preview host image."
              src={defaulthost}
            />
            <br/>
            <Button
              varient="contained"
              startIcon={<ImageIcon />}
              component='label'
            >
              upload image
            </Button>
          </Box>

          <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{ textAlign: 'center' }}
          >

            <Box sx = { { mb: 2, ml: 2 } } >
              <Typography sx={ { textAlign: 'center', fontWeight: 'bold' } } variant='h7' color="text.primary">
              Your contacter detail 
              </Typography>
            </Box>

            <Typography color="text.primary">
              Contacter Title
            </Typography>
            <TextField value={title} sx={{ m: 1, width: '31.6ch' }} type="text" id="host-title" label="Title" InputLabelProps={{ shrink: true }} />

            <Typography color="text.primary">
              Contacter Address
            </Typography>

            <TextField value={street}  sx={{ m: 1, width: '15ch' }} type="text" id="host-state" label="Street" InputLabelProps={{ shrink: true }} />
            <TextField value={city} sx={{ m: 1, width: '15ch' }} type="text" id="host-city" label="City" InputLabelProps={{ shrink: true }} />
            <br/>
            <TextField value={suite} sx={{ m: 1, width: '15ch' }} type="text" id="host-suite" label="Suite" InputLabelProps={{ shrink: true }} />
            <TextField value={zipcode} sx={{ m: 1, width: '15ch' }} type="text" id="host-zipcode" label="Zipcode" InputLabelProps={{ shrink: true }} />

            <br/>
            
            <Typography color="text.primary">
              Contact method
            </Typography>
            <TextField value={phone} sx={{ m: 1, width: '31.6ch' }} type="text" id="host-phone" label="Phone" InputLabelProps={{ shrink: true }} />
            <br/>
            <TextField value={website} sx={{ m: 1, width: '31.6ch' }} type="text" id="host-website" label="Website" InputLabelProps={{ shrink: true }} />
            <br/>
            <TextField value={email} sx={{ m: 1, width: '31.6ch' }} type="text" id="host-email" label="Email" InputLabelProps={{ shrink: true }} />
            <br/>
            <Typography color="text.primary">
              Company Info
            </Typography>
            <TextField value={company.name} sx={{ m: 1, width: '31.6ch' }} type="text" id="host-company" label="company" InputLabelProps={{ shrink: true }} />
            <br/>
            <TextField value={company.catchPhrase} sx={{ m: 1, width: '31.6ch' }} type="text" id="host-cp" label="catchPhrase" InputLabelProps={{ shrink: true }} />
            <br/>
            <TextField value={company.bs} sx={{ m: 1, width: '31.6ch' }} type="text" id="host-bs" label="bs" InputLabelProps={{ shrink: true }} />
            <br/>
            <Button sx = { { m: 2 }} onClick={jumpToHome}> Back </Button>
          </Box>
        </Box>
        </ThemeProvider>
    </div>
  );
}

export default Detail;

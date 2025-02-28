import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { Button, Tooltip } from '@mui/material'; 
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import AddBusinessOutlinedIcon from '@mui/icons-material/AddBusinessOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';

import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAppSelector } from '../store/configureStore';
import LogOutDialog from '../../features/account/LogOutDialog';

import carCallLogo from "../../assets/images/carcall-icon.png";

//Opcije za korisnika u zavisnosti od toga koji je korisnik ulogovan
interface Options {
  title: string;
  path: string;
  icon: React.ReactNode;
}

const ownerOptions: Options[] = [
  {title: 'Moja vozila', path:'/myvehicles', icon: <DirectionsCarOutlinedIcon fontSize='large' />},
  {title: 'Dodaj vozilo', path:'/addvehicle', icon: <AddCircleOutlineOutlinedIcon fontSize='large' />},
  {title: 'Moj nalog', path:'/myaccount', icon: <AccountCircleOutlinedIcon fontSize='large' />},
]

const operatorOptions: Options[] = [
  {title: 'Vlasnici', path: '/owners', icon: <PeopleAltOutlinedIcon fontSize='large' />},
  {title: 'Vozila', path: '/vehicles', icon: <DirectionsCarOutlinedIcon fontSize='large' />},
  {title: 'Dodaj vlasnika', path:'/addowner', icon: <PersonAddAltOutlinedIcon fontSize='large' />},
  {title: 'Moj nalog', path: '/myaccount', icon: <AccountCircleOutlinedIcon fontSize='large' />},
]

const adminOptions: Options[] = [
  {title: 'Vlasnici', path: '/owners', icon: <PeopleAltOutlinedIcon fontSize='large' />},
  {title: 'Vozila', path: '/vehicles', icon: <DirectionsCarOutlinedIcon fontSize='large' />},
  {title: 'Operateri', path: '/operators', icon: <PeopleAltOutlinedIcon fontSize='large' />},
  {title: 'Dodaj vlasnika', path:'/addowner', icon: <PersonAddAltOutlinedIcon fontSize='large' />},
  {title: 'Dodaj operatera', path:'/addoperator', icon: <PersonAddAltOutlinedIcon fontSize='large' />},
  {title: 'Moj nalog', path:'/myaccount', icon: <AccountCircleOutlinedIcon fontSize='large' />},
]

const superAdminOptions: Options[] = [
  {title: 'Kompanije', path: '/companies', icon: <BusinessOutlinedIcon fontSize='large' />},
  {title: 'Dodaj admina', path:'/addadmin', icon: <PersonAddAltOutlinedIcon fontSize='large' />},
  {title: 'Dodaj kompaniju', path:'/addcompany', icon: <AddBusinessOutlinedIcon fontSize='large' />},
  {title: 'Moj nalog', path:'/myaccount', icon: <AccountCircleOutlinedIcon fontSize='large' />},
]
////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Main dio gdje se renderuju sve komponente
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(0),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  backgroundColor: '#F8F8F8',
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
        backgroundColor: '#F8F8F8',
      },
    },
  ],
}));
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const drawerWidth = 240;


//AppBar koji se nalazi na vrhu
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: '#F8F8F8',
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        backgroundColor: '#F8F8F8',
      },
    },
  ],
}));
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//SideBar koji se nalazi sa lijeve strane
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),

  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
  backgroundColor: '#F8F8F8',
}));
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const PersistentDrawerLeft = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const {user} = useAppSelector(state => state.account);
  const userRole = user?.role;
  let loggedUserOptions: Options[] = [];

  switch (userRole) {
    case "Owner":
      loggedUserOptions = ownerOptions;
      break;
    case "Operator":
      loggedUserOptions = operatorOptions;
      break;
    case "Admin":
      loggedUserOptions = adminOptions;
      break;
    case "SuperAdmin":
      loggedUserOptions = superAdminOptions;
      break;
    default:
      break;
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if(!user){
      handleDrawerClose();
    }
    else{
      handleDrawerOpen();
    }
  }, [user])


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{backgroundColor: 'white'}}>
        <Toolbar sx={{display: 'flex', justifyContent: 'space-between', bgcolor: '#f8f8f8'}}>
           <Box sx={{display:'flex', alignItems:'center'}}>
            {user &&                 
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={[
                {
                  mr: 2,
                },
                open && { display: 'none' },
                ]}
                >
                <MenuIcon sx={{fontSize: 40, color: 'grey'}}/>
                </IconButton>
              }
              <Box display='flex' gap={2}>
                <Box 
                  component="img"
                  src={carCallLogo}
                  alt="Logo"
                  sx={{
                    width: 'auto', 
                    height: 45,    
                    maxWidth: 150, 
                    objectFit: 'contain'
                  }}
                />
                <Typography component={NavLink} to={'/'} variant="h4" noWrap color='#339966' sx={{fontWeight: 'bolder', textDecoration: 'none'}}>
                    carcall
                </Typography>
              </Box>
            </Box> 
            {user ? (
              <LogOutDialog />
            ) : (
                <Box sx={{display:'flex', alignItems:'center', gap: 2}}>
                  <Button variant='contained' sx={{backgroundColor: '#339966'}} component={Link} to='/login' endIcon={<LoginOutlinedIcon />}>Prijavi se</Button>
                  <Button variant='contained' sx={{backgroundColor: '#339966'}} component={Link} to='/register' endIcon={<HowToRegOutlinedIcon />}>Registruj se</Button>
                </Box>
            ) }
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
          backgroundColor: '#F8F8F8',
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader sx={{display: 'flex', justifyContent: 'space-between'}}>
        <Tooltip title={user?.username} placement='bottom'>
          <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
              <PersonOutlineOutlinedIcon sx={{fontSize: 30, color: 'grey'}} />
              {user ? (
                  <Typography
                      variant='h6'
                      color='grey'
                      sx={{
                        maxWidth: '10ch',  
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                  >
                      @{user.username}
                  </Typography>
              ) : (
                  <Typography variant='h6' color='grey'>
                      @user
                  </Typography>
              )}
          </Box>
        </Tooltip>
            <Box>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </Box>
        </DrawerHeader>
        <Divider />
        <List sx={{backgroundColor: '#f8f8f8', flexGrow: 1}}>
          {loggedUserOptions.map(({title, path, icon}) => (
              <ListItem key={title} disablePadding component={NavLink} to={path}>
                <ListItemButton
                  sx={{
                    '&:hover': {
                      backgroundColor: 'lightgrey',
                      color: '#339966',
                    },
                  }}
                >
                  <ListItemIcon>
                    {icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={title} 
                    sx={{
                      color: 'grey'
                    }}
                  />
                </ListItemButton>
              </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
          <Outlet />
      </Main>
    </Box>
  );
}

export default PersistentDrawerLeft;

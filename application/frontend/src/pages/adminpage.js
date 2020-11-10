import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import AdminAlert from '../components/AdminComponents/adminAlert';
import AdminDataEdit from '../components/AdminComponents/adminDataEdit';
import { MemoryRouter } from 'react-router';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux'
import HealingIcon from '@material-ui/icons/Healing';
import WhatshotIcon from '@material-ui/icons/Whatshot';


const drawerWidth = 240;

function ListItemLink(props) {

    const { icon, primary, to, setMenu } = props;
  
    const renderLink = React.useMemo(
      () => React.forwardRef((itemProps, ref) => <RouterLink to={to} ref={ref} {...itemProps} />),
      [to],
    );
  
    return (
      <li>
        <ListItem button component={renderLink} onClick={() => setMenu()}>
          {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
          <ListItemText primary={primary} />
        </ListItem>
      </li>
      
    );
}
  
ListItemLink.propTypes = {
    icon: PropTypes.element,
    primary: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
};
  

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    position: "relative"
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  typography: {
      flexGrow: 0.75,
  }
}));

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [ whichMenu, setWhichMenu ] = React.useState("Alerts");

  const myCounty = useSelector(state => ({
      information: state.userReducer.information
  }));
  console.log(myCounty.information)

  const displayRightMenu = () => {
    switch (whichMenu) {
      case "Alerts":
        return <AdminAlert></AdminAlert>
      case "Data Edit":
        return <AdminDataEdit></AdminDataEdit>
      case "Logout":
        return 
    }
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <MemoryRouter initialEntries = {['/Admin']} initialIndex ={0}>
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        style={{ "background": "rgb(85,214,67)",
          "background": "linear-gradient(170deg, #55d643 0%, #FF0F00 100%)"}}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <img src="https://i.ibb.co/YPCtv8h/coronalogo-cropped.png" alt="coronalogo-cropped" width="300px"/>
          <Typography 
            variant = "h6"
            color = "inherit"
            align = "center"
            className = {classes.typography}>
              Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <Paper elevation={0}>
          <List aria-label="Admin Options">
            <ListItemLink to="/alerts" primary="Alerts" icon={<NotificationsIcon />} setMenu={() => setWhichMenu("Alerts")} />
            <ListItemLink to="/dataedit" primary="Data Edit" icon={<WhatshotIcon />} setMenu={() => setWhichMenu("Data Edit")} />
          </List>
          <Divider />
          <List aria-label="Login Options">
            <ListItemLink to="/login" primary="Logout" setMenu={() => setWhichMenu("Logout")} />
          </List>
        </Paper>
      </Drawer>
    </div>
    <body>
      {displayRightMenu()}
    </body>
    </MemoryRouter>
  );
}
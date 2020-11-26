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
import AssignmentIcon from '@material-ui/icons/Assignment';
import PostAddIcon from '@material-ui/icons/PostAdd';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import FireAlertSubmit from '../components/fireAlertSubmit';
import BasicTable from '../components/BasicTable';
import FireAddEntry from '../components/FireComponent/fireAddEntry';
import MapView from '../components/MapView';
import { MemoryRouter } from 'react-router';
import { Link as RouterLink, Redirect} from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { setInformation, setIsLoggedIn, setUserType } from '../redux/actions/userActions';


const drawerWidth = 240;

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
      flexGrow: 1,
  }
}));

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

//for solely Logging out
function ListItemLink2(props) {
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(setInformation({}));
    dispatch(setUserType(''));
    dispatch(setIsLoggedIn(false));
  }

  const { icon, primary, to } = props;

  const renderLink = React.useMemo(
    () => React.forwardRef((itemProps, ref) => <RouterLink to={to} ref={ref} {...itemProps} />),
    [to],
  );

  return (
    <li>
      <ListItem button component={renderLink} onClick={logOut}>
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
  
export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [ whichMenu, setWhichMenu ] = React.useState("Edit Data");

  const myCounty = useSelector(state => ({
      information: state.userReducer.information
  }));

  const url = 'http://ec2-15-237-111-31.eu-west-3.compute.amazonaws.com:5000/wildfire/countie/' + myCounty.information['countie'];
  const [result, setResult] = React.useState([]);

  React.useEffect(() => {
    axios.get(url)
    .then((res) => {
      setResult(res.data)
    });
  }, [])

  const displayRightMenu = () => {
    switch (whichMenu) {
      case "Edit Data":
        return (<BasicTable result={result}></BasicTable>);
      case "Alerts":
        return (<FireAlertSubmit />);
      case "Add Fire Entry": 
        return (<FireAddEntry />);
      case "View Map":
        return (<MapView/>);
    }
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <MemoryRouter initialEntries = {['/Fire']} initialIndex ={0}>
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        style={{ "background": "rgb(176,82,246)", 
          "background": "linear-gradient(346deg, rgba(176,82,246,1) 0%, rgba(240,85,85,1) 100%)"}}
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
          
          <Typography 
            variant = "h6"
            color = "inherit"
            align = "center"
            className = {classes.typography}>
              <img src="https://i.ibb.co/YPCtv8h/coronalogo-cropped.png" alt="coronalogo-cropped" width="300px"/>
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
          <List aria-label="Fire Options">
            <ListItemLink to="/alerts" primary="Alerts" icon={<NotificationsIcon />} setMenu={() => setWhichMenu("Alerts")} />
            <ListItemLink to="/editdata" primary="Edit Data" icon={<AssignmentIcon />} setMenu={() => setWhichMenu("Edit Data")} />
            <ListItemLink to="/addfireentry" primary="Add Fire Entry" icon={<PostAddIcon />} setMenu={() => setWhichMenu("Add Fire Entry")} />
            <ListItemLink to="/viewMap" primary="View Map" icon={<PostAddIcon />} setMenu={() => setWhichMenu("View Map")} />
          </List>
          <Divider />
          <List aria-label="Login Options">
            <ListItemLink2 to="/logout" primary="Logout"/>
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

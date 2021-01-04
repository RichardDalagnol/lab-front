import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
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
import { FiPower } from 'react-icons/fi';
import { useAuth } from '../../hooks/AuthContext';
import { Link } from 'react-router-dom';
import AntimicrobialSVG from '../../assets/antibacterial.svg';
import BacteriaSVG from '../../assets/bacteria.svg';
import RequesterSVG from '../../assets/requester.svg';

const drawerWidth = 240;


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',

    },
    appBar: {
      backgroundColor: '#0088cc',
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
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
      padding: theme.spacing(10),
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
  }),
);
const Header: React.FC = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const { signOut } = useAuth();

  const handleClick = () => {
    signOut();
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
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
          <Typography variant="h6" noWrap>
            Lamivet
          </Typography>
        </Toolbar>
        <FiPower size={20} style={{ marginRight: '16px', cursor: 'pointer' }} onClick={handleClick}></FiPower>
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
        <List>
          <Link style={{ textDecoration: 'none' }} to='Antimicrobianos'>
            <ListItem button key='Antimicrobianos'>
              <ListItemIcon><img src={AntimicrobialSVG} width='24px' height='30px' alt='Antimicrobianos' /> </ListItemIcon>
              <ListItemText primary='Antimicrobianos' />
            </ListItem>
          </Link>
          <Link style={{ textDecoration: 'none' }} to='Patogenos'>
            <ListItem button key='Patogenos'>
              <ListItemIcon><img src={BacteriaSVG} width='24px' height='30px' alt='Patógenos ' /> </ListItemIcon>
              <ListItemText primary=' Patógenos' />
            </ListItem>
          </Link>
          <Link style={{ textDecoration: 'none' }} to='Requisitantes'>
            <ListItem button key='Requisitantes'>
              <ListItemIcon><img src={RequesterSVG} width='24px' height='30px' alt='Requisitantes ' /> </ListItemIcon>
              <ListItemText primary='Requisitantes' />
            </ListItem>
          </Link>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        {children}
      </main>
    </div>
  );
}

export default Header;

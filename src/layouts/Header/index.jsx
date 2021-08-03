import {
  AppBar,
  Avatar,
  CssBaseline,
  Divider,
  Drawer,
  FormControl,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Menu,
  MenuItem,
  Select,
  Switch,
  Toolbar,
  useTheme,
} from '@material-ui/core';
import BurstModeIcon from '@material-ui/icons/BurstMode';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import { Image } from 'antd';
import i18next from 'i18next';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import avatarImage from '../../assets/images/covid/avatar.jpeg';
import logo from '../../assets/images/covid/logo.jpg';
import logo2 from '../../assets/images/covid/logo2.jpg';
import { GlobalActions } from '../../redux/rootAction';
import './Header.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
  },
  listItem: {
    'MuiListItem-root Mui-selected': {
      backgroundColor: 'yellow!important',
      color: 'red',
      fontWeight: 'bold',
      fontSize: '30px',
    },
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
}));
const drawerWidth = 170;
function Header(props) {
  const [isMenuOpen, setIsMenuOpen] = useState(null);
  const history = useHistory();
  const match = useRouteMatch();
  const darkMode = useSelector((state) => state.GlobalReducer.darkTheme);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const classes = useStyles();
  const language = localStorage.getItem('i18nextLng');

  const handleThemeChange = () => {
    dispatch(GlobalActions.changeTheme(!darkMode));
  };
  const navigateHomePage = () => {
    history.push('/');
  };
  const navigateNewsPage = () => {
    history.push('/news');
  };
  const handleMenuOpen = (e) => {
    setIsMenuOpen(e.currentTarget);
  };
  const handleMenuClose = () => {
    setIsMenuOpen(null);
  };
  const navigateProfile = () => {
    history.push('/profile');
  };
  const navigateDetailCountry = () => {
    history.push('/countries/Vietnam');
  };
  const handleLogoutClick = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    enqueueSnackbar(t('form.enqueueSnackbar--logout__success'), { variant: 'success' });
    history.push('/news');
  };
  const handleLanguageChange = (e) => {
    i18next.changeLanguage(e.target.value);
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const { window } = props;
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const drawer = (
    <div className={classes.listItem}>
      <Image width="100%" src={logo2} />
      <Divider />
      <List>
        <ListItem button key={t('header.home')} onClick={navigateHomePage} selected={match.path === '/'}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary={t('header.home')} />
        </ListItem>
      </List>
      <Divider />

      <List>
        <ListItem button key={t('header.news')} onClick={navigateNewsPage} selected={match.path === '/news'}>
          <ListItemIcon>
            <BurstModeIcon />
          </ListItemIcon>
          <ListItemText primary={t('header.news')} />
        </ListItem>
      </List>

      <List>
        <ListItem
          button
          key={t('header.country')}
          onClick={navigateDetailCountry}
          selected={match.path === '/countries/:countryName'}
        >
          <ListItemIcon>
            <BurstModeIcon />
          </ListItemIcon>
          <ListItemText primary={t('header.country')} />
        </ListItem>
      </List>
    </div>
  );
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className="header">
      <CssBaseline />
      <AppBar color="secondary" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Avatar alt="Not found" src={logo} />
          <h3 className="header__slogan">Covid-19</h3>
          <FormControl>
            <Select
              onChange={handleLanguageChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              value={language}
            >
              <MenuItem value="en">EN</MenuItem>
              <MenuItem value="vn">VN</MenuItem>
            </Select>
          </FormControl>
          <Switch
            checked={darkMode}
            onChange={handleThemeChange}
            name="checkedA"
            inputProps={{ 'aria-label': 'primary checkbox' }}
            color="default"
          />
          <IconButton onClick={handleMenuOpen} style={{ color: 'white' }}>
            <Avatar alt="Not found" src={avatarImage} />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={isMenuOpen}
        keepMounted
        open={Boolean(isMenuOpen)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        getContentAnchorEl={null}
      >
        <MenuItem onClick={navigateProfile}>{t('header.myAccount')} </MenuItem>
        <MenuItem onClick={handleLogoutClick}>{t('header.logout')}</MenuItem>
      </Menu>

      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden xsUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}

export default Header;

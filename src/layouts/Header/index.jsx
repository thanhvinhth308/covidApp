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
  Toolbar,
  Typography,
  useTheme,
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import BurstModeIcon from '@material-ui/icons/BurstMode';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import i18next from 'i18next';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { checkToken } from '../../utils/localStorage';
import logo from '../../assets/images/covid/logo.jpg';
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
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: 'pink',
  },
}));
const drawerWidth = 170;
function Header(props) {
  const [isMenuOpen, setIsMenuOpen] = useState(null);
  const [language, setLanguage] = useState(localStorage.getItem('i18nextLng'));
  const history = useHistory();
  const match = useRouteMatch();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const classes = useStyles();

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
    enqueueSnackbar('Đăng xuất thành công', { variant: 'success' });
    history.push('/news');
  };
  const handleLanguageChange = (e) => {
    i18next.changeLanguage(e.target.value);
    setLanguage(e.target.value);
  };

  const { window } = props;
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div className={classes.listItem}>
      <List>
        <Avatar alt="Not found" src={logo} />
      </List>
      <Divider />
      {checkToken() && (
        <List>
          <ListItem
            button
            key={t('header.home')}
            onClick={navigateHomePage}
            selected={match.path === '/'}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={t('header.home')} />
          </ListItem>
        </List>
      )}
      <Divider />
      <List>
        <ListItem
          button
          key={t('header.news')}
          onClick={navigateNewsPage}
          selected={match.path === '/news'}
        >
          <ListItemIcon>
            <BurstModeIcon />
          </ListItemIcon>
          <ListItemText primary={t('header.news')} />
        </ListItem>
      </List>
      {checkToken() && (
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
      )}
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  return (
    <div>
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
          <h2 className="header__slogan">Covid Tracking</h2>
          <FormControl>
            <Select
              onChange={handleLanguageChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              defaultValue={language}
            >
              <MenuItem value="en">EN</MenuItem>
              <MenuItem value="vn">VN</MenuItem>
            </Select>
          </FormControl>
          {checkToken() && (
            <IconButton onClick={handleMenuOpen} style={{ color: 'white' }}>
              <AccountCircle color="inherit" />
            </IconButton>
          )}
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
        <Hidden smUp implementation="css">
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
        <Hidden xsDown implementation="css">
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

import { Paper, ThemeProvider } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import AuthRouter from './components/AuthRouter';
import GlobalLoading from './components/GlobalLoading';
import Login from './components/Login';
import MessageModal from './components/Modal/MessageModal';
import PrivateRouter from './components/PrivateRouter';
import PublicRouter from './components/PublicRouter';
import ScrollUpButton from './components/ScrollUpButton';
import AllNews from './pages/AllNews';
import DetailCountry from './pages/DetailCountry';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';

function App(props) {
  const darkMode = useSelector((state) => state.GlobalReducer.darkTheme);
  const theme = createTheme({
    palette: {
      type: darkMode ? 'dark' : 'light'
    }
  });

  return (
    <div className="App">
      <GlobalLoading />
      <ThemeProvider theme={theme}>
        <Switch>
          <PrivateRouter exact path="/" component={Home} />
          <PrivateRouter exact path="/profile" component={Profile} />
          <PrivateRouter exact path="/countries/:countryName" component={DetailCountry} />
          <PublicRouter exact path="/news" component={AllNews} />
          <Route component={NotFound} />
        </Switch>
      </ThemeProvider>
      <MessageModal />
      <ScrollUpButton />
    </div>
  );
}

export default App;

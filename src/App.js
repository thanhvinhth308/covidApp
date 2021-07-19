import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import './App.css';
import AuthRouter from './components/AuthRouter';
import Login from './components/Login';
import PrivateRouter from './components/PrivateRouter';
import PublicRouter from './components/PublicRouter';
import AllNews from './pages/AllNews';
import DetailCountry from './pages/DetailCountry';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import i18next from 'i18next';
import { GlobalActions } from './redux/rootAction';
import { useDispatch } from 'react-redux';

const lightTheme = {
  textColor: '#fff',
  background: '#000',
};

const darkTheme = {
  textColor: '#000',
  background: '#fff',
};

function App(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const Global = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.background};
    transition: all 200ms;
    color:${({ theme }) => theme.background}
  }
`;
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };
  const [theme, setTheme] = useState('light');
  return (
    // <div className="App">
    <div>
      {/* <GlobalLoading /> */}
      {/* change theme
      <button style={{ marginTop: '80px' }} onClick={toggleTheme}>
        Toggle Theme
      </button> */}
      {/* <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}> */}
      {/* <Global /> */}
      <Switch>
        <PrivateRouter exact path="/" component={Home} />
        <PrivateRouter exact path="/profile" component={Profile} />
        <PrivateRouter exact path="/countries/:countryName" component={DetailCountry} />
        <AuthRouter exact path="/login" component={Login} />
        <PublicRouter exact path="/news" component={AllNews} />
        <Route component={NotFound} />
      </Switch>
      {/* </ThemeProvider> */}
    </div>
  );
}

// export default withTranslation('common')(App);
export default App;

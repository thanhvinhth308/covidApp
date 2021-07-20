import { SnackbarProvider } from 'notistack';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import store from './redux/store';
import reportWebVitals from './reportWebVitals';
import './i18';
ReactDOM.render(
  <Provider store={store}>
    {/* <I18nextProvider i18n={i18next}> */}
    <BrowserRouter>
      <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'right' }} maxSnack={2} autoHideDuration={1500}>
        <React.StrictMode>
          <Suspense fallback={<div>Loading</div>}>
            <App />
          </Suspense>
        </React.StrictMode>
      </SnackbarProvider>
    </BrowserRouter>
    {/* </I18nextProvider> */}
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

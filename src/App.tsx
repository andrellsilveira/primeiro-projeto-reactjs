import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyles from './styles/global';
import Routes from './routes';

const App: React.FC = () => (
  /**
   * O componente BrowserRouter indica que as rotas da aplicação
   * são originadas de uma URL
   */
  <>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
    <GlobalStyles />
  </>
);

export default App;

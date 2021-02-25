import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import CreateGlobalStyle from './style/globol';
import ContextWrapper from './hooks';

import Routes from './Router';

const App: React.FC = () => (
  <div className="App">
    <BrowserRouter>
      <ContextWrapper>
        <Routes />
      </ContextWrapper>
      <CreateGlobalStyle />
    </BrowserRouter>
  </div>
);
export default App;

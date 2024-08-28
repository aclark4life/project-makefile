import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import getDataComponents from '../dataComponents';
import UserContextProvider from '../context';
import * as components from '../components';
import "../styles/index.scss";
import "../styles/theme-blue.scss";
import "./config";

const { ErrorBoundary } = components;
const dataComponents = getDataComponents(components);
const container = document.getElementById('app');
const root = createRoot(container);
const App = () => (
    <ErrorBoundary>
      <UserContextProvider>
        {dataComponents}
      </UserContextProvider>
    </ErrorBoundary>
);
root.render(<App />);

import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import App from './view/components/App/App.js';
import Model from './model/model.js';
import Controller from './controller/controller.js';

const view = ReactDOM.createRoot(document.getElementById('root'));
const model = new Model(view);
const controller = new Controller(model);

model.render = () =>
  model.view.render(
    <React.StrictMode>
      <App model={model} controller={controller} />
    </React.StrictMode>
  );

model.render();

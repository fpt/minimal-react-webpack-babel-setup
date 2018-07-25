import React from 'react';
import ReactDOM from 'react-dom';

import { SuggestedInput } from './Suggest';


const title = 'Examples of reenhance-components';

ReactDOM.render((
  <div>
    <h1>{title}</h1>

    <h2>Autocomplete Input</h2>
    <SuggestedInput />
  </div>),
  document.getElementById('app')
);

module.hot.accept();
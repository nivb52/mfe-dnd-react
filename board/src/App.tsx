import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';
import Tasks from './pages/Tasks';

// move to host
import { Toaster } from 'react-hot-toast';

const App = () => (
  <>
    <Toaster position="top-right" gutter={8} />
    <div className="mt-10 text-3xl mx-auto max-w-6xl">
      <Tasks />
    </div>
  </>
);
ReactDOM.render(<App />, document.getElementById('app'));

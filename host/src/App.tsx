import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';
//@ts-ignore
const Tasks = React.lazy(() => import('board/Tasks'));

const Header = () => (
  <div className="flex items-center justify-between mb-6">
    <h1 className="text-xl text-gray-800 flex justify-start items-center space-x-2.5">
      <span> My Kanban</span>
    </h1>
  </div>
);

const App = () => (
  <div
    className="w-screen mx-auto mt-10"
    style={{ width: 'calc(100vh - 26px)' }}>
    <Header />
    <React.Suspense fallback={<span>Loading ...</span>}>
      <Tasks />
    </React.Suspense>
  </div>
);
ReactDOM.render(<App />, document.getElementById('app'));

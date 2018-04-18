import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from '../home/homePage';
import '../app/App.css' ;

class App extends React.Component<{}, {}> {
  render() {
    return (
      <div>
      <Switch>
        <Route  path="/" component={HomePage} />
      </Switch>
      </div>
    );
  }
}

export default App;

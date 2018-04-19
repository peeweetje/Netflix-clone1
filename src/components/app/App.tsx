import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from '../home/homePage';
import Shows from '../home/shows';
import '../app/App.css' ;

class App extends React.Component<{}, {}> {
  render() {
    return (
      <div>
      <Switch>
        <Route  path="/" component={HomePage} />
        <Route  path="/shows" component={Shows} />
      </Switch>
      </div>
    );
  }
}

export default App;

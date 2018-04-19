import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from '../home/homePage';
import Shows from '../navbarmenu/shows';
import Movies from '../navbarmenu/movies';
import RecentlyAdded from '../navbarmenu/recentlyAdded';
import MyList from '../navbarmenu/myList';
import '../app/App.css' ;

class App extends React.Component<{}, {}> {
  render() {
    return (
      <div>
      <Switch>
        <Route  path="/HomePage" component={HomePage} />
        <Route  path="/Shows" component={Shows} />
        <Route  path="/Movies" component={Movies} />
        <Route  path="/RecentlyAdded" component={RecentlyAdded} />
        <Route  path="/MyList" component={MyList} />
      </Switch>
      </div>
    );
  }
}

export default App;

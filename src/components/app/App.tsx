import * as React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "../home/homePage";
import Shows from "../navbarmenu/shows";
import Movies from "../navbarmenu/movies";
import RecentlyAdded from "../navbarmenu/recentlyAdded";
import MyList from "../navbarmenu/myList";
import "../app/App.css";

class App extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <Switch>
          <Route exact={true} path="/" component={HomePage} />
          <Route exact={true} path="/Shows" component={Shows} />
          <Route exact={true} path="/Movies" component={Movies} />
          <Route exact={true} path="/RecentlyAdded" component={RecentlyAdded} />
          <Route exact={true} path="/MyList" component={MyList} />
        </Switch>
      </div>
    );
  }
}

export default App;

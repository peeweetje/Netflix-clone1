import * as React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "../home/homePage";
import Shows from "../navbarmenu/shows/shows";
import Movies from "../navbarmenu/movies/movies";
import RecentlyAdded from "../navbarmenu/recently-added/recentlyAdded";
import MyList from "../navbarmenu/my-list/myList";
import { GlobalStyle } from "../../../src/styles/global";
import "../app/App.css";

const App = () => {
  return (
    <div>
      <GlobalStyle />
      <Switch>
        <Route exact={true} path="/" component={HomePage} />
        <Route exact={true} path="/Shows" component={Shows} />
        <Route exact={true} path="/Movies" component={Movies} />
        <Route exact={true} path="/RecentlyAdded" component={RecentlyAdded} />
        <Route exact={true} path="/MyList" component={MyList} />
      </Switch>
    </div>
  );
};

export default App;

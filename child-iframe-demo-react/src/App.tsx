import { Route, Switch } from "react-router-dom";
import ConfigurationPage from "./components/configuration/ConfigurationPage";
import TODOPage from "./components/TODO";

function App() {
  return (
    <div>
      <Switch>
          <Route path="/Conf" exact>
            <ConfigurationPage />
          </Route>
      </Switch>
    </div>
  );
}

export default App;

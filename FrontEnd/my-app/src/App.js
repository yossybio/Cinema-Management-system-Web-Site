import { Switch, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import CreateAccountPage from "./CreateAccountPage";
import MainPage from "./MainPage";

function App() {
  return (
    <div>
      <h1>Movies - Subscriptions Web Site</h1>
      <Switch>
        <Route path="/" exact component={LoginPage} />
        <Route path="/createAccount" component={CreateAccountPage} />
        <Route path="/main" component={MainPage} />
      </Switch>
    </div>
  );
}

export default App;

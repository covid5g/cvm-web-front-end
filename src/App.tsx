import React from "react";
import {
    BrowserRouter,
    Switch,
    Route
} from "react-router-dom";
import ThemeWrapper from "./components/ThemeWrapper";
import Wrapper from "./components/Wrapper";
import PrivateRoute from "./components/PrivateRoute";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/pages/Dashboard";
import StandaloneMap from "./components/pages/StandaloneMap";
import UserPagesWrapper from "./components/UserPagesWrapper";
import Landing from "./components/pages/Landing";

const App: React.FC = () => {
    return <ThemeWrapper>
        <BrowserRouter>
            <Switch>
                <Route path="/map">
                    <StandaloneMap/>
                </Route>
                <Route path="/">
                    <Switch>
                        <Route path="/user/">
                            <UserPagesWrapper>
                                <Switch>
                                    <Route path="/user/login">
                                        <LoginForm/>
                                    </Route>
                                    <Route path="/user/login">
                                        <LoginForm/>
                                    </Route>
                                    <Route path="/user">
                                        <Landing/>
                                    </Route>
                                </Switch>
                            </UserPagesWrapper>
                        </Route>
                        <PrivateRoute path="/">
                            <Wrapper>
                                <Dashboard/>
                            </Wrapper>
                        </PrivateRoute>
                    </Switch>
                </Route>
            </Switch>
        </BrowserRouter>
    </ThemeWrapper>
};

export default App;

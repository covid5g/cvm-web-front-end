import React from "react";
import {
    BrowserRouter,
    Switch,
    Route
} from "react-router-dom";
import ThemeWrapper from "./components/ThemeWrapper";
import Header from "./components/Header";
import Wrapper from "./components/Wrapper";
import PrivateRoute from "./components/PrivateRoute";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
import StandaloneMap from "./components/StandaloneMap";

const App: React.FC = () => {
    return <ThemeWrapper>
        <BrowserRouter>
            <Switch>
                <Route path="/map">
                    <StandaloneMap/>
                </Route>
                <Route path="/">
                    <Header/>
                    <Wrapper>
                        <Switch>
                            <Route path="/login">
                                <LoginForm/>
                            </Route>
                            <PrivateRoute path="/">
                                <Dashboard/>
                            </PrivateRoute>
                        </Switch>
                    </Wrapper>
                </Route>
            </Switch>
        </BrowserRouter>
    </ThemeWrapper>
};

export default App;

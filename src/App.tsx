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

const App: React.FC = () => {
    return <ThemeWrapper>
        <BrowserRouter>
            <Header/>
            <Wrapper>
                <Switch>
                    <PrivateRoute path="/dashboard">
                        <Dashboard/>
                    </PrivateRoute>
                    <Route path="/login">
                        <LoginForm/>
                    </Route>
                    <PrivateRoute path="/">
                        <div/>
                    </PrivateRoute>
                </Switch>
            </Wrapper>
        </BrowserRouter>
    </ThemeWrapper>
};

export default App;

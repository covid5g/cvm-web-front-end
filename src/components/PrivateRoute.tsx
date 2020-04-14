import React from "react";
import {Route, Redirect} from "react-router-dom"
import {AppState} from "../store";
import {connect} from "react-redux";
import User from "../types/User";

interface PrivateRouteProps {
    user: User | null
    children: any,
    path: string
}

const PrivateRoute = ({children, user, path}: PrivateRouteProps) => {
    return (
        <Route
            path={path}
            render={({location}) =>
                user ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: {from: location}
                        }}
                    />
                )
            }
        />
    );
};

const mapStateToProps = (state: AppState) => ({
    user: state.users.appUser
});

export default connect(mapStateToProps)(PrivateRoute);
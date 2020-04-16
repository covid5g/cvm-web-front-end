# COVID5G frontend

React frontend that connects to our API, Google Maps API, and APIs with COVID data.

## Getting Started

Start the application the following command

```
npm start
```

### Prerequisites

To run the app NodeJs is required

```
sudo apt update
sudo apt -y install curl dirmngr apt-transport-https lsb-release ca-certificates
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt -y install nodejs
sudo apt -y  install gcc g++ make
```

### Installing

To get the project up and running run the following command

```
npm install
```

## Structure

### Routes

Routing is handles by the `BrowserRouter` and the actual routes are defined by `Route` elements places in `Switch` elements

```
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
                            <Route path="/user/checkup">
                                <Checkup/>
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
```

### Pages

All the pages that are render by the router can be found in the `src/components/pages` directory.

### APIs

All the API calls are centralised in the `src/helpers/api-calls.ts` file.
The file is mostly split in two parts, the first one consists of mocks used for development and the other one of the real API calls.

### Redux

Redux logic is grouped in `actions`, `reducers`, `store` and `thunks`. All have folders in `src`. 

## Built With

* [TypeScript](https://www.typescriptlang.org/) - A better JavaScript
* [React](https://reactjs.org/) - Frontend framework
* [Redux](https://redux.js.org/) - State management
* [React Router](https://github.com/ReactTraining/react-router) - Frontend routing library for react
* [Material UI](https://material-ui.com/) - UI Kit
* [Google Maps](https://developers.google.com/maps/documentation) - Google Maps
* [Axios](https://github.com/axios/axios) - AJAX requests library
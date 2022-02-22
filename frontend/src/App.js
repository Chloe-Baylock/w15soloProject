import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from "./components/HomePage";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import LocationPage from "./components/LocationPage";
import LocationFormPage from "./components/LocationFormPage";
import EditLocationForm from "./components/EditLocationForm";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className="global-top-left">
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route  exact path='/'>
            <HomePage isLoaded={isLoaded} />
          </Route>
          <Route path='/login'>
            <LoginFormPage />
          </Route>
          <Route path='/signup'>
            <SignupFormPage />
          </Route>
          <Route exact path='/locations/:id(\d+)'>
            <LocationPage />
          </Route>
          <ProtectedRoute path='/locations/new'>
            <LocationFormPage />
          </ProtectedRoute>
          <ProtectedRoute path='/locations/:id(\d+)/edit'>
            <EditLocationForm isLoaded={isLoaded} />
          </ProtectedRoute>
        </Switch>
      )}
      <Footer />
    </div>
  );
}

export default App;
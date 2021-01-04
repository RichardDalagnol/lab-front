import React from 'react';
import {
  RouteProps as ReactDOMRouteProps,
  Route as ReactDOMRoute,
  Redirect,
} from 'react-router-dom';
import Header from '../components/Header';

import { useAuth } from '../hooks/AuthContext';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        console.log(isPrivate, user)
        return isPrivate === !!user ? (
          (isPrivate === true) ? (
            <Header>
              <Component />
            </Header>
          ) : (
              <Component />
            )
        ) : (
            <Redirect
              to={{
                pathname: isPrivate ? '/' : '/dashboard',
                state: { from: location },
              }}
            />
          );
      }}
    />
  );
};

export default Route;

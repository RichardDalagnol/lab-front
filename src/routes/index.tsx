import React from 'react'
import { Switch } from 'react-router-dom'
import Route from './Route';

import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Dashboard from '../pages/Dashboard'
import Antimicrobial from '../pages/Antimicrobial'
import Pathogen from '../pages/Pathogen'
import Requester from '../pages/Requester'
import Sample from '../pages/Sample'

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={SignIn} />
    <Route exact path="/SignUp" component={SignUp} />
    <Route exact path="/Dashboard" component={Dashboard} isPrivate={true} />
    <Route exact path="/Antimicrobianos" component={Antimicrobial} isPrivate={true} />
    <Route exact path="/Patogenos" component={Pathogen} isPrivate={true} />
    <Route exact path="/Requisitantes" component={Requester} isPrivate={true} />
    <Route exact path="/Lms" component={Sample} isPrivate={true} />
  </Switch>
);

export default Routes;

import { Redirect, Router } from '@reach/router'

import About from './pages/About'
import AccountUpdate from './pages/AccountUpdate'
import AccountView from './pages/AccountView'
import BMICreate from './pages/BMICreate'
import BMIUpdate from './pages/BMIUpdate'
import Confirmation from './pages/Confirmation'
import DashboardFamilies from './pages/DashboardFamilies'
import DashboardResidents from './pages/DashboardResidents'
import FamilyCreate from './pages/FamilyCreate'
import FamilyList from './pages/FamilyList'
import FamilyUpdate from './pages/FamilyUpdate'
import FamilyUpdateLocation from './pages/FamilyUpdateLocation'
import FamilyView from './pages/FamilyView'
import Map from './pages/Map'
import React from 'react'
import ResidentCreate from './pages/ResidentCreate'
import ResidentList from './pages/ResidentList'
import ResidentUpdate from './pages/ResidentUpdate'
import ResidentView from './pages/ResidentView'
import Sider from './layouts/Sider'
import SignIn from './pages/SignIn'
import Tabs from './layouts/Tabs'
import UserCreate from './pages/UserCreate'
import UserList from './pages/UserList'
import UserUpdate from './pages/UserUpdate'
import UserView from './pages/UserView'

function Routes() {
  return (
    <Router>
      <SignIn path="/" />
      <Sider path="/">
        <AccountView path="account" />
        <AccountUpdate path="account/edit" />
        <Redirect from="/dashboard" to="/dashboard/residents" noThrow />
        <Tabs path="dashboard">
          <DashboardResidents path="residents" />
          <DashboardFamilies path="families" />
        </Tabs>
        <Map path="map" />
        <ResidentList path="residents" />
        <ResidentView path="residents/:resident_id" />
        <ResidentCreate path="residents/new" />
        <ResidentUpdate path="residents/:resident_id/edit" />
        <BMICreate path="residents/:resident_id/bmis/new" />
        <BMIUpdate path="residents/:resident_id/bmis/:bmi_id/edit" />
        <FamilyList path="families" />
        <FamilyView path="families/:family_id" />
        <FamilyCreate path="families/new" />
        <FamilyUpdate path="families/:family_id/edit" />
        <FamilyUpdateLocation path="families/:family_id/edit/location" />
        <UserList path="users" />
        <UserView path="users/:user_id" />
        <UserCreate path="users/new" />
        <UserUpdate path="users/:user_id/edit" />
        <About path="about" />
        <Confirmation path="confirmation" />
      </Sider>
    </Router>
  )
}

export default Routes

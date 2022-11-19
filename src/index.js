import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import OnHomeApp from './OnHomeApp'
import LoginPage from './ui/pages/Login'
import FinancialPage from './ui/pages/Financial'
import CustomerPage from './ui/pages/Customer'
import ProfilePage from './ui/pages/Profile'

import reportWebVitals from './reportWebVitals'
import './index.css'
import NewCustomerPage from './ui/pages/Customer/new-customer'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path="app" element={<OnHomeApp />}>
          <Route index element={<FinancialPage />} />
          <Route path='customer' element={<CustomerPage />} />
          <Route path='customer/add' element={<NewCustomerPage />} />
          <Route path='profile' element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

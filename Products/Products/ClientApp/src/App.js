﻿import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import FetchData from './components/FetchData';
import ProductPage from './components/ProductPage';


export default () => (
    <Layout>
    <Route exact path='/' component={Home} />
    <Route path='/fetchdata/:startIndex?' component={FetchData} />
    <Route path='/product/:index?' component={ProductPage} />
  </Layout>
);
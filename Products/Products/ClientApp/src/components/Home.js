import React from 'react';
import { connect } from 'react-redux';

const Home = props => (
  <div>
    <h1>Products viewer</h1>
    <p>by Selikhov Evgenii</p>
  </div>
);

export default connect()(Home);

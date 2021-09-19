import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import Exchanges from './components/Exchanges';
import CryptoDetails from './components/CryptoDetails';
import News from './components/News';
import Cryptocurrencies from './components/Cryptocurrencies';
import './App.css';

const App = () => {
  return (
    <div className='app'>
      <div className='navbar'>
        <Navbar />
      </div>
      <div className='main'>
        <Layout>
          <div className='routes'>
            <Switch>
              <Route exact path='/' component={Homepage} />
              <Route exact path='/exchnages' component={Exchanges} />
              <Route
                exact
                path='/cryptocurrencies'
                component={Cryptocurrencies}
              />
              <Route exact path='/crypto/:coinId' component={CryptoDetails} />
              <Route exact path='/news' component={News} />
            </Switch>
          </div>
        </Layout>

        <div className='footer'>
          <Typography.Title
            level={5}
            style={{ color: 'white', textAlign: 'center', fontSize: 12 }}
          >
            CryptoDaily <br />
            All rights reserved
          </Typography.Title>
          <Space>
            <Link to='/'>Home</Link>
            <Link to='/exchanges'>Exchanges</Link>
            <Link to='/news'>News</Link>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default App;

import React, { Fragment, useState, useEffect } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Typography, Card, Row, Col, Input } from 'antd';
import { useGetCryptosQuery } from '../services/cryptoApi';

const { Title } = Typography;

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (cryptosList?.data?.coins) {
      setCryptos(cryptosList.data.coins);
    }
  }, [cryptosList?.data?.coins]);

  useEffect(() => {
    if (searchTerm) {
      const filteredData = cryptosList?.data?.coins.filter((coin) =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setCryptos(filteredData);
    }
  }, [cryptosList, searchTerm]);

  if (isFetching) return 'Loading...';

  return (
    <Fragment>
      {!simplified && (
        <Fragment>
          <Title level={2} className='heading'>
            Cryptocurrencies
          </Title>
          <div className='search-crypto'>
            <Input
              placeholder='Search Cryptocurrency'
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </Fragment>
      )}
      <Row gutter={[32, 32]} className='crypto-card-container'>
        {cryptos.map((currency) => (
          <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.id}>
            <Link to={`/crypto/${currency.id}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={
                  <img
                    className='crypto-image'
                    src={currency.iconUrl}
                    alt={currency.name}
                    title={currency.name}
                  />
                }
                hoverable
              >
                <p>Price : {millify(currency.price)}</p>
                <p>Market Cap : {millify(currency.marketCap)}</p>
                <p>
                  Daily Change:{' '}
                  <span
                    style={{ color: currency.change < 0 ? 'red' : 'green' }}
                  >
                    {millify(currency.change)}%
                  </span>
                </p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Fragment>
  );
};

export default Cryptocurrencies;

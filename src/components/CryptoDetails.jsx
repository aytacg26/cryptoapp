import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from '../services/cryptoApi';
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';
import Loader from './UI/Loader/Loader';
import LineChart from './UI/LineChart/LineChart';

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState('7d');
  const { data } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinId,
    timePeriod,
  });
  const cryptoDetails = data
    ? data.data.coin
    : {
        name: '',
        slug: '',
        price: 0,
        rank: 0,
        volume: 0,
        marketCap: 0,
        allTimeHigh: { price: 0 },
        numberOfMarkets: 0,
        numberOfExchanges: 0,
        approvedSupply: false,
        totalSupply: 0,
        circulatingSupply: 0,
      };

  if (!data) return <Loader />;

  const time = ['24h', '7d', '30d', '1y', '5y'];

  const stats = [
    {
      title: 'Price to USD',
      value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: 'Rank', value: cryptoDetails.rank, icon: <NumberOutlined /> },
    {
      title: '24h Volume',
      value: `$ ${cryptoDetails.volume && millify(cryptoDetails.volume)}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: 'Market Cap',
      value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: 'All-time-high(daily avg.)',
      value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: 'Number Of Markets',
      value: cryptoDetails.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: 'Number Of Exchanges',
      value: cryptoDetails.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: 'Aprroved Supply',
      value: cryptoDetails.approvedSupply ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: 'Total Supply',
      value: `$ ${millify(cryptoDetails.totalSupply)}`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: 'Circulating Supply',
      value: `$ ${millify(cryptoDetails.circulatingSupply)}`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  return (
    <Col className='coin-detail-container'>
      <Col className='coin-heading-container'>
        <Title level={2} className='coin-name'>
          {cryptoDetails.name} ({cryptoDetails.slug}) Price
        </Title>
        <p>
          {cryptoDetails.name} live price is US Dollars ($). View value
          statistics, market cap and supply.
        </p>
      </Col>
      <Select
        defaultValue='7d'
        className='select-timeperiod'
        placeholder='Select Time Period'
        onChange={(value) => setTimePeriod(value)}
      >
        {time.map((option) => (
          <Option value={option} key={option}>
            {option}
          </Option>
        ))}
      </Select>
      <LineChart
        coinHistory={coinHistory}
        currentPrice={millify(cryptoDetails.price)}
        coinName={cryptoDetails.name}
      />
      <Col className='stats-container'>
        <Col className='coin-value-statistics'>
          <Col className='coin-value-statistics-heading'>
            <Title level={3} className='coin-details-heading'>
              {cryptoDetails.name} Value Statistics
            </Title>
            <p>An overview showing the stats of {cryptoDetails.name}</p>
          </Col>
          {stats.map(({ icon, title, value }, index) => (
            <Col className='coin-stats' key={`${title}-${index}`}>
              <Col className='coin-stats-name'>
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className='stats'>{value}</Text>
            </Col>
          ))}
        </Col>
        <Col className='other-stats-info'>
          <Col className='coin-value-statistics-heading'>
            <Title level={3} className='coin-details-heading'>
              Other Statistics
            </Title>
            <p>An overview showing the stats of all cryptocurrencies</p>
          </Col>
          {genericStats.map(({ icon, title, value }, index) => (
            <Col className='coin-stats' key={`${title}-${index}-generic`}>
              <Col className='coin-stats-name'>
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className='stats'>{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className='coin-desc-link'>
        <Row className='coin-desc'>
          <Title level={3} className='coin-details-heading'>
            What is {cryptoDetails.name}?
          </Title>
          {HTMLReactParser(cryptoDetails.description)}
        </Row>
        <Col className='coin-links'>
          <Title level={3} className='coin-details-heading'>
            {cryptoDetails.name} Links
          </Title>
          {cryptoDetails.links.map((link, index) => (
            <Row className='coin-link' key={`${link.name}-${index}`}>
              <Title level={5} className='link-name'>
                {link.type}
              </Title>
              <a
                href={link.url}
                target='_blank'
                rel='noreferrer'
                style={{ padding: '2px 10px' }}
              >
                {link.name}
              </a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  );
};

export default CryptoDetails;

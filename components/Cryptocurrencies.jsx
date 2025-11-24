import React,{useState} from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import {Card,Row,Col,Input} from 'antd'
import useCryptos from '../services/cryptoApi'
import { SmileFilled } from '@ant-design/icons'
const Cryptocurrencies = ({simplified}) => {

  const { cryptos, loading, error } = useCryptos();
  const [searchTerm, setSearchTerm] = useState('')
  const filteredCryptos = cryptos.coins?.filter((coin) =>
  coin.name.toLowerCase().includes(searchTerm.toLowerCase())
)


  const displayCryptos = simplified 
    ? filteredCryptos?.slice(0, 10) : filteredCryptos;
  return (
    <>
      {!simplified && (
        <div className='search-crypto'>
          <Input
            placeholder='Search Cryptocurrency'
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
  )}
    <Row gutter = {[32,32]} className='crypto-card-container'>
      {displayCryptos?.map((currency)=>(
        <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.id}>
          <Link to={`/crypto/${currency.uuid}`}>
          <Card title={`${currency.rank}. ${currency.name}`} 
          extra={<img className='crypto-image' src={currency.iconUrl} alt={currency.name} />}
          hoverable
          >
            <p>Price:{millify(currency.price)}</p>
            <p>Market Cap:{millify(currency.marketCap)}</p>
            <p>Daily Change:{millify(currency.change)}%</p>

          </Card>
          </Link>
        </Col>
      ))}

    </Row>
    </>
  )
}

export default Cryptocurrencies

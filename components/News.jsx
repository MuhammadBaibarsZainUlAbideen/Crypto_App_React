import React,{useState} from 'react'
import { Select,Typography,Row,Col,Avatar,Card } from 'antd'
import moment from 'moment'
import usenews from '../services/cryptoNewsApi';
import useCryptos from '../services/cryptoApi';
const {Text,Title} = Typography
const {Option} = Select;
const News = ({simplified}) => {
  const [newsCategory,setNewsCategory] = useState('Cryptocurrency')
  const {news,loading,error} = usenews();
  const { cryptos } = useCryptos(50);
  if(loading) return "Loading";
  if(error) return "Error loading news"
  const displaynews = simplified
    ? news?.slice(0,10):news;
const demoimage = 'http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg'
  return (
    <Row gutter={[24,24]}>
      {!simplified &&(
        <Col span={24}>
          <Select
            showSearch
            className='select-news'
            placeholder="Select a Crypto"
            optionFilterProp='children'
            onChange={(value) =>setNewsCategory(value)}
            filterOption = {(input,option) => option.children.toLowerCase().includes(input.toLowerCase())}
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {cryptos?.coins.map((coin) => <Option value={coin.name}>{coin.name}</Option>)}

          </Select>
        </Col>
      )}
      {displaynews.map((new1,i) =>(
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={new1.url} target="_blank" rel="noreferrer">
              <div className='news-image-container'>
                <Title className='news-title' level={4}>{new1.title}</Title>
                <img className = "news-image"src={new1?.thumbnail || demoimage} alt="news"/>

              </div>
              <p>
                {new1.description > 100
                  ? `${news.description.substring(0,100)}...`
                  : new1.description
                }
              </p>
              <div className='provider-container'>
                <div>
                  <Text>{moment(new1.createdAt).startOf('ss').fromNow()}</Text>
                </div>

              </div>

            </a>

          </Card>
        </Col>

      ))}
    </Row>

  )
}

export default News

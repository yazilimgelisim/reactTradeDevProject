import { AllContext } from '../../../context/AllContext'
import { useContext } from 'react';
import { Row, Col, Card, Button, Badge } from 'react-bootstrap'



const List = () => {
  const { state, dispatch } = useContext(AllContext)
  const handleBuy = (id, price) => {
    dispatch({ type: 'buyProduct', 'price': price, 'id': id })
  }
  const howMany = (id) => {
    let data = state.basket.find((content) => content.id === id)
    if (data === undefined) {
      return 0
    }
    else {
      if (data.count >= 1) {
        return data.count
      }
      else {
        return 0
      }
    }
  }

  const howMuch = (price) => {
    if (state.money >= price) {
      return false
    }
    else {
      return true
    }
  }

  return (
    <Row className='g-3 mx-auto'>
      {state.products.map((product) => (
        <Col key={product.id} xs='9' sm='6' md='4' lg='3' className='col-12 d-flex justify-content-center'>
          <Card className='mx-4 bg-light position relative'>
            <div className='position-absolute'>
              {state.basket.map((content) => content.id === product.id ? <Badge className='bg-primary translate-middle'>{content.count}</Badge> : null)}
            </div>
            <Card.Img variant="top" src={product.imageURL} />
            <Card.Body>
              <Card.Title className='text-center mb-2'>
                {product.name}</Card.Title>

              <div className="btn-group d-flex jusify-content-center">
                <Button variant="warning" onClick={() => handleBuy(product.id, product.price)} disabled={howMuch(product.price)}>Add</Button>
                <Button variant='light' className='fw-bold' disabled>${product.price}</Button>

                <Button variant='success' onClick={() => dispatch({ type: 'sellProduct', 'id': product.id, 'price': product.price })} disabled={howMany(product.id) === 0 ? true : false}>
                  Sell
                </Button>

              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default List
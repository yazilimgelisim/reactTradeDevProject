import { Row, Col, Button } from "react-bootstrap"
import { AllContext } from "../../../context/AllContext"
import { useContext } from "react"





const Total = () => {
    const { state, dispatch } = useContext(AllContext)
    let text = 'You have not purchased any items'
    const getMoney = (id) => {
        let data = state.products.find((content) => content.id === id)
        return data.price
    }
    return (
        <Row className="mx-auto px-3 w-100 my-4 mb-5">
            <Col className="col-6">
                <hr />
                {state.basket.length === 0 ? text :
                    <>
                        <Row>
                            {state.basket.map((content) => (
                                <Col className="col-10 mx-auto fs-5">
                                    <div className="d-flex">
                                        <div style={{ width: '100px' }}>
                                            {content.count}
                                            &times;
                                            {getMoney(content.id)}
                                        </div>
                                        <span className="px-3">
                                            =
                                        </span>
                                        <span className="ms-auto me-3 fw-bold">
                                            ${content.count * getMoney(content.id)}
                                        </span>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                        <Row>
                            <Col className="col-12 ms-auto">
                                <span>&#x2b;</span>
                                <hr className="mt-0" />
                                <div className="text-end pe-5 fw-bold fs-4">${1000 - state.money}
                                </div>
                            </Col>
                        </Row>
                    </>
                }
            </Col>


            <Col className="col-6 border-start border-1 border-black">
                <hr />
                <Row>
                    <Col className="col-6 text-center">
                        <Button variant="danger" onClick={()=>dispatch({type:'returnInitial'})}>
                            Cancel
                        </Button>
                    </Col>
                    <Col className="col-6 text-center">
                        <Button disabled={state.basket.length < 1 ? true : false} onClick={()=>dispatch({type:'modalOpen'})}>
                            Buy now
                        </Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default Total
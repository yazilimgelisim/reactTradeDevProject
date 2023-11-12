import { useReducer, createContext, useEffect } from "react";
import data from '../data.json'


export const AllContext = createContext(false)



const AllContextProvider = (props) => {
    const addBasket = (state, action) => {
        let newArray = []
        if (state.money < action.price) {
            newArray = [...state.basket]
        }
        else {
            let control = false
            control = state.basket.find((content) => content.id === action.id)
            if (control === undefined) {
                newArray = [...state.basket, { id: action.id, count: 1 }]
            }
            else {
                control.count++
                newArray = state.basket.filter((content) => content.id !== action.id)
                newArray.push(control)
            }
        }
        return newArray
    }


    const controlValue = (state, id, price) => {
        let value = state.basket.find((content) => content.id === id)
        if (value === undefined) {
            return state.money
        }
        else {
            if (value.count === 0) {
                console.log('0 adet var bu nedenle satış yok!')
                return state.money
            }
            else {
                console.log(value.count)
                console.log('elimizde halen ürün var satılabilir.')
                return state.money + price
            }
        }
    }

    const sellBasket = (state, id) => {
        let value = state.basket.find((content) => content.id === id)
        let newArray = []
        if (value === undefined) {
            return state.basket
        }
        else {
            newArray = state.basket.filter((content) => content.id !== id)
            if (value.count > 1) {
                value.count = value.count - 1
                newArray.push(value)
            }
            return newArray
        }
    }




    const reducer = (state, action) => {
        switch (action.type) {
            case 'buyProduct':
                return {
                    ...state,
                    money: state.money < action.price ? state.money : state.money - action.price,
                    basket: addBasket(state, action)
                }

            case 'sellProduct':
                return {
                    ...state,
                    money: controlValue(state, action.id, action.price),
                    basket: sellBasket(state, action.id)
                }

            case 'returnInitial':
                return {
                    ...state,
                    money: 1000,
                    basket: []
                }

            case 'modalOpen':
                return {
                    ...state,
                    modalShow: true
                };

            case 'modalClose':
                return {
                    ...state,
                    modalShow: false
                };

            default:
                return state;
        }
    }
    const initialState = { money: 1000, products: data, basket: [], modalShow: false }
    const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
    }, [state.basket])
    return (
        <AllContext.Provider
            value={{
                'state': state,
                'dispatch': dispatch
            }}
        >
            {props.children}
        </AllContext.Provider>
    )
}

export default AllContextProvider
import './header.css'
import { AllContext } from '../../../context/AllContext'
import { useContext } from 'react'

let textReverse = (str) => {
  str = str.split('').reverse().join('');
  return str
}


let moneyFormat = (value) => {
  value = value.toFixed(2)
  value = String(value)
  value = textReverse(value)
  let arrays = []
  for (let i = 0; i < value.length; i = i + 3) {
    arrays.push(value.slice(i, i + 3))
    if (i + 3 < value.length) {
      if(i !== 0){
        arrays.push('.')
      }
    }
  }

  arrays = arrays.map((cell) => textReverse(cell))
  let newValue = arrays.reverse().join('')
  return newValue
}



const Header = () => {
  const { state } = useContext(AllContext)

  return (
    <div className='header'>
      <h4>There are <b>${moneyFormat(state.money)}</b> for buying!</h4>
    </div>
  )
}


export default Header
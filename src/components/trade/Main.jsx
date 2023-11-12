import Header from './header/Header'
import List from "./list/List"
import AllContextProvider from '../../context/AllContext'
import Total from './total/Total'
import BuyModal from './modal/BuyModal'

const Main = () => {
    return (
        <AllContextProvider>
            <Header />
            <List />
            <Total/>
            <BuyModal/>
        </AllContextProvider>
    )
}

export default Main
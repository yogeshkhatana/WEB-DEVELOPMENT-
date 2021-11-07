import  React , {useState} from 'react'
import { connect } from 'react-redux'
import { buyBat,sellBat } from './redux/bats/BatActions'

function BatContainer(props) {
    const [ number , setNumber ] = useState(0);
    console.log('bat render');
    return (
        <div>
            <h2>Number Of Bats - {props.numOfBats}</h2>
            <input type = 'number' value = {number} onChange = {e => setNumber(e.target.value)}/>
            <button onClick = {() => {props.buyBat(number)}}>BUY {number} BAT</button>    
            <button onClick = {() => {props.sellBat(number)}}>SELL {number} BAT</button>    
        </div>
    )
}

const mapStateToProps = state =>{
    return{
        numOfBats : state.bat.numOfBats,
    }
}

const mapDispatchToProps = dispatch =>{
    //passing argument number
    return{
        buyBat : (number) => dispatch(buyBat(number)),
        sellBat : (number) => dispatch(sellBat(number)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(BatContainer)

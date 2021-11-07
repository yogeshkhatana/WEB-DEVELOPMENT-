import React from 'react'
import {buyBall} from './redux/balls/BallActions';
import {connect} from 'react-redux';

function BallContainer(props) {
    // console.log(props);
    console.log("ball render");
    return (
        <div>
            <h2>Number Of Balls:- {props.numOfBalls} </h2>
            <button onClick={props.buyBall}> Buy Balls </button>
        </div>
    )
}
//First method for reading from global state
//whatever mapStateToProps returns added to component(Here BallContainer) props.
const mapStateToProps = state=>{
    console.log(state);
    return {
        numOfBalls : state.ball.numOfBalls
    }
}

//This method is used to make chnages in global store so here we doing dispatch of actions.
const mapDispatchToProps = dispatch=>{
    return{
        buyBall : () => dispatch(buyBall()),
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(BallContainer)
//connect is used to work mapStateToProps and mapDispatchToProps methods.
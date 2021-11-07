//Reducer is  a pure function

const initialState ={
    numOfBalls : 20,
}
const BUY_BALL = 'BUY_BALL';
const BallReducer = ( state = initialState , action )=>{
    switch(action.type)
    {
        case BUY_BALL : 
            return {...state, numOfBalls : state.numOfBalls-1 }   //Here we using spread operator to make it immutable bcoz reducer is a pure function.
        default : 
            return state;    
    }

}

export default BallReducer;
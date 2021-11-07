const BUY_BAT = 'BUY_BAT';
const SELL_BAT = 'SELL_BAT';
const initialState = {
    numOfBats : 20,
}

const BatReducer = (state = initialState , action)=>
{
  switch(action.type)
  {
      case BUY_BAT :
          return {...state , numOfBats : state.numOfBats-action.payload}

      case SELL_BAT :
          return {...state , numOfBats : Number(state.numOfBats) + Number(action.payload)}    
      
      default :
        return state    
  }
}

export default BatReducer;
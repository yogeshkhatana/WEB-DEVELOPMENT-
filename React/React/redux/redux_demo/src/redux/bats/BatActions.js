const BUY_BAT = 'BUY_BAT';

//Here we given a default args i.e number = 1 and using it in payload fo changing it according to requirements. 
export const buyBat = (number = 1) =>{
  return{
      type : BUY_BAT,
      payload : number,
  }
}

const SELL_BAT = "SELL_BAT"
export const sellBat =(number =1) =>{
    return{
        type : SELL_BAT,
        payload : number,
    }
}
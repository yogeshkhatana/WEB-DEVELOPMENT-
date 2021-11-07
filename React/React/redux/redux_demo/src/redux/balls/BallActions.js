//Action creators :- return an action(object).
//Bcoz we can't directly write actions we have to use functions i.e : action creators.

const BUY_BALL = 'BUY_BALL';
//if i need to make a chnage i can do it here and it will get reflected everywhere
export const buyBall = () =>{
    return {
        type : BUY_BALL,
    }
}


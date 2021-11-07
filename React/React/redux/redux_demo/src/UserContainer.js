import React,{useEffect} from 'react'
import {connect} from 'react-redux'
import { fetchUsers } from './redux/users/userAction'

function UserContainer({userData,fetchUsers}) {//using destructuring to get userData and fetchUsers that are props

    useEffect(()=>{
        fetchUsers();
    },[])

    return (
       userData.loading == true ? <h2>Loading</h2> : userData.error ? <h2>{userData.error}</h2> :(
           <div>
               {
               //if using map add key    
               userData.users  && userData.users.map(user=>(
                   <p key={user.id}>{user.name}</p>
               ))

               }
           </div>
       )
    )
}

const mapStateToProps = state=>{
    return{
        userData : state.user
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        fetchUsers : ()=>dispatch( fetchUsers() )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserContainer)

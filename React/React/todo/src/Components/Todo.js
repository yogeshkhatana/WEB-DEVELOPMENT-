import React, { Component } from 'react'

//Here in react class first letter should be capital
export default class Todo extends Component {
    // here in class Component we can write members without let,var,const it handles by ownself
    
    constructor(props)
    {
        super(props);
        this.state={
            tasks:[{id:1,txt:'First Task'},{id:2,txt:'Second Task'},{id:3,txt:'Third Task'}],
            currTask:''
        }    
    }
    handleChange=(e)=>{
        let cval=e.target.value;
        this.setState({currTask:cval})
    }
    handleClick=()=>{
        console.log(this.state.currTask);
       
        // this.state.tasks.push({id:this.state.tasks.length+1,txt:this.state.currTask});
        // this.state.currTask=''

        //   USE SETSTATE ALWAYS
        //use spread operator to make array on different address best practice and this is correct way
        let nta=[...this.state.tasks,{id:this.state.tasks.length+1,txt:this.state.currTask}]
        this.setState({
            tasks:nta,
            currTask:''
        })
    }
    onDelete=(id)=>{
        let nta=this.state.tasks.filter(obj=>{
            return obj.id!=id
        })
        this.setState({
            tasks:nta
        })
    }
    // State change krte hi render call hota hai
    render() {
        console.log('Rendered');
        return (
            <div>
                <div className='input-container'>
                    {/* Here we are using className instead of class bcoz its rule bcoz we used class above */}
                     <input onChange={this.handleChange} value={this.state.currTask} type='text'></input>
                     {/* onChange and onClick are event listeneter here */}
                     <button onClick={this.handleClick}>ADD</button>
                </div>
                <div className='class-list'>
                    <ul>
                        {//use curly braces when including js in jsx or when using this
                            this.state.tasks.map(task=>(
                                <li key={task.id}>
                                    {/* in case of map we have to give key for uniquely identify */}
                                    <h1>{task.txt}</h1>
                                    <button onClick={()=>this.onDelete(task.id)}>Delete</button>
                                    {/* For binding this we are using arrow function */}
                                </li>
                               ))
                        }
                    </ul>
                </div>
            </div>
        )
    }
}




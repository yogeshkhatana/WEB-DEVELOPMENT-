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
            <>
               <InputComponent currTask={this.state.currTask} handleChange={this.handleChange} handleClick={this.handleClick}/>
               <TaskList tasks={this.state.tasks} onDelete={this.onDelete} /> 
               {/* Passing parameters(arr,function,etc) to components from parent component */}
            </>
        )
    }
}




class InputComponent extends Component {
    constructor(props)
    {
        super(props);
    }
    render() {
        return (
            <div className='input-container'>
                    
                     <input  type='text' value={this.props.currTask} onChange={this.props.handleChange} ></input>
                     
                     <button onClick={this.props.handleClick}>ADD</button>
                </div>
        )
    }
}

class TaskList extends Component {
    constructor(props)
        {
            super(props);
        }
    render() {
        
        return (
            <div className='class-list'>
                    <ul>
                        {
                            this.props.tasks.map(task=>(
                                <li key={task.id}>
                                   
                                    <h1>{task.txt}</h1>
                                    <button onClick={()=>this.props.onDelete(task.id)} >Delete</button>
                                    
                                </li>
                               ))
                        }
                    </ul>
                </div>
        )
    }
}

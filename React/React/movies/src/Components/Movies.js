//Temporary operation-> eg-> searching
//Permanent operation -> eg-> Add,Delete

import React, { Component } from 'react'//if default export
import {getMovies} from './getMovies'
import './movies.css'
// bcoz get movies is not a default export so we have to use destructuring for importing



export default class Movies extends Component {
    constructor(props)
    {
      super(props);
      this.state={
          movies:getMovies(),
          currSearchText:'',
          filterMovies:getMovies()
      }
    }
    onDelete=(id)=>{
        let filterMovies=this.state.movies.filter(movieObj=>{
            return movieObj._id!=id
        })
        this.setState({
            movies:filterMovies
            
        })
    }
    handleChange=(e)=>
    {
        let task=e.target.value;
        this.setState({currSearchText:e.target.value});

        //Rather than making multiple states make less states and make only permanent states for temporary operation use render


        // if(task=='')
        // {
        //     this.setState({
        //         filterMovies:this.state.movies,
        //         currSearchText:''
        //     })
        //     return;
        // }
        // let filteredArr=this.state.movies.filter(movieObj=>{
        //     let title=movieObj.title.trim().toLowerCase();//trim for removing extra spaces in front and back only
        //     console.log(title);
        //     return title.includes(task.toLowerCase());
        // })
        // this.setState({
        //     filterMovies:filteredArr,
        //     currSearchText:task
        // })
    }
    render() {
        let {movies,currSearchText}=this.state;
        let filterMovies=[];
        if(currSearchText!='')
        {
            filterMovies=movies.filter(movieObj=>{
                    let title=movieObj.title.trim().toLowerCase();//trim for removing extra spaces in front and back only
                    
                    return title.includes(currSearchText.toLowerCase());
            })
        }
        else
        {
            filterMovies=movies;
        }
        return (
            <div className='row'>
                <div className='col-3'>
                    <h1 className='myclass'>Hello</h1>
                </div>
                <div className='col-9'>
                    <input type='text' value={this.state.currSearchText} onChange={this.handleChange}></input>
                    <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Title</th>
      <th scope="col">Genre</th>
      <th scope="col">
      <i className="fas fa-sort-up"></i>
         Stock
      <i className="fas fa-sort-down"></i>   
      </th>
      <th scope="col">
      <i className="fas fa-sort-up"></i>
         Rate
      <i className="fas fa-sort-down"></i>   
      </th>
    </tr>
  </thead>
  <tbody>   
    
     {/* {bcoz we have to write jsx code in curly braces */
                // we put in brackets that we want to return that is->movieObj=>(
                    filterMovies.map(movieObj=>(
                        // in tr we have to write the scope
                        <tr scope='row' key={movieObj._id}>
                            <td></td>
                             <td>{movieObj.title}</td>
                             <td>{movieObj.genre.name}</td>
                             <td>{movieObj.numberInStock}</td>
                             <td>{movieObj.dailyRentalRate}</td>
                             <td><button type='button' className="btn btn-danger" onClick={()=>this.onDelete(movieObj._id)}>Delete</button></td>
      
                        </tr>
                      ))
                     }

  </tbody>
</table>
                </div>
               
            </div>
        )
    }
}


// just converting below code to a table using bootstrap

////////////*************************** */
//  {/* {bcoz we have to write jsx code in curly braces */
                // we put in brackets that we want to return that is->movieObj=>(
                    // movies.map(movieObj=>(
                    //     <div className='movie-item' key={movieObj._id}>
                    //          <span>{movieObj.title}</span>
                    //          <span>{movieObj.genre.name}</span>
                    //          <span>{movieObj.numberInStock}</span>
                    //          <span>{movieObj.dailyRentalRate}</span>
                    //          <button onClick={()=>this.onDelete(movieObj._id)}>Delete</button>
      
                    //     </div>
                    //   ))
                    //  }
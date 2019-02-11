import React, { Component } from 'react';
import axios from 'axios';
import  classes from './searchResult.module.css';
import TableList from './table';


class SearchResults extends Component {

    constructor(props){
        super(props)
        this.state = {
            results:[],
            query:""
        }
    }

    change = e => {
        this.setState({
            [e.target.name]: e.target.value.toLowerCase()
        });
    }

    getData = (query) =>{
        if(query.length < 3){
            alert("Enter atleast 3 letters!");
        }
        else{
            axios.get(`http://localhost:3005/search/${query}`)
            .then((response) => {
                console.log("response", response);
                if(response.data.length == 0){
                    alert("No result found!")
                }
                this.setState({
                    results:response.data
                })
            })
            .catch((error) => {
                console.log("Error while getting the result--- ", error);
            })
        }
        
    }

    render(){
        let list = this.state.results.map((data, index) =>{
            return (
                <tr key={index}>
                    <td>{index}</td>
                    <td>{data}</td>
                </tr>
            )
        })

        return(
            <div>
                <div className={classes.wrapper}>
                    <div className={classes.container}>
                        <input type="text" 
                            className={classes.input} 
                            placeholder="What are you looking for?" 
                            name="query"
                            onChange = { e => this.change(e) }
                            />
                        <input type="button" 
                            value="search" 
                            className={classes.close_btn} 
                            onClick = {() => this.getData(this.state.query)}/>
                    </div>
                <hr />
                <div className={classes.results}>
                    <TableList list = {list}></TableList>
                </div>

                </div>
            </div>
        )
    }
}

export default SearchResults;

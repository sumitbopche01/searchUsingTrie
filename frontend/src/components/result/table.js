import React , {Component} from 'react';

import classes from './searchResult.module.css';

class TableList extends Component {

    constructor(props){
        super(props);
    }
    
    render(){
        return(
            <div>
                <div className ={classes.table}> 
                        <h1 >Search results</h1>      
                        <table>
                            <tbody>
                                <tr>
                                    <th>Index</th>
                                    <th>Matched Names</th>
                                </tr>
                                    {this.props.list}     
                            </tbody>
                        </table>
                </div>
            </div>
            );
    }
}

export default TableList;

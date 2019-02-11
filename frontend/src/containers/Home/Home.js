import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import SearchResult from '../../components/result/searchResult';

class SearchMain extends Component {
    render(){
        return (
            <Aux>
                <SearchResult />
            </Aux>
        )
    }
}

export default SearchMain;

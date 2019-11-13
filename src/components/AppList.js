import React, { Component } from 'react';
import ListFrame from './ListFrame'
import { observer, inject } from 'mobx-react';

class AppList extends Component {

    componentDidMount() {
        let store = this.props.AppStore;
        // const query = queryString.parse(this.props.location.search);
        // console.log(query)
        store.getTodoList();
        // console.log('data >> ', data);
        // console.log(store.articles)
    }
    menuName = "미결함"

    linkUrl = "/app/todolist";


    render() {
        const { menuName, linkUrl } = this;
        const { todolist, headCells } = this.props.AppStore;
        // console.log('articles', articles);
        return (
            <div>
                <ListFrame menuName={menuName} linkUrl={linkUrl} rows={todolist} headCells={headCells} />
            </div>
        );
    }
}

export default inject('AppStore')(observer(AppList));
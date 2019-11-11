import React, { Component } from 'react';
import ListFrame from './ListFrame'
import queryString from "query-string";
import { observer, inject } from 'mobx-react';

class BbsList extends Component {

    componentDidMount() {
        let store = this.props.ArticleStore;
        const query = queryString.parse(this.props.location.search);
        // console.log(query)
        store.getArticle(query.bbs_id);
        // console.log('data >> ', data);
        // console.log(store.articles)
    }
    menuName = "문서함22"

    linkUrl = "/bbs/view?bbsid=";


    render() {
        const { menuName, linkUrl } = this;
        const { articles, headCells } = this.props.ArticleStore;
        // console.log('articles', articles);
        return (
            <div>
                <ListFrame menuName={menuName} linkUrl={linkUrl} rows={articles} headCells={headCells} />
            </div>
        );
    }
}

export default inject('ArticleStore')(observer(BbsList));
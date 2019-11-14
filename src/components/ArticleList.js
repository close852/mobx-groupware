import React, { useState, useCallback, useEffect } from 'react';
import ListFrame from './ListFrame'
import { observer, inject } from 'mobx-react';
import axios from 'axios'

function BbsList({ location, match, ArticleStore }) {

    // componentDidMount() {
    //     let store = this.props.ArticleStore;
    // const query = queryString.parse(location.search);
    //     // console.log(query)
    //     store.getArticleList(query.bbs_id);
    //     // console.log('data >> ', data);
    //     // console.log(store.articles)
    // }
    const [articleData, setArticleData] = useState([])


    //    console.log('match.params.id', match.params.id)

    const getArticleFetchUrl = useCallback(() => {
        return axios.get(`/api/article?bbs_id=${match.params.id}`);
    }, [match.params.id]);  // ✅ 콜백 deps는 OK


    const createData = (id, bbsname, title, username, regdate) => {
        return { id, bbsname, title, username, regdate };
    }
    useEffect(() => {
        const data = getArticleFetchUrl();
        data.then(res => {
            console.log('bbsData > res.data', res.data)
            let articleList = res.data.map(article => (
                createData(article.article_id, article.bbsname, article.title, article.username, article.regdate)
            ))
            setArticleData(articleList)
        })

        // ... 데이터를 불러와서 무언가를 한다 ...
    }, [getArticleFetchUrl]); // ✅ 이펙트의 deps는 OK

    const menuName = "문서함22"

    const linkUrl = "/article/";

    // const { articles, headCells } = this.props.ArticleStore;
    // console.log('articles', articles);
    return (
        <div>
            <ListFrame menuName={menuName} linkUrl={linkUrl} rows={articleData} headCells={ArticleStore.headCells} />
        </div>
    );
}

export default inject('ArticleStore')(observer(BbsList));
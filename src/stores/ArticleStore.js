/* store/viewStore.js */
import { decorate, observable, action } from 'mobx';
import axios from 'axios';

class ArticleStore {
    articles = [];
    article = {};

    headCells = [
        { id: 'bbsname', numeric: false, disablePadding: false, label: '게시판명', minWidth: '100px', align: 'center' },
        { id: 'title', numeric: false, disablePadding: false, label: '제목', minWidth: '500px', align: 'left' },
        { id: 'username', numeric: false, disablePadding: false, label: '게시자', minWidth: '120px', align: 'center' },
        { id: 'regdate', format: 'date', numeric: false, disablePadding: false, label: '게시일', minWidth: '120px', align: 'center' },
    ];
    createData = (id, bbsname, title, username, regdate) => {
        return { id, bbsname, title, username, regdate };
    }

    getArticleList = (bbs_id) => {
        // console.log('getArticles > ' + bbs_id)
        axios.get(`/api/article?bbs_id=${bbs_id}`)
            .then(res => {
                // console.log('getArticles > ', res.data);
                // this.setArticle(res);
                // this.articles = res.data;
                this.articles = res.data.map(article => (
                    this.createData(article.article_id, article.bbsname, article.title, article.username, article.regdate)
                ))
            })
    }
    getArticle = async (article_id) => {
        // console.log('getArticles > ' + bbs_id)
        let data = await axios.get(`/api/article/${article_id}`)
            .then(res => {
                this.article = res.data[0];
                console.log('res.data[0]', res.data, res.data[0])
                // this.articles = res.data.map(article => (
                //     this.createData(article.article_id, article.bbs_id, article.title, article.user_id, article.regdate)
                // ))
                return res.data[0];
            })

        return data;
    }

}

decorate(ArticleStore, {
    articles: observable,
    article: observable,
    headCells: observable,
    getArticleList: action,
    getArticle: action,

})

export default ArticleStore;

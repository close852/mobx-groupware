/* store/viewStore.js */
import { decorate, observable, action } from 'mobx';
import axios from 'axios';

class ArticleStore {
    articles = [];
    headCells = [
        { id: 'no', numeric: false, disablePadding: true, label: '#', minWidth: '10px', align: 'center' },
        { id: 'bbsname', numeric: false, disablePadding: false, label: '게시판명', minWidth: '100px', align: 'center' },
        { id: 'title', numeric: false, disablePadding: false, label: '제목', minWidth: '500px', align: 'left' },
        { id: 'writer', numeric: false, disablePadding: false, label: '게시자', minWidth: '120px', align: 'center' },
        { id: 'writedate', numeric: false, disablePadding: false, label: '게시일', minWidth: '120px', align: 'center' },
    ];

    getArticle = (bbs_id) => {
        // console.log('getArticles > ' + bbs_id)
        axios.get(`/api/article?bbs_id=${bbs_id}`)
            .then(res => {
                // console.log('getArticles > ', res.data);
                // this.setArticle(res);
                // this.articles = res.data;
                this.articles = res.data.map(article => (
                    this.createData(article.article_id, '', article.title, article.user_id, article.writedate)
                ))
            })
    }
    createData = (id, bbsname, title, writer, writedate) => {
        let no = id;
        return { id, no, bbsname, title, writer, writedate };
    }

}

decorate(ArticleStore, {
    articles: observable,
    headCells: observable,
    getArticle: action,
})

export default ArticleStore;

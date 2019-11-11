import { decorate, observable, action } from 'mobx';
import axios from 'axios';

class LeftMenuStore {
    leftMenu = [];
    headCells = [
        { id: 'no', numeric: false, disablePadding: true, label: '#', minWidth: '10px', align: 'center' },
        { id: 'bbsname', numeric: false, disablePadding: false, label: '게시판명', minWidth: '100px', align: 'center' },
        { id: 'title', numeric: false, disablePadding: false, label: '제목', minWidth: '500px', align: 'left' },
        { id: 'writer', numeric: false, disablePadding: false, label: '게시자', minWidth: '120px', align: 'center' },
        { id: 'writedate', numeric: false, disablePadding: false, label: '게시일', minWidth: '120px', align: 'center' },
    ];

    getLeftMenu = (group_id) => {
        // console.log('getArticles > ' + group_id)
        axios.get(`/api/menu?group_id=${group_id}`)
            .then(res => {
                // console.log('getLeftMenu > ', res.data);
                // this.setArticle(res);
                // this.articles = res.data;
                // this.leftMenu = res.data.map(article => (
                //     this.createData(article.article_id, '', article.title, article.user_id, article.writedate)
                // ))
                this.leftMenu = res.data;
            })
    }
}
decorate(LeftMenuStore, {
    articles: observable,
    headCells: observable,
    getLeftMenu: action,
})

export default LeftMenuStore;

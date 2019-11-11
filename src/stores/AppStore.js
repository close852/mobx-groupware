/* store/viewStore.js */
import { decorate, observable, action } from 'mobx';
import axios from 'axios';

class AppStore {
    todolist = [];
    inglist = [];
    endlist = [];

    headCells = [
        { id: 'no', numeric: false, disablePadding: true, label: '#', minWidth: '10px', align: 'center' },
        { id: 'formname', numeric: false, disablePadding: false, label: '양식명', minWidth: '100px', align: 'center' },
        { id: 'title', numeric: false, disablePadding: false, label: '제목', minWidth: '500px', align: 'left' },
        { id: 'draftuser', numeric: false, disablePadding: false, label: '기안자', minWidth: '120px', align: 'center' },
        { id: 'draftdate', numeric: false, disablePadding: false, label: '기안일', minWidth: '120px', align: 'center' },
    ];

    getTodoList=()=>{
        axios.get(`/api/app/todolist`)
            .then(res => {
                this.articles = res.data.map(article => (
                    this.createData(article.article_id, '', article.title, article.user_id, article.writedate)
                ))
            })

    }
    getIngList=()=>{
        axios.get(`/api/app/inglist`)
        .then(res => {
            this.articles = res.data.map(article => (
                this.createData(article.article_id, '', article.title, article.user_id, article.writedate)
            ))
        })

    }
    getEndList=()=>{
        axios.get(`/api/app/endlist`)
        .then(res => {
            this.articles = res.data.map(article => (
                this.createData(article.article_id, '', article.title, article.user_id, article.writedate)
            ))
        })

    }
    createData = (id, formname, title, draftuser, draftdate) => {
        let no = id;
        return { id, no, formname, title, draftuser, draftdate };
    }

}

decorate(AppStore, {
    todolist: observable,
    inglist: observable,
    endlist: observable,
    headCells: observable,
    getTodoList: action,
    getIngList: action,
    getEndList: action,
})

export default AppStore;

import React, { Component } from 'react';
import queryString from 'query-string';
import axios from 'axios'
import AppButton from './AppButton';
class AppView extends Component {
     query = queryString.parse(this.props.location.search);
     content="";
     state ={
         content:''
     }
    async componentDidMount() {
        console.log('query',this.query)
        const result = await axios.get(`/api/app?formid=${this.query.formid}&appid=${this.query.appid}`)
                            .then(res => res.data)
                            .catch( e => e.response.data);
        // this.content = result.data.content;
        if(result.error){
            alert(result.error);
        }else{
            console.log(result, result.query,result.content);
            this.setState({
                content : result.content
            })
        }
    }

    render() {
        const {content} = this.state;
        console.log('content',content);
        return (
            <div>
                <AppButton />
                <div id="appContent" dangerouslySetInnerHTML={{__html:content}}/>
            </div>
        );
    }
}

export default AppView;
import React from 'react'
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        display:'flex',
        'alignItems': 'center',
        'justifyContent': 'center',
    },
}));


function SearchBar({ srchTarget, setSrchTarget, keyword, setKeyword, handleSearchData}) {
    const classes = useStyles();


    const handleTargetChange = e => {
        console.log('e.target.value > ', e.target.value)
        setSrchTarget(e.target.value);
    }

    const handleKeywordChange = e => {
        setKeyword(e.target.value);
    }

    const search = () => {
        // axios.get('/api/org/find', formData).then(data => {
        console.log('srchTarget,keyword', srchTarget, keyword)
        axios.get(`/api/org/find?srchTarget=${srchTarget}&keyword=${keyword}`).then(res => {
            console.log('data!! > ', res,res.data)
            handleSearchData(res.data)
        })
    }
    return (
        <div className={classes.root}>
            <FormControl >
                <Select
                    native
                    
                    id="srchTarget"
                    value={srchTarget}
                    onChange={handleTargetChange}
                >
                    <option value="username" >이름</option>
                    <option value="login_id">로그인ID</option>
                </Select>
            </FormControl>
            &nbsp;
            <TextField  id="keyword" margin="normal" value={keyword} onChange={handleKeywordChange} />
            <Button variant="contained" color="secondary" onClick={search}>검색</Button>
        </div>
    )
}

export default SearchBar

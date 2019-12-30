import React from 'react'
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios'
function SearchBar({ srchTarget, setSrchTarget, keyword, setKeyword }) {


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
            console.log('data!! > ', res.data)
        })
    }
    return (
        <div>
            <FormControl variant="outlined" >
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
            <TextField id="keyword" variant="outlined" value={keyword} onChange={handleKeywordChange} />
            <Button variant="contained" color="secondary" onClick={search}>검색</Button>
        </div>
    )
}

export default SearchBar

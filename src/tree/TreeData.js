import React from 'react'
import TreeItem from '@material-ui/lab/TreeItem';

function TreeData({ data, children, onHandle }) {
    //            id: 1, label: 'Applications1', depth: 1, sort: 1, ref: 1,
    const treeMap = children && children.map(data => <div onClick={()=>{onHandle(data.id)}} ><TreeData key={data.id} data={data} >{data.children}</TreeData></div>)
    console.log(treeMap)
    return (
        <TreeItem key={data.id} nodeId={data.id} label={data.label}>
            {treeMap}
        </TreeItem>

    )
}

export default TreeData

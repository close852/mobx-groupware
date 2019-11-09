import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeData from './TreeData'
const useStyles = makeStyles({
    root: {
        height: 216,
        flexGrow: 1,
        maxWidth: 400,
    },
});

export default function TreeNav({items, onHandle}) {
    const classes = useStyles();
    const onHandledTree =(id)=>{
        onHandle(id);
    }
    const treeData = items.map((data) => (<TreeData key={data.id} data={data} onHandle={onHandledTree}>{data.children}</TreeData>));
    return (
        <TreeView
            className={classes.root}
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            defaultExpanded={['*']}
            >
            {treeData}
        </TreeView>
    );
}

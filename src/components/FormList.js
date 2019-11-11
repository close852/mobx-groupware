import React,{useState} from 'react';
import {NavLink} from 'react-router-dom'
// import PropTypes from 'prop-types';
import {  makeStyles } from '@material-ui/core/styles';
import TreeNav from 'tree/TreeNav'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';



/*RIGHT TREE DATA */
const items = [
    {
        id: '*', label: '문서함', depth: 1, sort: 1, ref: '10',
        children: [
            {
                id: '11', label: '일반양식', depth: 1, sort: 1, ref: '10',
            },
            {
                id: '12', label: '근태양식', depth: 1, sort: 1, ref: '10',
            }
        ]
    }
];

/*LEFT 테이블 HEADER */
const columns = [
    { id: 'formgroup', label: '양식함', align: 'center', minWidth: 50 },
    { id: 'formname', label: '양식명', align: 'center', minWidth: 200 },
    { id: 'description', label: '설명', align: 'center', minWidth: 400 },
];

/* LEFT 테이블 DATA*/
const rows = [
    createData('FORM1','11','일반양식','기안문', ''),
    createData('FORM2','12','근태양식','근태신청서', ''),

];


function createData(formid,groupid,formgroup, formname, description) {
    return { formid,groupid,formgroup, formname, description };
}


const drawerWidth = 240;
const drawerHeight = 15;

const useStyles = makeStyles(theme => ({
    root: {
        width: `calc(100% - ${drawerWidth}px)`,
        display: 'flex',
        height: `calc(100vh - ${drawerHeight}vh)`,
        flexGrow: 1,
        border: '1px solid black',
        justifyContent: 'space-between'
    },
    tree: {
        border: '1px solid black',
        width:'calc(30%)',
        height:'calc(50%)'

    },
    formlist: {
        border: '1px solid black',
        width:'calc(70%)',
        height:'calc(50%)'
    },
    link:{
        textDecoration:'none',
        color:'black'
    }
}));



function FormList() {
    const classes = useStyles();
    const [group,setGroup] =useState((items[0].children && items[0].children[0].id) || '*');


    const handleForms = (id) => {
        setGroup(id);
    }
    return (
        <div className={classes.root}>
            {/*LEFT*/}
            <div className={classes.tree}>
                <TreeNav items={items} onHandle={handleForms}/>
            </div>
            {/*RIGHT*/}
            <div className={classes.formlist}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {columns.map(column => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.filter(data=>data.groupid === group).map(row => {
                            return (
                                <TableRow hover  tabIndex={-1} key={row.id}>
                                    {columns.map(column => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {
                                                    (column.id==="formname" && 
                                                    <NavLink to={`/app/view?formid=${row.formid}`} className={classes.link}>
                                                        {column.format && typeof value === 'number' ? column.format(value) : value}
                                                    </NavLink>
                                                    ) || (column.format && typeof value === 'number' ? column.format(value) : value)
                                                }
                                                </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
            
        </div>
    );
}

export default FormList
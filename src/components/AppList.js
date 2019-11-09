import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const columns = [
    { id: 'formname', label: '양식명', align: 'left', minWidth: 100 },
    { id: 'title', label: '문서제목', align: 'left', minWidth: 300 },
    {
        id: 'draftuser',
        label: '기안자',
        minWidth: 120,
        align: 'center',
        format: value => value.toLocaleString(),
    },
    {
        id: 'draftdate',
        label: '기안일',
        minWidth: 120,
        align: 'center',
        format: value => value.toLocaleString(),
    },

];


function createData(id, formname, title, draftuser, draftdate) {
    return { id, formname, title, draftuser, draftdate };
}

const rows = [
    createData('1','India', 'IN', 1324171354, 3287263),
    createData('2','China', 'CN', 1403500365, 9596961),
    createData('3','Italy', 'IT', 60483973, 301340),
    createData('4','United States', 'US', 327167434, 9833520),
    createData('5','Canada', 'CA', 37602103, 9984670),
    createData('6','Australia', 'AU', 25475400, 7692024),
    createData('7','Germany', 'DE', 83019200, 357578),
    createData('8','Ireland', 'IE', 4857000, 70273),
    createData('9','Mexico', 'MX', 126577691, 1972550),
    createData('10','Japan', 'JP', 126317000, 377973),
    createData('11','France', 'FR', 67022000, 640679),
    createData('12','United Kingdom', 'GB', 67545757, 242495),
    createData('13','Russia', 'RU', 146793744, 17098246),
    createData('14','Nigeria', 'NG1', 200962417, 923768),
    createData('15','Nigeria', 'NG2', 200962417, 923768),
    createData('16','Brazil', 'BR1', 210147125, 8515767),
    createData('17','Brazil', 'BR2', 210147125, 8515767),
    createData('18','Brazil', 'BR3', 210147125, 8515767),
    createData('19','Brazil', 'BR4', 210147125, 8515767),
    createData('20','Brazil', 'BR5', 210147125, 8515767),
    createData('21','Brazil', 'BR6', 210147125, 8515767),

];

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({

    root: {
        width: `calc(100% - ${drawerWidth}px)`,
    },
    tableWrapper: {
        maxHeight: 400,
        overflow: 'auto',
    },
}));

function AppList() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    function handleChangePage(event, newPage) {
        setPage(newPage);
    }

    function handleChangeRowsPerPage(event) {
        setRowsPerPage(+event.target.value);
        setPage(0);
    }

    return (
        <Paper className={classes.root}>
            <div className={classes.tableWrapper}>
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
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                    {columns.map(column => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
            <TablePagination
                labelRowsPerPage="목록갯수 :"
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                    'aria-label': 'previous page',
                }}
                nextIconButtonProps={{
                    'aria-label': 'next page',
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

export default AppList
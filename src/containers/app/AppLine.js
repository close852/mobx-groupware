import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    marginTop: theme.spacing(3),
    width: '100%',
    overflowX: 'auto',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },
}));

function createData(no, type, name, title, deptname,appdate) {
  return { no, type, name, title, deptname ,appdate};
}

const rows = [
  createData('1', '기안', '최지우', '사원', '개발팀','2019-11-16 10:00'),
  createData('2', '결재', '황미라', '사원', '개발팀','2019-11-16 11:12'),
  createData('3', '합의', '황하리', '사원', '개발팀','2019-11-16 12:32'),
  createData('4', '결재', '신길동', '대리', '개발팀','2019-11-16 14:23'),
];

export default function AppLine() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center">순서</TableCell>
              <TableCell align="center">구분</TableCell>
              <TableCell align="center">성명</TableCell>
              <TableCell align="center">직위</TableCell>
              <TableCell align="center">부서</TableCell>
              <TableCell align="center">결재일</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.no}>
                <TableCell align="center">{row.no}</TableCell>
                <TableCell align="center">{row.type}</TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.title}</TableCell>
                <TableCell align="center">{row.deptname}</TableCell>
                <TableCell align="center">{row.appdate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}

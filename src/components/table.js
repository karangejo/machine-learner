import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import DataTable, { createTheme } from 'react-data-table-component';
import Button from '@material-ui/core/Button';
import TransferList from './transferList';



createTheme('solarized', {
  text: {
    primary: '#268bd2',
    secondary: '#2aa198',
  },
  background: {
    default: '#002b36',
  },
  context: {
    background: '#cb4b16',
    text: '#FFFFFF',
  },
  divider: {
    default: '#073642',
  },
  action: {
    button: 'rgba(0,0,0,.54)',
    hover: 'rgba(0,0,0,.08)',
    disabled: 'rgba(0,0,0,.12)',
  },
});


function TableDisplay(props) {
  const [columns, setColumns] = useState([]);
  const [columnNames, setColumnNames] = useState('');
  const [data, setData] = useState([])
  const [displayData, setDisplayData] = useState(false);
  const [xCol, setXCol] = useState([]);
  const [yCol, setYCol] = useState([]);

  const makeColumns = (colNames) => {
    let columnObjArray = [];
    colNames.forEach((value, index) => {
      let row = {name: value, selector: value, sortable: true};
      columnObjArray.push(row);
    })
    setColumns(columnObjArray);
    setDisplayData(true);
  }

  useEffect(() => {
    console.log(props.data);
    setColumnNames(props.columns)
    setData(props.data);
    makeColumns(props.columns);
  },[setData,props.data,setDisplayData,props.columns,setColumnNames]);



  const setX = (xColumnNames) => {
    setXCol(xColumnNames);
  }

  const setY = (yColumnNames) => {
    setYCol(yColumnNames);
  }

  const runMl = () => {
    props.runMl(xCol,yCol);
  }

  return (
    <Grid container direction="column" justify="center" alignItems="flex-start">
        {displayData ? <DataTable theme="solarized"  columns={columns} data={data}/> : null}
        {displayData ? <TransferList columns={columnNames} setX={setX} setY={setY}/> : null}
        <Button variant="contained" color="primary" onClick={runMl}>
          Run
        </Button>
    </Grid>
  );
}


export default TableDisplay;

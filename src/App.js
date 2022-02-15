import './App.css';
import {React, useCallback, useState} from 'react';
import MaterialTable from '@material-table/core';
import { Select, MenuItem } from '@material-ui/core';
import {observer} from 'mobx-react';
import {makeStyles} from '@material-ui/core'


import theStore from './store';

const useStyles = makeStyles((theme) => ({
  select: {
    width: '100%'
  }
}));

function App() {
  const classes = useStyles();
  const [values, setValues] = useState(theStore.data);

  const columns = [
    {
      title: 'Col1', 
      field: 'col1', 
    },
    {
      title: 'Col2', 
      field: 'col2',
    },
    {
      title: 'Col3', 
      field: 'col3', 
      editComponent: useCallback((tableData) => { 
        return(
          <Select
            label="col3"
            name="col3"
            onChange={handleInputChange}
            className={classes.select}
            value={tableData.rowData.col3}
          >
            <MenuItem value="woo">woo</MenuItem>
            <MenuItem value="world">world</MenuItem>
            <MenuItem value="hello">hello</MenuItem>
          </Select>
        )
      }, [])
    }
  ]

  const handleInputChange = e => {
    const {name, value} = e.target;
    setValues({
      ...values,
      [name]: value
    })
  }

  return (
    <div className="App">
      <MaterialTable
        columns={columns}
        data={values}
        editable={{
          onRowUpdate: (newData, oldData) => 
          new Promise((resolve, reject) => {
            setTimeout(() => {
              console.log("hits here")
              // doesn't hit here 
              resolve();
            })
          })
        }}
      />
    </div>
  );
}

export default observer(App);

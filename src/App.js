import "./App.css";
import { React, useCallback, useState } from "react";
import MaterialTable from "@material-table/core";
import { observer } from "mobx-react";
import { makeStyles } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';

import theStore from "./store";

const useStyles = makeStyles((theme) => ({
  select: {
    width: "100%"
  },
  paper: {
    position: 'absolute', 
    width: '60em', 
    backgroundColor: theme.palette.background.paper, 
    boxShadow: theme.shadows[5], 
    padding: theme.spacing(2), 
    left: '50%', 
    top: '50%',
    transform: 'translate(-50%, -50%)',
  }
}));

function EditColumn ({ value, onChange, rowData, setCurrentRowID, setOpen}) {
  return (
    <span>
      {value}
      <IconButton size="sm" onClick={(event) => {
        setOpen(true);
        setCurrentRowID(rowData.id)
      }}
      >
        <EditIcon />
      </IconButton>
    </span>
  )
}

function App({ store }) {
  const [open, setOpen] = useState(false);
  const [currentRowID, setCurrentRowID] = useState(null);
  const [currentSelectedRowValue, setCurrentSelectedRowValue] = useState(null);
  const [currentSelectedRowId, setCurrentSelectedRowId] = useState(null);
  const classes = useStyles();

  const [columns, setColumns] = useState([
    {
      title: "Col1",
      field: "col1"
    },
    {
      title: "Col2",
      field: "col2"
    },
    {
      title: "Col3",
      field: "col3",
      editComponent: (props) => <EditColumn {...props} setOpen={setOpen} setCurrentRowID={setCurrentRowID} />
    }
  ]);

  const columns2 = [
    {
      title: "Col1",
      field: "col1"
    },
    {
      title: "Col2",
      field: "col2"
    },
    {
      title: "Col3",
      field: "col3",
    }
  ]

  // const body = (
    
  // )

  const body = (
      <div className={classes.paper}>
        <MaterialTable
          columns={columns2}
          data={store.data2}
          options={{
            rowStyle: rowData => ({
              backgroundColor:
              rowData.tableData.id === currentSelectedRowId ? "blue" : "#fff" 
            })
          }}
          onRowClick={(event, rowData) => {
            console.log(`rowdata ${JSON.stringify(rowData.col3)}`)
            setCurrentSelectedRowValue(rowData.col3);
            setCurrentSelectedRowId(rowData.id)
          }}
            
        />
        <button onClick={() => closeAndUpdate()}>close and change</button>
     </div>
    )
  

  const closeAndUpdate = () => {
    theStore.updateValue(currentSelectedRowId, currentSelectedRowValue, currentRowID);
    setOpen(false);
  }

  return (
    <>
      <div className={classes.paper}>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
      </div>
    <div className="App">
      <MaterialTable
        columns={columns}
        data={theStore.data}
        editable={{
          onRowUpdate: (newData) => {
            theStore.updateRow(newData);
            return Promise.resolve();
          }
        }}
      />
    </div>
    </>
  );
}

export default observer(App);

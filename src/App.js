import "./App.css";
import { React, useState } from "react";
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

function App({ store }) {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  function EditColumn({ value, onChange }) {
    return (
      <span>
        {value}
        <IconButton size="sm" onClick={() => setOpen(true)}>
          <EditIcon />
        </IconButton>
      </span>
    )
  }

  const columns = [
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
      editComponent: (props) => <EditColumn {...props} />
    }
  ];

  const body = (
    <div className={classes.paper}>
      <p>hi</p>
    </div>
  )

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
        data={store.data}
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

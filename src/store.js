import { makeAutoObservable } from "mobx";

class store {
  data = [
    {
      id: 1,
      col1: "hello",
      col2: "hello",
      col3: "hello"
    },
    {
      id: 2,
      col1: "world",
      col2: "world",
      col3: "world"
    },
    {
      id: 3,
      col1: "woo",
      col2: "woo",
      col3: "woo"
    }
  ];

  constructor() {
    makeAutoObservable(this);
  }

  amend(newData) {
    console.log(newData);
  }
  updateRow(newRow) {
    this.data = this.data.map((row) => (row.id === newRow.id ? newRow : row));
  }
}

const theStore = new store();
export default theStore;

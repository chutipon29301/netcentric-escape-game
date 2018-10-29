import { observable, action } from "mobx";

class GameStore {
  @observable
  tableField = [];

  @observable
  tableDimension = 5;

  @observable
  player = {
    type: 'prisoner',
    x: 0,
    y: 0
  }
  

  @action.bound
  createTable(row, col) {
	const table = [];
	for (let i = 0; i < row; i++) {
	  const temp = [];
	  for (let j = 0; j < col; j++) {
		temp.push("");
	  }
	  table.push(temp);
	}
	this.tableField=table;
	return this.tableField;
  }

  @action.bound
  walkUp(x,y){
    
  }

}

export default new GameStore();

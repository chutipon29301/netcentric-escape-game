import React, { Component } from "react";
import "./fieldStyle.scss";
import { inject, observer } from "mobx-react";

// function createTable(row, col) {
//   const x = [];
//   for (let i = 0; i < row; i++) {
//     const temp = [];
//     for (let j = 0; j < col; j++) {
//       temp.push("");
//     }
//     x.push(temp);
//   }
//   return x;
// }
@inject("game")
@observer
export default class Field extends React.Component {

  render() {
    return (
      <div className="table-field">
        
        <table>
          {this.props.game.createTable(5, 5).map(row => {
            return (
              <tr>
                {row.map(() => {
                  return <td />;
                })}
              </tr>
            );
          })}
        </table>
      </div>
    );
  }
}

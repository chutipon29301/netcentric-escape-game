import React, { Component } from "react";
import "./style.scss";
import { inject, observer } from "mobx-react";

@inject("gameStore")
@observer
export default class Field extends Component {
  render() {
    return (
      	<div className="table-field">
        	<table>
                <tbody>
                  {
                    this.props.gameStore.gameTable.map((row, index) => (
                      <tr key={index}>
                        {
                          row.map((data, column) => {
                            return (data === "blank") ? <td key={`${index}-${column}`}/> : 
                            (<td key={`${index}-${column}`} >
                              <img src={data} />
                            </td>)
                          })
                        }
                      </tr>
                    ))
                  }
                </tbody>
        	</table>
      	</div>
    );
  }
}

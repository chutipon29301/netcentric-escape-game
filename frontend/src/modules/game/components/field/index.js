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
                    this.props.gameStore.gameTable.map((row) => (
                      <tr>
                        {
                          row.map((data) => {
                            return (data === "blank") ? <td /> : 
                            (<td>
                              <img src={data} />
                            </td>)
                          })
                        }
                      </tr>
                    ))
                  }
                    {
                        // this.props.game.createTable(this.props.game.player)
                        // .map(obj => 
                        //     {return (
                        //         <tr key={obj.x}>
                        //             {obj
                        //                 .map(data =>
                        //                     data === "blank" ? (
                        //                 <td key={data.x} />
                        //                 ) : (
                        //                 <td key={data.y}>
                        //                     <img src={data} />
                        //                 </td>)
                        //                 )
                        //             }
                        //         </tr>);
                        //     }
                        //     )
                    }
                </tbody>
        	</table>
      	</div>
    );
  }
}

import React, { Component } from "react";
import "./fieldStyle.scss";
import { inject, observer } from "mobx-react";

@inject("game")
@observer
export default class Field extends React.Component {
  render() {
    return (
      	<div className="table-field">
        	<table>
				<tbody>{
					this.props.game.createTable(this.props.game.player)
					.map(obj => 
						{return (
							<tr key={obj.x}>
								{obj
									.map(data =>
										data === "blank" ? (
									<td key={data.x} />
									) : (
									<td key={data.y}>
										<img src={data} />
									</td>)
									)
								}
							</tr>);
						}
						)
				}</tbody>
        	</table>
      	</div>
    );
  }
}

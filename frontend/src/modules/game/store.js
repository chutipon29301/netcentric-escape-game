// import { observable, action, computed } from "mobx";

// class GameStore {
//   @observable
//   tableDim = { row: 5, col: 5 };

//   @observable
//   player = {
//     node: [
//       {
//         type: "prisoner",
//         x: 2,
//         y: 3
//       },
//       {
//         type: "warder",
//         x: 0,
//         y: 1
//       },
//       {
//         type: "block",
//         x: 2,
//         y: 1
//       },
//       {
//         type: "tunnel",
//         x: 4,
//         y: 3
//       },
//       {
//         type: "block",
//         x: 4,
//         y: 1
//       },
//       {
//         type: "block",
//         x: 1,
//         y: 4
//       }
//     ]
//   };

//   createTable(info) {
//     const table = [];
//     for (let i = 0; i < 5; i++) {
//       const temp = [];
//       for (let j = 0; j < 5; j++) {
//         const index = info.node.findIndex(obj => obj.x === i && obj.y === j);
//         if (index >= 0) {
//           if (info.node[index].type === "prisoner") {
//             temp.push(
//               "https://www.img.in.th/images/ba4f58903464055c58cff60f6eaeac14.png"
//             );
//           } else if (info.node[index].type === "warder") {
//             temp.push(
//               "https://www.img.in.th/images/d2fa8efb16948bb1fdf72860f3c50e42.png"
//             );
//           } else if (info.node[index].type === "block") {
//             temp.push(
//               "https://www.img.in.th/images/5328946b24463775ee939c0b4aa7c29e.png"
//             );
//           } else if (info.node[index].type === "tunnel") {
//             temp.push(
//               "https://www.img.in.th/images/ad99cc78058995b1a843f1fc01300490.png"
//             );
//           }
//         } else {
//           temp.push("blank");
//         }
//       }
//       table.push(temp);
//     }
//     return table;
//   }

//   @action.bound
//   walkUp() {
//     const newPlayer = { ...this.player };
//     // newPlayer.node[0].x =
//     //   (newPlayer.node[0].x === 0 ? this.tableDim.row : newPlayer.node[0].x) - 1;
//     if (newPlayer.node[0].x > 0) {
//       newPlayer.node[0].x--;
//     }
//     this.player = newPlayer;
//   }

//   @action.bound
//   walkRight() {
//     const newPlayer = { ...this.player };
//     if (newPlayer.node[0].y < this.tableDim.col - 1) {
//       newPlayer.node[0].y++;
//     }
//     this.player = newPlayer;
//   }

//   @action.bound
//   walkDown() {
//     const newPlayer = { ...this.player };
//     // newPlayer.node[0].x = Math.abs(
//     //   (newPlayer.node[0].x + 1) % this.tableDim.row);
//     if (newPlayer.node[0].x < this.tableDim.row - 1) {
//       newPlayer.node[0].x++;
//     }
//     this.player = newPlayer;
//   }

//   @action.bound
//   walkLeft() {
//     const newPlayer = { ...this.player };
//     if (newPlayer.node[0].y > 0) {
//       newPlayer.node[0].y--;
//     }
//     this.player = newPlayer;
//   }
// }

// export default new GameStore();
import { observable, action, autorun, computed } from 'mobx'
import LoginService from "../../services/login-service";
import RoomStore from "../waitingRoom/store"
import { WEBSOCKET_URL } from "../../env";

class GameStore {

    @observable
    gameData = [];

    @observable
    gameDetail = {
        block: [],
        dimension: {
            x: 5,
            y: 5,
        },
        playerIndex: -1,
        time: 0,
    };

    @observable
    shouldLoadingModalShow = false;

    keyPad = ['Up','Left','Down','Right']

    gameSocket;
    disposer;

    init() {
        this.disposer = autorun(() => {
            if(RoomStore.selectedRoomToken && LoginService.token) {
                this.connectGameSocket();
            }
        });
    }

    dispose() {
        this.disposer();
    }

    connectGameSocket() {
        if(!this.gameSocket)  {
            this.gameSocket = new WebSocket(`${WEBSOCKET_URL}/game?player=${LoginService.token}&token=${RoomStore.selectedRoomToken}`);
            this.gameSocket.onmessage = ({data}) => {
                this.setGameDetail(JSON.parse(data));
            };
            this.gameSocket.onclose = ({code}) => {
                if(code === 1006) { 
                    this.gameSocket = null;
                    setTimeout(() => {
                        this.connectGameSocket()
                    }, 10000);
                }
            };
        }
    }
    

    @computed
    get gameTable() {
        const table = [];
        for(let i = 0; i < this.gameDetail.dimension.x; i++) {
            const temp = [];
            for(let j = 0; j < this.gameDetail.dimension.y; j++){
                let node;
                let playerNode;
                if(this.gameDetail.blocks) {
                    node = this.gameDetail.blocks.find((o) => o.coordinate.x === i && o.coordinate.y === j);
                }
                if(this.gameDetail.playersInfo){
                    playerNode = this.gameDetail.playersInfo.find((o) => {
                        if(o.coordinate) {
                            return o.coordinate.x === i && o.coordinate.y === j
                        } else {
                            return false;
                        }
                    });
                }
                if(node) {
                    switch(node.blockType){
                        case "OBSTACLE":
                            temp.push("https://www.img.in.th/images/5328946b24463775ee939c0b4aa7c29e.png");
                            break;
                        case "TUNNEL":
                            temp.push( "https://www.img.in.th/images/ad99cc78058995b1a843f1fc01300490.png");
                            break;
                    }
                } else if(playerNode) {
                    switch(playerNode.playerType){
                        case "PRISONER":
                            temp.push("https://www.img.in.th/images/ba4f58903464055c58cff60f6eaeac14.png");
                            break;
                        case "WARDER":
                            temp.push("https://www.img.in.th/images/d2fa8efb16948bb1fdf72860f3c50e42.png");
                            break;
                    }
                } else{
                    temp.push("blank");
                }
            }
            table.push(temp);
        }
        return table;
    }

    @computed
    get time() {
        return 10 - this.gameDetail.time;
    }
    @computed
    get role() {
        if (this.gameDetail.playersInfo) {
            const player = this.gameDetail.playersInfo.find((o)=> o.token === LoginService.token);
            
            return player.playerType;
        }
        return "";
    }

    @action.bound
    dismissLoadingModal() {
        this.shouldLoadingModalShow = false;
    }

    @action.bound
    setGameDetail(gameDetail) {
        console.log(gameDetail);
        this.gameDetail = gameDetail;
        if(gameDetail.playerIndex !== -1) {
            this.shouldLoadingModalShow = false;            
        }
    }
    
    @action.bound
    onChange(key, value) {
        this[key] = value;
    }

    // @action.bound
    sendMove(direction) {
        if(this.gameSocket) {
            this.gameSocket.send(JSON.stringify({direction}))
        }
    }

}

export default new GameStore();

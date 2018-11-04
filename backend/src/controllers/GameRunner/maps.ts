// import _ from "lodash";
// enum Type {
//     OBSTRACLE = "OBSTRACLE", TUNNEL = "TUNNEL", PRISONER = "PRISONER", WARDER = "WARDER",
// }
// class Block {
//     constructor(public blockType: Type, public x: number, public y: number) { }
// }
// export class GameMap {
//     private blocks: Block[] = [];

//     constructor(private x: number, private y: number, private player: number) {
//         const n = 0.2;
//         console.log(x * y * n + player);
//         while (this.blocks.length <= ((x * y * n) + player)) {
//             const randX = this.random(0, x);
//             const randY = this.random(0, y);
//             const check = _.findIndex(this.blocks, (res) => {
//                 return res.x == randX && res.y == randY;
//             });
//             if (check == -1) {
//                 let type: Type;
//                 if (this.blocks.length < x * y * n) {
//                     type = Type.OBSTRACLE;
//                 } else if (this.blocks.length < (x * y * n) + player) {
//                     if (this.blocks.length % 2 == 0) {
//                         type = Type.PRISONER;
//                     } else {
//                         type = Type.WARDER;
//                     }
//                 } else {
//                     type = Type.TUNNEL;
//                 }
//                 const b = new Block(type, randX, randY);
//                 this.blocks.push(b);
//                 console.log(b.blockType);
//             }
//         }
//         // check = _.findIndex(this.blocks, (res) => {
//         //     if(res.blockType==Type.WARDER || res.blockType == Type.PRISONER){

//         //     }
//         // })
//     }

//     private random(min: number, max: number): number {
//         min = Math.ceil(min);
//         max = Math.floor(max);
//         return Math.floor(Math.random() * (max - min + 1)) + min; // The maximum is inclusive and the minimum is inclusive
//     }
//     private walker(player: Block, dest: number) {
//         let destX = player.x, destY = player.y;

//         switch (dest) {
//             case 1: destX = player.x + 1; destY = player.y;
//             case 2: destY = player.y + 1; destX = player.x;
//             case 3: destX = player.x - 1; destY = player.y;
//             case 4: destY = player.y - 1; destX = player.x;
//             default: destX = player.x; destY = player.y;
//         }
//         const check = _.findIndex(this.blocks, (res) => {
//             if (res.x == destX && res.y == destY) {
//                 if (res.blockType == Type.OBSTRACLE) {
//                     console.log("Obstracle found!");
//                 } else if (res.blockType == Type.TUNNEL && player.blockType == Type.PRISONER) {
//                     console.log("Prisoner escape!");
//                 } else if (res.blockType == Type.PRISONER && player.blockType == Type.WARDER) {
//                     console.log("Prisoner captured!");
//                 } else if (destX > this.x || destY > this.y) {
//                     console.log("Out of map!");
//                 } else {
//                     player.x = destX; player.y = destY;
//                     console.log("Do nothing");
//                     return true;
//                 }
//                 return true;
//             }
//             return false;
//         });

//     }
// }

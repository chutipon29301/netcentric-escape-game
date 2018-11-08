# Netcentric Architecture Game: Escape

This repository is a part of the project in Netcentric Architecture (2190472) of Chulalongkorn University

### Prerequisites

Install the following tools and program to run the project

- [Docker](https://docs.docker.com/install/)
- [docker-compose](https://docs.docker.com/compose/install/)

### Installing

Follow these steps to running in development mode.

- Download the project or using `git clone`
```sh
git clone https://github.com/chutipon29301/netcentric-escape-game.git
```

- Create `.env` file at root of this project using variable name from `docker.example.env`


- Start project in watch mode with the following command
```sh
docker-compose up
```
- Start project with the following command
```sh
docker-compose -f docker-compose.dev.yml up
```

## Deployment

```sh
# Build
bash build.sh
# Deploy
bash deploy.sh
```

## Authors

* **Chutipon Hirankanokkul** 5931239021 - Back-end developer - [Chutipon29301](https://github.com/chutipon29301)
* **Jakpat Mingmonkolmitr** 5931217221 - DevOps - [WhatTheFar](https://github.com/WhatTheFar)
* **Yanisa Sunthornyotin** 5931243521- Back-end developer - [mingyanisa](https://github.com/mingyanisa)
* **Jatuwat Sa-ngiampak** 5931216621 - Front-end developer - [Jatuwatsag](https://github.com/Jatuwatsag)
* **Nicha Rojsrikul** 5931259621 - Front-end developer - [NichaRoj](https://github.com/NichaRoj)

# Extra Features
      
* Register
* Color table    
* reate room  
* Background
* GIF Animation   
* Description
* Sign in
* No repeat email   
* Join room
* No client in room
* Only owner (who create the room) can change the field dimension (e.g. 5x5, 6x6, 7x7)
* Disappear keypad when not be in your turn
* Role appear for that client
* Admin page (reset game, show online players, created room, delete room, remove game)
* List of online players
* Remove register players
* Current status player
* Game dimension
* Start when all players are ready 
* Toggle status
* List room
* Remove room
* Multiplayer !
* Random role multiplayer
* Watch mode
* Remove game
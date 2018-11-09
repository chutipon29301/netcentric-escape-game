# Netcentric Architecture Game: Escape

This repository is a part of the project in Netcentric Architecture (2190472) of Chulalongkorn University

### Prerequisite

Install the following tools and programs to run the project

- [Docker](https://docs.docker.com/install/)
- [docker-compose](https://docs.docker.com/compose/install/)

### Install

Follow these steps to run the game in development mode.

- Download the project or use `git clone`
```sh
git clone https://github.com/chutipon29301/netcentric-escape-game.git
```

- Create `.env` file at root of this project using variable name from `docker.example.env`


- Start project in watch mode with the following command
```sh
docker-compose up
```

## Deployment

```sh
# Build
bash build-frontend.sh
# Deploy
bash run-prod.sh
```

## Authors

* **Chutipon Hirankanokkul** 5931239021 - Back-end developer - [Chutipon29301](https://github.com/chutipon29301)
* **Jakpat Mingmonkolmitr** 5931217221 - DevOps - [WhatTheFar](https://github.com/WhatTheFar)
* **Yanisa Sunthornyotin** 5931243521 - Back-end developer - [mingyanisa](https://github.com/mingyanisa)
* **Jatuwat Sa-ngiampak** 5931216621 - Front-end developer - [Jatuwatsag](https://github.com/Jatuwatsag)
* **Nicha Rojsrikul** 5931259621 - Front-end developer - [NichaRoj](https://github.com/NichaRoj)

# Extra Features
      
* Web deployment (https://escape.thinc.in.th)
* Game description
* Registration
* No duplicated registered emails
* Sign in
* Room creation
* List of rooms
* Join room

* Ready status check in Start button
* Status toggle button
* Color table      
* Background
* GIF animation      
* Dynamic field dimension
* Field dimension edit accessible to only room creator
* Dynamic keypad (only visible when it's your turn)
* Role indicator
* Multiplayers!
* Randomized roles in multiplayer mode
* Watch mode

* Admin page (reset game, show online players, create room, delete room, remove game)
* List of all online players in admin page
* List of players in each game in admin page
* Ability to remove registered players
* Current player status
* Ability to remove rooms
* Ability to remove games

* No more than one player in a single block; otherwise automatic win for warder

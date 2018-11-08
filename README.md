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

| # Feature       
| -------   |:-------------:
| 1. Register
| 2. Color table    
| 3. reate room  
| 4. Background
| 5. GIF Animation   
| 6. Description
| 7. Sign in
| 8. No repeat email   
| 9. Join room
| 10. No client in room
| 11. Only owner (who create the room) can change the field dimension (e.g. 5x5, 6x6, 7x7)
| 12. Disappear keypad when not be in your turn
| 13. Role appear for that client
| 14. Admin page (reset game, show online players, created room, delete room)
| 15. List of online players
| 16. Remove register players
| 17. Current status player
| 18. Game dimension
| 19. Start when all players are ready 
| 20. Toggle status
| 21. List room
| 22. Remove room
| 23. Multiplayer !
| 24. Random role multiplayer
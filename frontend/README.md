# Monkey Online Web Boilerplate

## Setting up

Install Dependency

```bash
$ npm install
# OR
$ yarn
```

create .env file that has following content

```env
REACT_APP_DECORATORS=true
REACT_APP_SASS=true
REACT_APP_LESS=true
REACT_APP_STYLUS=true
REACT_APP_CSS_MODULES=true
REACT_APP_SASS_MODULES=true
REACT_APP_LESS_MODULES=true
REACT_APP_STYLUS_MODULES=true
```

Start dev server

```bash
$ npm run start
# OR
$ yarn start
```

## Included Libraries

-   react
-   react-router
-   mobX, mobX-react
-   react-apollo

## Also Included

-   Prettier Config
-   TSLint Config
-   ESLint Config

# Features

## Routing

See [/src/common/routes.js](./src/common/routes.js)

## MobX Store

See [/src/modules/home/store.js](./src/modules/home/store.js)

## GraphQL

See [./src/modules/home/components/Ping.js](./src/modules/home/components/Ping.js)

# Practices

## Folder Structure

-   We'll use module-based folder structure meaning that every folder is it own feature/page.
-   Stylesheets, scripts, assets, components related to a module should be stored in the folder. See `src/modules/home`
-   Any thing that doesn't have a feature will go to common folder.

# Resources

React-apollo: https://www.apollographql.com/docs/react/essentials/get-started.html

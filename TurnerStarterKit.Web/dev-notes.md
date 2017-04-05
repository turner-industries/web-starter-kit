# Notes

## Tech Stack

* ReactJS (created with create-react-app)
    * also using: custom-react-scripts (needs `.env` file)
* Semantic UI - React Bindings
* react-router v4
* redux
    * redux-actions
    * redux-thunk
* validate.js
* yarn

## Setup

** run from `TC3.Web` directory

* `yarn` - to install dependencies
* `yarn start` - start development server

## Authentication

Currently just a fake that returns a fake user.

## Structure

* features - feature folders...
* layout (could be in features...)
* store - state management, api, etc...

## Adding a route

* Create component
* Add Route, (reference `MainLayout` component)
    * This may include adding a single route component
      or a Routes component if there will be multiple (see users)

## Adding a redux features

* create "reducer" - include
    * actions ("intents to mutate state")
    * reducer (handle actions and mutate state)
    * selectors (used for mapping normalized state into components)
* what does "thunkCreator" do?
  * a promise can exist in 3 states: pending, resolved, rejected
  * thunkCreator takes away some of the boilerplate from making the 3 states
  * based around these concepts
    * redux-actions
    * redux-thunk

some reference:
  * http://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout/35415559#35415559
  * https://github.com/markerikson/redux-ecosystem-links

## Styling

* over-ride semantic styles in root `index.scss`
  or in feature specific `scss` files
* try to keep common variables/mixins in `variables.scss`

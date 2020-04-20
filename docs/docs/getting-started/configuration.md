---
id: configuration
title: Configuration
---

Configuration of Hydrogen is simple and straightforward.

1. Configure Hydrogen with a request adapter and "plugins" of your choosing.
2. Add Hydrogen's reducer to your Redux store.

**That's all there is to it!**

Please see the [list of packages](/getting-started/packages.md) for more options on how you can configure Hydrogen.

## Configuring Hydrogen

In order to use Hydrogen in your application you must configure an instance of it, with your chosen request adapter and "plugins".

This example assumes that you are using:

1. The `redux-hydrogen-feathers` request adapter.
2. You have already configured your [Feathers](https://feathersjs.com/) client.

```js title="configuration.js" {6}
import createHydrogen from '@hydrogenjs/redux-hydrogen'
import feathersHydrogen from '@hydrogenjs/redux-hydrogen-feathers'

import client from './my-feathers-client'

const hydrogen = createHydrogen({ adapter: feathersHydrogen(client) })

export { hydrogen }
```

## Configuring Redux

Configuring Redux to use Hydrogen is as easy as importing the Hydrogen's reducer and adding it to your store's reducers.

:::note
You must mount the Hydrogen reducer under the key "hydrogen" in your store.
:::

```js title="store.js" {6,11}
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { reducer } from '@hydrogenjs/redux-hydrogen'

const combinedReducers = combineReducers({
  hydrogen: reducer // it must be mounted under 'hydrogen'
})

export const store = createStore(
  combinedReducers,
  applyMiddleware(thunk)
)
```

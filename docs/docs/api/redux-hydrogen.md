---
id: redux-hydrogen
title: redux-hydrogen
description: The core package in the Hydrogen ecosystem. It exposes high level APIs that enable you to work with Redux state easily.
---

The **core** package in the Hydrogen ecosystem. It exposes high level APIs that enable you to work with Redux state easily.

These APIs enable you to trigger CRUD operations on data resources in your application.

1. Transparently fetch and create data from / to your back-end.
2. Manage the lifecycle of that data in your Redux state.

Under the hood this means that `redux-hydrogen` manages it's own set of `reducers`, `thunks`, `actions`, and `selectors`&mdash;and pulls these all together into service methods for you to easily use in your application.

:::warning
This page is not complete.
:::

## Overview

`redux-hydrogen` is split into the following categories:

- The main Hydrogen object.
- Service instances that allow you to perform CRUD operations.
- Selectors that enable you to query the Redux state that is managed by Hydrogen.

### Hydrogen object

The Hydrogen object is a configured instance of Hydrogen. Please see [the constructor](#createoptions) and the [configuration page](/getting-started/configuration.md) for more information on how to configure Hydrogen.

### Service instances

Service instances allow you to trigger CRUD operations on your application. Each `service` method returns a [thunk](https://github.com/reduxjs/redux-thunk) that must be dispatched on your Redux store.

All service methods will tigger corresponding requests to your back-end and persist the result of the request to your Redux state.

For example, if we wanted to create a `tag` resource on the `tags` service we would write the following code.

```js title="service.js"
import { hydrogen } from './my-configured-hydrogen'
import { store } from './my-store'

const tag = hydrogen.service('tags')
const { data } = await tag.create({ name: 'Silly Name' })(store.dispatch)
```

### Selectors

Selectors enable you to query the Redux state that is managed by Hydrogen.

```js title="selectors.js"
import { selectors } from '@hydrogenjs/redux-hydrogen'
import { store } from './my-store'

const tags = selectors.find(store.getState(), 'tags', { category: 'tip' })
```
## Constructors

The `redux-hydrogen` library exports one `create` constructor function.

### create(options)
```create(options): object``` - Creates a new instance of Hydrogen.

```js title="create-hydrogen.js"
import create from '@hydrogenjs/redux-hydrogen'
import someAdapter from '@hydrogenjs/some-adapter'

const hydrogen = create({ adapter: someAdapter })

export { hydrogen }
```

#### Options

- ```adapter``` - The request adapter of your choosing. For example, [redux-hydrogen-feathers](/api/redux-hydrogen-feathers.md).

## Instance Methods

### .service(path)
```.service(path): object``` - Returns a new Hydrogen service.

```js title="create-service.js"
import { hydrogen } from './my-configured-hydrogen'

const tags = hydrogen.service('tags')
```

#### Arguments

- ```path``` - The URL path to the service that will be invoked.

:::note
The path name will also be the key name where Hydrogen will store the data in Redux.
:::

## Service Methods

All Hydrogen service methods return [thunks](https://github.com/reduxjs/redux-thunk). Thunks must be dispatched manually, just like action creators. Once dispatched the thunk will return a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

:::important
**In order for the service method to be triggered you must dispatch it.**
:::

### .find(query)
```find(query)(dispatch): Promise``` - Retrieves a list of all resources from the service using the provided `query`.

```js title="find.js"
import { hydrogen } from './my-configured-hydrogen'
import { store } from './my-store'

const tags = hydrogen.service('tags')
const { data } = await tags.find()(store.dispatch)
```

#### Arguments
- `query` - A query object.

### .first(query)
```first(query)(dispatch): Promise``` - Returns the first resource that matches `query`.

```js title="first.js"
import { hydrogen } from './my-configured-hydrogen'
import { store } from './my-store'

const tags = hydrogen.service('tags')
const { data } = await tags.first({ category: 'tip' })(store.dispatch)
```

#### Arguments
- `query` - A query object.

### .get(id, query)
```get(id, query)(dispatch): Promise``` - Retrieves a single resource identified by `id`.

```js title="get.js"
import { hydrogen } from './my-configured-hydrogen'
import { store } from './my-store'

const tags = hydrogen.service('tags')
const { data } = await tags.get('7fa09e3d-2f1d-4a0b-a8eb-010a358f900c')(store.dispatch)
```

#### Arguments
- `id` - The id of the resource to be retrieved.
- `query` - An **optional** query object.

### .create(data)
```create(data)(dispatch): Promise``` - Create a new resource with `data`.

```js title="create.js"
import { hydrogen } from './my-configured-hydrogen'
import { store } from './my-store'

const tags = hydrogen.service('tags')
const { data } = await tags.create({ name: 'Silly Name' })(store.dispatch)
```

#### Arguments
- `data` - The data of the resource to be created.

### .update(id, data, query)
```update(id, data, query)(dispatch): Promise``` - Replaces the resource identified by `id` with `data`.

```js title="update.js"
import { hydrogen } from './my-configured-hydrogen'
import { store } from './my-store'

const tags = hydrogen.service('tags')

const { data } = await tags.update(
  '7fa09e3d-2f1d-4a0b-a8eb-010a358f900c',
  { name: 'New Tag Name' }
)(store.dispatch)
```

#### Arguments
- `id` - The id of the resource to be updated.
- `data` - The data that will replace the current resource.
- `query` - An **optional** query object.

### .upsert(data, query)
```upsert(data, query)(dispatch): Promise``` - Updates or creates a single resource with `data` that is identified by `query`.

```js title="upsert.js"
import { hydrogen } from './my-configured-hydrogen'
import { store } from './my-store'

const tags = hydrogen.service('tags')

const { data } = await tags.upsert(
  { name: 'Silly Name', category: 'tip' },
  { name: 'Silly Name' }
)(store.dispatch)
```

#### Arguments
- `data` - The data that will be used to update or create the resource.
- `query` - A query object.

### .patch(id, data, query)
```patch(id, data, query)(dispatch): Promise``` - Merges the resource identified by `id` with `data`.

```js title="patch.js"
import { hydrogen } from './my-configured-hydrogen'
import { store } from './my-store'

const tags = hydrogen.service('tags')

const { data } = await tags.patch(
  '7fa09e3d-2f1d-4a0b-a8eb-010a358f900c',
  { name: 'New Tag Name' }
)(store.dispatch)
```

#### Arguments
- `id` - The id of the resource to be patched.
- `data` - The data that will be merged with the existing resource.
- `query` - An **optional** query object.

### .remove(id, query)
```remove(id, query)(dispatch): Promise``` - Removes the resource identified by `id`.


```js title="remove.js"
import { hydrogen } from './my-configured-hydrogen'
import { store } from './my-store'

const tags = hydrogen.service('tags')
const { data } = await tags.remove('7fa09e3d-2f1d-4a0b-a8eb-010a358f900c')(store.dispatch)
```

#### Arguments
- `id` - The id of the resource to be removed.
- `query` - An **optional** query object.

## Selectors

The selectors that `redux-hydrogen` exposes enable you to query the Redux state that is managed by Hydrogen.

### .find(state, name, query)
`find(state, name, query): object` - Retrieves a list of resources matching `query` from the service identified by `name`.


```js title="selector-find.js"
import { selectors } from '@hydrogenjs/redux-hydrogen'
import { store } from './my-store'

const tags = selectors.find(
  store.getState(),
  'tags',
  { category: 'tip' }
)
```

### .first(state, name, query)
`first(state, name, query): object` - Retrieves the first resource matching `query` from the service identified by `name`.


```js title="selector-first.js"
import { selectors } from '@hydrogenjs/redux-hydrogen'
import { store } from './my-store'

const tag = selectors.first(
  store.getState(),
  'tags',
  { category: 'tip' }
)
```

#### Arguments
- `state` - The Redux state object.
- `name` - The name of the service that the resource is owned by.
- `query` - A query object.

### .get(state, name, id)
`get(state, name, id): object` - Retrieves a single resource by `id` from the service identified by `name`.


```js title="selector-get.js"
import { selectors } from '@hydrogenjs/redux-hydrogen'
import { store } from './my-store'

const tag = selectors.get(
  store.getState(),
  'tags',
  '6b2d5f1b-8280-4ed1-9e4b-e8870c86f42a'
)
```

#### Arguments
- `state` - The Redux state object.
- `name` - The name of the service that the resource is owned by.
- `id` - The id of the resource.

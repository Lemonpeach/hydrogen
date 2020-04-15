# Usage

This is a high level example for the usage of the Hydrogen ecosystem.

This example assumes:

1. There is a RESTful `tags` endpoint that exists at `${host}/tags`.
2. We are using [FeathersJS](https://github.com/feathersjs-ecosystem/client) as our request client.

Demonstrates how to:

1. Create a `tag` that is persisted to your back-end and into your redux state.
2. Display all `tags` that have been created before the start of today.

It uses the following Hydrogen packages:

* `redux-hydrogen`
* `react-redux-hydrogen`

##### Please Note

This example has left out the configuration of Hydrogen in your application, but it represents the only redux code other than your configuration that you will need to write. No other redux, or React code is needed to perform these operations with Hydrogen.

#### Example

```js
import React from 'react'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import sillyname from 'sillyname'

import { useFind, hydrogen } from './hydrogen'

const createTag = hydrogen.service('tags').create

const Tags = ({ createTag, tags }) => {
  const dispatch = useDispatch()
  const tags = useFind('tags', {
    query: { $gt: moment.startOf('day').format() }
  })
  return (
    <Fragment>
      <button
        onClick={e => {
          e.preventDefault()
          createTag({ name: sillyname(), date: moment.format() })(dispatch)
        }}
      />
      {
        tags.map(t => (
          <Fragment>
            <span>{t.name}</span>
            <span>{t.date}</span>
          </Fragment>
        ))
      }
    </Fragment>
  )
}
```

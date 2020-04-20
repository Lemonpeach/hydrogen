---
id: usage
title: Usage
---

This is a high level example for the usage of Hydrogen.

This example assumes:

1. There is a RESTful `tags` endpoint whose path is `/tags`.
2. We are using [Feathers](https://github.com/feathersjs-ecosystem/client) as our request client.

And demonstrates how to:

1. Create `tag` data that is persisted to your back-end and into your redux state.
2. Display all `tag` resources that have been created before the start of today.

It uses the following Hydrogen packages:

* `redux-hydrogen`
* `react-redux-hydrogen`


:::note

This example has left out how to configure Hydrogen, but it represents the only Redux code other than your configuration that you will need to write. **No other Redux, or React code is needed to perform these operations with Hydrogen.**

:::

```js title="kickass.js" {6,12-14,20}
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

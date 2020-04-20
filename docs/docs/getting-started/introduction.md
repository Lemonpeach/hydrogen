---
id: introduction
title: About
---

Hydrogen is an **ecosystem** of pluggable Redux and React tools that aim to remove boilerplate by **leveraging** a set of **minimal conventions**.

## Overview

Hydrogen exposes a service layer that enables your application to work with conventionalized state data easily. The conventions it follows are typical CRUD ones. If you have a RESTful back-end you are already set up to use Hydrogen.

And you can still use Hydrogen even if you do not have a RESTful back-end, or the nature of the call to your back-end is not RESTful, i.e. triggering an action like `POST /api/reset-password`.

At a high level Hydrogen takes care of:

1. Fetching data from your back-end.
2. Persisting data into your Redux state.
3. Managing data in your Redux state over time.
4. Seamlessly integrating into React with React hooks.

## Reasons for Hydrogen's existence

We have observed that standard React and Redux design patterns are not as good as they can be. Some of those patterns are:

1. Duplicated reducers, action creators, thunks, and sagas, with slight variations.
2. Abstractions of the above case into generalized functions
3. Conflated state management; some in Redux, some in React.

All these patterns cause varying levels of problems in our application; including, but not limited to:

* More bugs.
* Greater maintenance overhead.
* More lines of code to test.
* Higher cognitive overhead.

Hydrogen's purpose is to reduce these problems and provice a great developer experience at the same time. Working with Redux and React state should feel good.

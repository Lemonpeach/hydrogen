# About Hydrogen

Hydrogen is an **ecosystem** of pluggable redux and react tools that aim to remove boilerplate by **leveraging** a set of **minimal conventions**.

Hydrogen exposes a service layer that enables your application to work with conventionalized state data easily. The conventions it follows are typical CRUD / BREAD operations. If you have a RESTful back-end you are already set up to use Hydrogen.

If you do not have a RESTful back-end, or the nature of the call to your back-end is not RESTful, i.e. triggering an action like `POST /api/reset-password`, you can still use Hydrogen!

At a high level Hydrogen takes care of:

1. Fetching data from your back-end.
2. Persisting data into your redux state.
3. Managing data in your redux state over time.
4. Seamlessly integrating into React with React hooks.

## Reasons for Hydrogen's existence

We have observed that standard react and redux design patterns are not as good as they can be. Some of those patterns are:

1. Duplicated reducers, action creators, thunks, and sagas, with slight variations.
2. Abstractions of the above case into generalized functions
3. Conflated state management; some in redux, some in react.

All these patterns cause varying levels of problems in our application; including, but not limited to:

* More bugs.
* Greater maintenance overhead.
* More lines of code to test.
* Higher cognitive overhead.

Hydrogen's purpose is to reduce these problems and provice a great developer experience at the same time. Working with redux and react state should feel good.

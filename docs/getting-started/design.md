# Design

The design of Hydrogen can be categorized into three main categories:

1. The core `redux-hydrogen` package.
2. Request adapters.
3. Framework integrations.

However, this is not representative of any kind of limitation to Hydrogen's capability. Theoretically, any kind of plugin can be made to Hydrogen.

For example, there are plans to include an [authentication package](https://github.com/Lemonpeach/hydrogen/issues/15) to handle authentication in a standard way.

## Core package

The core `redux-hydrogen` package represents the bulk of the features that Hydrogen offers. Hydrogen is structured as a service layer to `redux` and exposes high level APIs that enable you to work with `redux` state easily. 

These APIs enable you to trigger CRUD operations on data resources in your application.

1. Transparently fetch and create data from / to your back-end.
2. Manage the lifecycle of that data in your `redux` state.

Under the hood this means that `redux-hydrogen` manages it's own set of `reducers`, `thunks`, `actions`, and `selectors`&mdash;and pulls these all together into service methods for you to easily use in your application.

**For high level examples of what this looks like in practice, please see the [usage](/getting-started/usage.md) page.**

## Request adapters

Hydrogen is unopinionated on how your application communicates to your back-end and relies on request adapter libraries to communicate to any kind of back-end you can imagine.

A request adapter is a simple implementation that maps Hydrogen service methods to specific back-end requests. For example, the [redux-hydrogen-feathers](/api/redux-hydrogen-feathers.md) request adapter maps Hydrogen service methods to [Feathers](https://feathersjs.com/) client methods.

Creating a new adapter is simple and straightforward. There are no specific docs for this yet, but please take a look at the [redux-hydrogen-feathers](https://github.com/Lemonpeach/hydrogen/blob/master/packages/redux-hydrogen-feathers/src/index.js) implementation for clarification.

## Framework integrations

Framework integrations allow you to seamlessy integrate `redux-hydrogen` into other frameworks of your choice. For example, you can easily use `redux-hydrogen` in `react` by using the [react-redux-hydrogen](/api/react-redux-hydrogen.md) package.

This package wraps `redux-hydrogen` service methods into easy to use React hooks that enable you to just load data without worrying about the how.

**For high level examples of what this looks like in practice, please see the [usage](/getting-started/usage.md) page.**

## Other "plugins"

Theoretically any kind of "package" / "plugin" can be made to modify how Hydrogen works. Contributions are welcome and much appreciated. Things only get better by working together!

**Please see the [contributions page](/contribute/help-out.md) for more information on how to help.**
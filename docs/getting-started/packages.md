# Packages

Hydrogen is designed as a pluggable ecosystem and theoretically can integrate into anything that suports `redux`. Currently it is focused on `react` integration, but integrations into other frameworks are possible.

## Package Categories

Packages can be created to handle any kind of concern in the Hydrogen ecosystem, but most fall into one of two categories.

1. Framework / library integrations, i.e. `react-redux-hydrogen`.
2. Request adapter packages, i.e. `redux-hydrogen-feathers`.

Hydrogen is unopionated about what server and client frameworks you use. It depends on request adapters to know how to communicate from your client to your server.

## Package List

| Framework                           | Package                                                      | Purpose                                                      |
| ----------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| [Redux](https://redux.js.org/)      | redux-hydrogen                                               | **Core package and is required.**                            |
| [React](https://reactjs.org/)       | react-redux-hydrogen                                         | Seamlessly integrates Hydrogen into React with [hooks](https://reactjs.org/docs/hooks-intro.html). |
| [Feathers](https://feathersjs.com/) | <span style="white-space: nowrap">redux-hydrogen-feathers</span> | A Hydrogen request adapter for the Feathers.                 |

**Have an idea for a package? ** [All contributions are welcomed and appreciated](./contribute/help-out.md).

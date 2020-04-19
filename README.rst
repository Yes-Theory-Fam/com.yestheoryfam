YesTheoryFam.com
================

This is the project for the website at https://yestheoryfam.com.


Requirements
------------

* NodeJS


Installation
------------

- Clone the repository
- Run ``npm install``
- Run ``npm start`` to start a development webserver, usually at http://localhost:8080. An address should show up in your terminal.
- Do your thing


Contributions
-------------

The code style of the project is Prettier_. We expect any contributions to follow this code style.
As a helper you can run ``npm run lint`` to check for errors and ``npm run lint:fix`` to fix any errors.

It's possible to add git hooks or editor hooks (such as 'format on save' in VS Code) to automatically
format the project according to Prettier.

.. _Prettier: https://prettier.io/

We use React with TypeScript for the site, with some sprinkles of SASS/SCSS for the styling.

Example React code in JSX/TSX flavour:

.. code-block:: tsx

    <App />


Example SASS stylesheet:

.. code-block:: scss

    .component {
        &-hierarchy {
            background-color: hotpink;
        }
    }

# Mamas and Papas Static Platform

This is the static site template for the new mamas and papas platform. This is built as a prototype and to be pulled into Hybris

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You're expected to have [Node](https://nodejs.org/en/), [NPM](https://www.npmjs.com/) and [Grunt](https://gruntjs.com/) to run this project.

Once you've got these, run:

```
$ npm install
```

### Installing

The following command will build all assets and start the Express server on `localhost`
```
$ npm start
```

If you just want to build the assets you can run
```
$ npm run build
```

## Working on
### Git Workflow
Make a new branch for your work from Master
Commit all your work to that branch
Push your branch to the github repo
Open a Pull request and include Marcus as a reviewer

### General
Try to reuse existing components and styles where possible.
Create new components partials and SCSS files for each distinct section.
 `src/css/components/`
 `views/partials/`
Follow the following trimmed BEM CSS notation. blockName_elementName-modifierName
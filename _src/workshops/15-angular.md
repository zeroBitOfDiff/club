---
title: Angular.js
slug: workshops/angular
template: workshop
author: Ivey Padgett
---

# Plunker

We're going to try out using `Plunker` again for this workshop as it allows you to play with Angular without having to worry about setting up your dev environment. Unlike [React](http://techknights.org/react), Angular does require any precompiling so it can be run like any JavaScript file!

# Todo List Basic Template

We are going to start this out by building out the HTML and CSS we will need for the todo list, and fill in the JavaScript and Angular afterwards. I have already put that together for you, as it was basically the same code from the [Frontend Workshop](http://techknights.org/frontend) we did last semester, so no need to rehash that again.

[Open up the Plunker file to get started](https://plnkr.co/edit/GylzXeXkCLMDfAsjOsNv). Make sure to open it in a new tab!

# Adding an Angular app

Before we can do anything in Angular, we need to create an Angular app. An app is just telling Angular where on the page it should be active, in our case we will make it the body of the document. Many people will put the app on the HTML tag, it isn't a huge deal where you put it as long as you recognize that Angular will only work inside of tags with the app attribute.

Add `ng-app="todoListApp"` to the `<body>` tag of the html. We will define `todoListApp` in a bit, as it has no meaning on its own right now. If you look in the console, Angular will rightly complain that the app `todoListApp` doesn't exist, but it will be fixed soon enough!

```html
<!-- index.html -->
<body ng-app="todoListApp">
...
</body>
```

**Note**: `ng-` is a prefix for any attributes to be used in Angular, in this case it is prefixing `app` to indicate app is an attribute of Angular and Angular knows exactly where to find the app in your project.

# Onto the Controller now

Another important component of an Angular application is a Controller. According to the [Angular Docs](https://angularjs.org/):
> Controllers are the behavior behind the DOM elements. AngularJS lets you express the behavior in a clean readable form without the usual boilerplate of updating the DOM, registering callbacks or watching model changes.

Controllers help to not only control your application but also to organize it. In the case of this application, we will only use one controller. There are plenty of applications which use multiple controllers to keep data and logic separate and clean.

Moving onto adding the controller, all you have to do is pick a tag in which will house the controller. In our case, since we only have one controller and we would like to control the entire page, we will house the controller on the body tag just like the app is.

Add `ng-controller="todoListController"` to the `<body>` tag after the app attribute.

```html
<!-- index.html -->
<body ng-app="todoListApp" ng-controller="todoListController">
...
</body>
```

**Note**: The controller and the app do **not** have to have similar names, it is just standard naming convention for the app to describe the application and the controller to describe the function  of the controller. In this case, we only have one controller which controls the entire app, meaning the app and controller have similar functions.

# Repeating Todo List Items

One of the nice things about Angular is its built in functionality for data binding. Data binding is described in the Angular Docs as:
> Data-binding is an automatic way of updating the view whenever the model changes, as well as updating the model whenever the view changes. This is awesome because it eliminates DOM manipulation from the list of things you have to worry about.

To expand on that, let me define a few things. The `view` is our HTML, it is what we actually view when it comes to the application. The `model` is our data and logic, it will be everything that populates the view from wherever it comes from (a server, an API, statically, etc).

A todo list application is a great example for displaying this. For instance, you have a lot of `items` in the todo list, and you want to repeat them along with have the ability to check and uncheck them. Angular has a built in repeat system, where you give it an array or object and it will cycle over all items in the array/object.

`ng-repeat` will repeat whatever element it is hooked onto for however many items are in the array/object. Repeating the element exactly also means it will include any children of the element. And example is as follows:

```html
<!--
	This is an example, do not copy this into the Plunker!
	Our HTML:
-->

<div ng-repeat="thing in things">
	<span>Hello</span>
</div>

<!--
	Pretend we had 3 "things"
	Output:
-->

<div>
	<span>Hello</span>
</div>
<div>
	<span>Hello</span>
</div>
<div>
	<span>Hello</span>
</div>
```

To make use of this, add `ng-repeat="item in items"` to the	`<div id="itemTemplate" class="item">` component. This won't do anything yet, as we don't have this	`items` object, but we will get to that soon.

```html
<!-- index.html -->
<div id="itemTemplate" class="item" ng-repeat="item in items">
...
</div>
```

# Adding some data to bind to the view

Currently, we do not have any items for the app to repeat (we don't even have an app yet!), so let's get that set up so we can see the fruits of our current labor.

First, let's get our app and controller set up. To do this, we simply have to define them in a js file somewhere where the HTML has access to it. In the case of the plunker, I have already set up a blank js file called `script.js` that the HTML pulls in, so just edit that (or add one if you aren't using plunker).

## Defining the App

The first thing we want to do is define the app. All we have to do is call `angular.module` with our app name and any dependencies it has. To slow down a bit let me cover all of these new words:

`angular`: This is the variable to interact with Angular, it is defined in the Angular script we included in our HTML.

`angular.module`: This is a function that exists on `angular` to defile the module we are working with.

`dependencies`: These are any additional services our application might rely on. In our case, we won't have any, but this is where you would include them.

Alright, with that out of the way let's actually define our app. Simply put `var app = andular.module('todoListApp', [])` at the top of the `script.js` file. The app name we passed in has to match the app we defined in the HTML, or the reference won't be made. We are setting it to a variable so that we can be lazy and reference it later when we need it again. **That `[]` after the app name is very important! It tells Angular we have no dependencies.** 

```js
// script.js
var app = angular.module('todoListApp', [])
```

If you return to the HTML now and check out the console, it shouldn't complain about the app not being defined! It will complain about the controller though, so let's do that as well.

## Adding a Controller

When we add a controller to an app, we need to reference the app and tell it we have a controller,  which includes a controller name and the function of the controller. We will do so by adding the following after the app declaration.

```js
// script.js
app.controller('todoListController', function ($scope) {
	// Things go in here
})
```

To break this down a bit, we referenced the `app` that we defined earlier and called the `controller` method on it. This method takes in a name and a function. We gave it the name of `todoListController`, which matches the name we defined in our HTML file. In addition, we passed in a function which takes in a `$scope` variable and currently does nothing.

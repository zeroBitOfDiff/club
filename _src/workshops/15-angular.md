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

# On to the Controller now

Another important component of an Angular application is a Controller. According to the [Angular Docs](https://angularjs.org/):
> Controllers are the behavior behind the DOM elements. AngularJS lets you express the behavior in a clean readable form without the usual boilerplate of updating the DOM, registering callbacks or watching model changes.

Controllers help to not only control your application but also to organize it. In the case of this application, we will only use one controller. There are plenty of applications which use multiple controllers to keep data and logic separate and clean.

Moving onto adding the controller, all you have to do is pick a tag in which will house the controller. In our case, since we only have one controller and we would like to control the entire page, we will house the controller on the body tag just like the app is.

Add `ng-controller="todoListController as todoList"` to the `<body>` tag after the app attribute. The `as todoList` part is just a shorthand way to reference the controller, that will come up in a bit.

```html
<!-- index.html -->
<body ng-app="todoListApp" ng-controller="todoListController as todoList">
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

To make use of this, add `ng-repeat="item in todoList.items"` to the	`<div id="itemTemplate" class="item">` component. This won't do anything yet, as we don't have this	`todoList.items` object, but we will get to that soon.

```html
<!-- index.html -->
<div id="itemTemplate" class="item" ng-repeat="item in todoList.items">
...
</div>
```

# Adding some data to bind to the view

Currently, we do not have any items for the app to repeat (we don't even have an app yet!), so let's get that set up so we can see the fruits of our current labor.

First, let's get our app and controller set up. To do this, we simply have to define them in a js file somewhere where the HTML has access to it. In the case of the plunker, I have already set up a blank js file called `script.js` that the HTML pulls in, so just edit that (or add one if you aren't using plunker).

## Defining the App

The first thing we want to do is define the app. All we have to do is call `angular.module` with our app name and any dependencies it has. To slow down a bit let me cover all of these new words:

`angular`: This is the variable to interact with Angular, it is defined in the Angular script we included in our HTML.

`angular.module`: This is a function that exists on `angular` to define the module we are working with.

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
app.controller('todoListController', function () {
	var todoList = this
	// Things go in here
})
```

To break this down a bit, we referenced the `app` that we defined earlier and called the `controller` method on it. This method takes in a name and a function. We gave it the name of `todoListController`, which matches the name we defined in our HTML file. In addition, we passed in a function which takes no parameters in this case and currently only sets a variable `todoList` to `this`, which is just renaming the scope of the function for convenience (more on this soon).

## Adding some Data

In its current state, our Angular app doesn't actually do anything outside of loading the controller and app. A few steps ago, we set up a div to repeat when we have items in an `items` array, so let's make that now to demonstrate `ng-repeat`.

Inside of the controller create an array of object using the `todoList` variable we just created in the controller.

```js
// script.js
app.controller('todoListController', function () {
	var todoList = this

	todoList.items = [
		{
			id: 1,
			title: 'hello'
		},
		{
			id: 2,
			title: 'goodbye'
		}
	]
})
```

*****Note**: I left the controller definition so that it is more clear where to put the items array, you shouldn't need to copy that part or change anything.

After adding this, if you look at the current output you should see two checkbox items with the word "Item" next to it, which is exactly what we wanted! We told Angular to repeat that div for every item that exists in `items` and we put two items in the array, which means it repeat the div twice.

How did Angular know to connect the `todoList.items` array to the `items` object in `ng-repeat="item in todoList.items"` though? The answer is the `todoList` variable. `todoList` is representing the scope of the controller, which means anything housed in the view (HTML) of the controller can access it.

## Populating the Repeating Objects

Now that we have our Controller and App working to repeat a div, let's actually populate the div with the correct information. Back in the controller we defined `todoList.items` as an array of objects with the properties `id` and `title`, but we never used those on the view. In order to use them, we have to inject them into the view using the scope. That sounds scary but it is actually very easy!

To tell Angular we'd like to inject somethign onto the view, we simply reference it inside of Angular's templating syntax, which is `{{}}`. In our case, let's replace the word `Item` in the item template with `hello` and `goodbye` from the array. To do so, replace the word `Item` in the HTML with `{{item.title}}` which is telling Angular to get the property	`title` from the current `item` which is a single item in the `items` array that we are repeating.

```html
<!-- index.html -->
...
<div class="itemTitle">{{item.title}}</div>
...
```

**Note**: We used the word `item` to reference an item from the items array, this has to match what we passed into the `ng-repeat` attribute, which in this case we told it to repeat `item in todoList.items`.

If you look at the output now, it should be two items with the proper names of "hello" and "goodbye"! Let's add in the id of each item as well while we are at it. Look at the `<input>` container for the checkbox and ad an `id` attribute to it with the value from each item.

```html
<!-- index.html -->
...
<input type="checkbox" id="{{item.id}}">
...
```

Now you have successfully repeated items from the controller! The current state is okay, we have some items and we can check them, but how do we add more items? Let's tackle that next.

# Adding Data to the Controller

In order to add items to the checklist, we need to modify the `todoList.items` array on the Controller, but we want that to happen in sync with the user rather than us modifying the array manually. To do this, we just need something to take in the data and some function on the controller to modify the array. Let's make the input box the item to take in the data.

We are going to tell the input box to call a function when the user presses enter, and to pass the input to that function. The input can be passed through if we assign it with `ng-model` which ties the input to the controller.

```html
<!-- index.html -->
...
<input type="text" id="newTodoLabel" placeholder="To-do item..." ng-model="input">
...
```

We have now defined a variable connected to the input box named `input` and we just have to pass that into the function we will call on the controller

```html
<!-- index.html -->
...
<input type="text" id="newTodoLabel" placeholder="To-do item..." ng-model="input" ng-keypress="addItem($event, input)">
...
```

Time to break that down!

`ng-keypress`: This is an Angular attribute that tells Angular "when there is a keypress, do something"
`addItem(...)`: This will be the function we create and call on the Controller, it will be adding items to the item list, so I named it addItem.
`$event`: This is an Angular variable that represents the event that occurred, in this case it will be a keypress and we will need to dive into the event to figure out which key was pressed.
`input`: This is the `ng-model="input"` variabled we defined earlier, it will be whatever the user inputs.

Now that we have everything set up on the View, let's write the function on the Controller end.

```js
// script.js
// This should go inside of the Controller
...
todoList.addItem = function (event, input) {
	if (event.keyCode === 13) {
		todoList.items.push({
			id: todoList.items.length,
			title: input
		})
	}
}
...
```

What the above piece of code does is it adds a function to the controller called `addItem` which takes an event and input. The event's `keyCode` is checked to see if it is `13`, which is the keycode for the enter button. If the enter button was pressed, we then push a new item onto the `itemList` array which has an `id` of the next element (the length of the array) and a `title` of the `input` since that is what the user wanted to add to the list.

Running this now should let you add items to the list using the input box below the list.

# Hiding/Showing using Angular

We have a lovely add button that does nothing right now, but what it should be doing is showing that input box we just used. We can show and hide things conditionally using Angular, so let's do that now.

In order to show/hide, we need to tell Angular that there is something we want to show/hide on a condition, and what the condition is. In our case, we want to show the input box when the add button is clicked. To do so, we need to add a click event to the button and hide the input otherwise.

Adding the click event is very similar to adding the keypress event, except we don't have to worry about the actual event because we only care if it was clicked or not and not what button it was clicked with. In this case, rather than using `ng-keypress` we will be using (big surprise) `ng-click`.

```html
<!-- index.html -->
...
<div class="magic">
	<button class="addButton" id="addButton" ng-click="clickAddButton()">+</button>
</div>
...
```

Now we have to write up that `clickAddButton` function on the Controller. The purpose of the function is to be a conditional on whether or not we show the input box, so the function should have some kind of flag in it for the input box to reference as well. We will be adding an `addButtonClicked` variable to the Controller that the function will set to true and the input box will check.

```js
// script.js
...
todoList.addButtonClicked = false

todoList.clickAddButton = function () {
	todoList.addButtonClicked = true
}
...
```

That block of code can go anywhere in the Controller. The initial reference of `todoList.addButtonClicked` is purely to initialize the variable to false before the button is ever clicked.

Now, that function will get called anytime the add button is clicked and `todoList.addButtonClicked` will be set to true. Next is to tell the input box to only show up when that variable is true, and in turn, when the add button was clicked. We will use `ng-if` to tell Angular that the element should only show *if* something is true. Next, we pass it a condition, which in this case is the variable `todoList.addButtonClicked` which will either be true or false.

```html
<!-- index.html -->
...
<div class="inputBoxContainer" ng-if="addButtonClicked">
	...
</div>
...
```

If you check out the application now, the input box should be hidden and clicking the add button should show the input box for you to then input things.

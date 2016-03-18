---
title: React.js
slug: workshops/react
template: workshop
author: Jonathan Warner
---

# Plunker

We're going to use a tool today called `Plunker`. This is a website that allows you to fiddle around with code and share it with other people. It is commonly seen used to share interactive examples on sites like Stack Overflow. It is similar to Codepen or JSFiddle.

Because React requires a precompiler for JSX, we went ahead and set up a basic app in Plunker for the workshop. [You can find it here](https://plnkr.co/edit/YmcjzKePrEXshm1980S0?p=info).

# Build up the initial components

Thinking top-down, the main page component really consists of an object containing the todo list items, and an object containing the input field for new items.

Go ahead and add these two components after the `<main className="...` line. We'll declare the actual components shortly.

```html
<TodoList />
<InputBoxContainer placeholder="To-do item..." />
```

Plunker will auto-reload the app for us, but of course, there will be no content on the page since we haven't actually defined these components yet. If you opened the Inspector of your browser, you would see an error indicating that TodoList is not defined. This is fine.

Add stubs for both of these:

```jsx
var TodoList = React.createClass({
  render: function() {
    return (
      <div className="TodoList">
        <h1 className="title">To-do</h1>

        <div id="itemsList" className="itemsList">
        </div>

      </div>
    );
  }
});

var InputBoxContainer = React.createClass({
  render: function() {
    return (
      <div className="inputBoxContainer">
        <div className="inputBox addItem">
          <input type="text" placeholder={this.props.placeholder} />
        </div>
      </div>
    );
  }
});
```

If all goes well, you should see the Todo box render. The input box container is hidden by default in the CSS, but it is there, too.

Note that we were able to access the component's `placeholder` value in `this.props.placeholder`. The `props` key is where all the stuff we pass in exists.

Let's focus on building up the todo component for now.

First, let's make some mock data for our todo list to render. Put this somewhere in the app.jsx file:

```js
var TodoItems = [{
  id: 0,
  title: "vim is good",
}, {
  id: 1,
  title: "test",
}];
```

Now let's make a TodoItem component:

```jsx
var TodoItem = React.createClass({
  render: function() {
    return (
      <div className="item">
        <div className="checkBox">
            <input type="checkbox" />
        </div>

        <div className="itemTitle">{this.props.item.title}</div>
      </div>
    );
  }
});
```

Nothing particularly fancy or noteworthy about this -- yet.

Now we need to figure out how to have one of those for every item in the TodoItems array. Since these tags really just compile down to React.createElement calls, we can actually just map them into an array:

```jsx
var items = TodoItems.map(function(item) { return (<TodoItem item={item} key={item.id} />); });
```

Now *that* is a gnarly line! It'll go somewhere in the render function for TodoList, before the return statement.

We can then just interpolate that variable into our code directly. Add

```
{items}
```

inside the itemsList `div`.

Now we have a repeating list for the array!

# Event Handling

We now want to handle events where the user clicks an item. To do this we just add `onClick` to the element we care about and pass it a function. Change `TodoItem` to look like this:

```jsx
var TodoItem = React.createClass({
  _clicked: function() {
    console.log("Clicked!");
  },
  render: function() {
    return (
      <div className="item" onClick={this._clicked}>
        <div className="checkBox">
            <input type="checkbox" />
        </div>

        <div className="itemTitle">{this.props.item.title}</div>
      </div>
    );
  }
});
```

Great. Now we can respond to events. Now what?

# States

Every component in React can have a state associated with it. We now want to change the class of the TodoItem if it is clicked, and update the checked state appropriately. We can do that like so:

```jsx
var TodoItem = React.createClass({
  getInitialState: function() {
    return {
      checked: false,
    };
  },
  _clicked: function() {
   this.setState({
     checked: !this.state.checked, 
   });
  },
  render: function() {
    var classes = ["item", this.state.checked ? "checked" : ""].join(' ');
    
    return (
      <div className={classes} onClick={this._clicked}>
        <div className="checkBox">
            <input type="checkbox" checked={this.state.checked} />
        </div>

        <div className="itemTitle">{this.props.item.title}</div>
      </div>
    );
  }
});
```

The `getInitialState` function is required any time we want to use states in a React component. Remember that React will re-render an element depending on whether or not the diff of its state, properties, return value of `render`, etc., have changed.

We can alter the state using `this.setState`. We can then build a string of class names and set the checkbox state accordingly based on the boolean in `this.state`.

# Part 2: The problem

The original design calls for a button at the bottom of the todo container that will show/hide the input.

Let's make the class CircleButton:

```jsx
var CircleButton = React.createClass({
  render: function() {
    return (
      <div className="magic" onClick={this.props.onClick}>
        <button className="addButton">{this.props.children}</button>
      </div>
    );
  }
});
```

Note the use of `this.props.children`.

Now drop this into `TodoList after the `itemsList` div:

```html
<CircleButton onClick={this._showInputBox}>
  +
</CircleButton>
```

Clicking this button is supposed to show the input box for the user to input new items. But the input box is actually in a parent component of the TodoItems list. How are we supposed to communicate changes in this component up to changes in the parent component?

A one-time fix may be to move the components around, but that's not always going to be practical.

## Possible solution: Flux... ish.

There exists a concept in React-land called "Flux". Flux is not a library, but rather a paradigm of structuring your application. For sake of brevity, we won't be following it exactly, but know that it exists and is somewhat similar to the way we are tackeling the problem tonight.

For sake of time, we're going to jump over to a forked Plunker with the appropriate changes made. [Open the new forked Plunker](https://plnkr.co/edit/8KE9ahYc1UhUIzjpUB1b?p=preview).

In short, we did the following:

* Added a Store file, which contains a series of getters, setters, and callbacks
* Made all items with states pull the state from the global Store
* Added `_changed` functions to the components and tied those functions into the Store.

At this point we basically just need to hook up event listeners and let React take care of the rest.

In `InputBoxContainer`, add an event listener for the keyDown event:

```jsx
  _keyDown: function(e) {
    if (e.keyCode === 13) {
      Store.addTodoItem({ title: e.target.value });
      e.target.value = '';
      Store.hideInput();
    }
  },

...

<input type="text" placeholder={this.props.placeholder} onKeyDown={this._keyDown} />
```

As we saw in the previous frontend tutorial, `13` is the magical keycode that means `enter`.

From there we just tell the Store to add an item based on the input's value and to update the UI state.

We also want to show the inputBoxContainer conditionally:

```jsx
render: function() {
    var classes = ['inputBoxContainer', this.state.visible ? 'visible' : ''].join(' ');
        return (
	      <div className={classes}>
...
```

Now let's hook up that event listener for showing the input box in TodoList:

```js
_showInput: function() {
  Store.showInput();
},
```

And finally, let's feed the TodoItem's events into the Store:

```js
  _clicked: function() {
    Store.checkItem(this.props.item);
  },
```

Tada! A TodoList in React. You can see the finished product [here](https://plnkr.co/edit/mRH9xlcrMCznedd8Cxde?p=preview).

# Resources

[Flux documentation](https://facebook.github.io/flux/docs/overview.html)

[TodoMVC in Flux](https://github.com/facebook/flux/tree/master/examples/flux-todomvc/)

[Using ES6+ with React](https://babeljs.io/blog/2015/06/07/react-on-es6-plus)

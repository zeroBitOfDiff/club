---
title: Functional Workshop
slug: workshops/functional
template: workshop
author: Maxcell Wilson
---

Welcome to the Tech Knights workshop for Functional Programming with Elixir!

# Prelude

Here is some awesome tidbits of knowledge into functional programming before getting started!

Functional programming is another programming paradigm just like imperative or object-oriented, however, it focuses on **computing results** rather than on **performing some task or action**. So when you call a function, the only significant effect that the function has is to compute a value and return it. Objects in functional programming are considered immutable. Instead of changing an object, you will allocate a new object which looks like the old one except for the change.

In today's workshop, you will be learning about a *relatively* new functional language called, Elixir! It is one of my personal favorites since it is really easy to read and looks similar to Ruby syntax. Elixir utilizes another language, Erlang, and its virtual machine to do some crazy computations in concurrent programming (we won't be going into any depth about that this time around though). Elixir is not **purely** functional, which means that side effects have the potential of happening. With some examples, it will make more sense what I mean by that. Let's install Elixir!

# Getting Started
So you are like, "Prince, how do I start playing around with Elixir?" Well compatriate, you will need to [install](http://elixir-lang.org/install.html) it! I personally use Mac OSX and Homebrew, but be sure to use whatever method is compatible with your system. Remember once you have installed that, you will need to check out your PATH settings. There is one prerequisite software and that's Erlang. If you have downloaded it from Homebrew or any other sort of package manager, it should already come installed with Elixir.

And that's it! Let's break into some code!

## Small steps

So open up your favorite text editor, copy the code below into a new file, name it `test.ex`, and save!

```elixir
defmodule Student do
  def intro(name) do
    "Hello, my name is #{name}."
  end
end

# Feel free to put your own name in
my_name = "Prince"
IO.puts Student.intro(my_name)
```

Here's the breakdown:

- `defmodule Student do` - Modules are a way to group functions together and avoid functions all being in the same namespace with one another. Here we are defining a new module `Student` to contain a function `intro(name)`.
- `def intro(name) do` - This is how we define a new function with a name of `intro`. It will take one parameter which is `name`. However, as you may notice, it has no type. A function in Elixir, by default, will accept any type you give it and will coerce it where it can to fit the needs of the function.
- `"Hello, my name is #{name}."` - this is a String! Notice specifically `#{name}`, this is us saying we want to insert whatever value we get from the `name` parameter and insert that into our String.
- `# Feel free to put your own name in` - `#` in this case is the symbol for writing a comment in Elixir. In some langauges this looks like `// <some comment>`. Comments in Elixir can also be written at the end of a line!
- Once we hit our first `end` we are finishing the function and then the second `end` *ends* our `Student` module. Every definition, whether it is in Elixir or a natural language, must eventually come to an `end`.
- `my_name = "Prince"`- Here we are **matching** our variable `my_name` and our string `"Prince"`. It **is not** assignment in Elixir. We can thing of the `=` in Elixir as an equivalent to the algebraic equal operator where whenever the left and right "match" it returns the value of the equation.
- `Student.intro(my_name)` - Now that all our definitions are taken care of, we can call the function with our name! Since `intro` is a function inside of the `Student` module, we will need to reference both the module and the function we want to call.

Once you have done that, you just go into your terminal, and you can just do:

    $ elixir test.ex
    "Hello, my name is Prince."

WOW THAT WAS A LOT! But look at you, you have learned A TON about Elixir with just 10 lines of code!

## Big steps
So above, you saw some basic syntax of Elixir. This didn't showcase the *functional* side of Elixir though. In this section, we will look at collections involving pattern matching and higher-order functions.

So first, let's define a new function:

```elixir
defmodule Student do
  def convert_ltog(letter) do
    case String.upcase(letter) do
      "A"   -> 4.0
      "A-"  -> 3.75
      "B+"  -> 3.25
      "B"   -> 3.0
      "B-"  -> 2.75
      "C+"  -> 2.25
      "C"   -> 2.0
      "C-"  -> 1.75
      "D+"  -> 1.25
      "D"   -> 1.0
      "D-"  -> 0.75
      "F"   -> 0
    end
  end
end

grades = [ "A", "A-", "B-", "A" ]
IO.inspect Enum.map(grades, fn x -> Student.convert_ltog(x) end)
```

With `convert_ltog()`, you may notice the case statement. This looks and acts very similar to switch statements in most languages. It will go through each possible case until it finds a match. For the purposes of the workshop, we will assume we are given valid characters so not to worry about what happens when we don't match!

`grades` is matched with a new data type that we are seeing in Elixir, lists! They are similar to arrays in C, however, these do not contain homogenous, the same, type of data. We cannot access them the same way as arrays but in this case, we won't worry about that! However, do remember that order **does** matter!

So what do I mean when I say higher-order functions? These are functions that can take a function as far as input. Our function `convert_ltog(letter)` will take a String and return its grade-point equivalent. So let's say our student has a set of grades (stored in `grades`) and we want to convert them into their GPA equivalent. We apply a "higher order function" that will take our grades and convert them. So `Enum.map` will take a collection and apply the `Student.convert_ltog()` function to each item in the collection. Think of higher-order functions as functions that accept functions as parameters.

Once you have done that, you just go into your terminal, and you can just do:

    $ elixir test.ex
    [4.0, 3.75, 2.75, 4.0]

Now let's take this a step further, let's try to figure out our GPA given a set of classes. So remember, when calculating our GPA, we will want to convert our letters into grades, sum them together and then divide by the number of classes (or grades). Doesn't sound like too much, so we should be able to do it!

```elixir
defmodule Student do
  def gpa(letters) do
    letters
    |> Enum.map(&(convert_ltog(&1)))
    |> compute_mean
  end

  def compute_mean(grades) do
    Enum.sum(grades) / length(grades)
  end

  def convert_ltog(letter) do
    case String.upcase(letter) do
      "A"   -> 4.0
      "A-"  -> 3.75
      "B+"  -> 3.25
      "B"   -> 3.0
      "B-"  -> 2.75
      "C+"  -> 2.25
      "C"   -> 2.0
      "C-"  -> 1.75
      "D+"  -> 1.25
      "D"   -> 1.0
      "D-"  -> 0.75
      "F"   -> 0
    end
  end
end

grades = [ "A", "A-", "B-", "A" ]
IO.puts Student.gpa(grades)
```

With our additions, you may notice that we separate out our functions to do specific tasks. This is important in functional programming. We want things to be  distinct to easily identify where there may be errors in the code. By writing more functions, we can fix errors these discrete errors.

- `def compute_mean(grades) do` - Here we want to make our logic simple, to compute the mean, we need to know the sum and then divide by the length of our given collection (list). That's all this function should do and that's all we see. Nice and simple! When we want to calculate our GPA, we will just use this function.
- `def gpa(letters) do` - This function will be the glue to get everything working. You notice, in this function, we are taking `letters`, so our collection which contains all of our letter grades. In this we also begin to make use of the `|>` (pipe) operator. With this we can say that whatever item in the previous expression will fill in the first parameter of the next function as if it were written explicitly there. It is a way to fluidly write out nested functions without having to store the variables along the way.
- `Enum.map(&(convert_ltog(&1)))` - It looks a tad messy but I promise it works just as the code we had before `Enum.map(grades, fn x -> Student.convert_ltog(x) end)`. The `&` in this case is a shorthand for an anonymous function. Above, we used `fn x -> ... end` to represent an anonymous function. They work the same way as named functions, except that there isn't a name associated with their definition so they get called relatively on the spot (unless we match them to a variable). As you remember, a higher-order function takes in a function in one of its parameters, so essentially we can make whatever function we'd like into the parameter without having to define one big ol' thing. Whenever you make use of `&`, you can assume any number of parameters getting passed in but each match with a numerical value so when we say `&1` we are talking about the first parameter given to us.

Once you have done that, you just go into your terminal, and you can just do:

    $ elixir test.ex
    3.625

# Taking it to Phoenix
TL;DR: If you are interested to see the final project, you can just clone it from [GitHub](https://github.com/maxcell/sample-elixir) and follow the README.

[Phoenix](http://www.phoenixframework.org) is a web framework built all in Elixir! It implements the Model-View-Controller (MVC) pattern, which you can see in classic frameworks such as Ruby on Rails and Django. We won't be showcasing a whole bunch through this workshop but just showing one feature out of the box with Phoenix which is Channels.

Channels are a really exciting and powerful part of Phoenix that allow us to easily add soft-realtime features to our applications. Channels are based on a simple idea - sending and receiving messages. Senders broadcast messages about topics. Receivers subscribe to topics so that they can get those messages. Senders and receivers can switch roles on the same topic at any time. Since Elixir is based on message passing, you may wonder why we need this extra mechanism to send and receive messages. With Channels, neither senders nor receivers have to be Elixir processes. They can be anything that we can teach to communicate over a Channel - a JavaScript client, an iOS app, another Phoenix application, our watch. Also, messages broadcast over a Channel may have many receivers. Elixir processes communicate one to one.

So let's get started! We are going to install some stuff for Phoenix which you can find all on [the official Phoenix installation guide](http://www.phoenixframework.org/docs/installation). 

1. Make sure that you have Hex, the package manager for Elixir.
 - If you have Elixir installed already, `mix local.hex`
2. You **SHOULD** have Erlang already but follow the [link](http://www.phoenixframework.org/docs/installation#section-erlang) if it didn't work.
3. Now to install Phoenix
  - `mix archive.install https://github.com/phoenixframework/archives/raw/master/phoenix_new.ez`
4. You are gonna also need to have Node, which please use the [installer](https://nodejs.org/en/download/).

OPTIONAL
4. To get Phoenix to run, you may need to install a DB. You can technically do it with out, however, I just grab [Postgres](http://www.phoenixframework.org/docs/installation#section-postgresql).


Surprise, frameworks have so many dependencies ='(. Anyway, we made it!

## Setup
To start our new Phoenix project, we will have to set it up! Head over to your terminal and:

    # Creates a new Phoenix project called chatroom
    $ mix phoenix.new chatroom

    # Move into the project directory
    $ cd chatroom
    
    # Get your depedencies up
    mix deps.get && npm install
    
    # Setup the database
    mix ecto.create

    # FINALLY START THE SERVER
    mix phoenix.server

When you head over to [`localhost:4000`](http://localhost:4000), you should see:

<img src="/pics/workshops/functional/initial_phoenix.png" alt="Initial Phoenix Landing Page"/>

Let's change the landing page so we can showcase our chatbox, open up `web/templates/page/index.html.eex` and replace everything with this:

```html
<div id='message-list' class='row'>
</div>

<div class='row form-group'>
  <div class='col-md-3'>
    <input type='text' id='name' class='form-control' placeholder='Name' />
  </div>
  <div class='col-md-9'>
    <input type='text' id='message' class='form-control' placeholder='Message' />
  </div>
</div>
```

Let's make sure to style it up, open up `web/static/css/app.css` and copy this in there:

```css
#message-list {
  border: 1px solid #777;
  height: 400px;
  padding: 10px;
  overflow: scroll;
  margin-bottom: 50px;
}
```

Now we should be seeing this:

<img src="/pics/workshops/functional/chatroom_phoenix.png" alt="Initial Phoenix Landing Page"/>

## Setting up Channels
Our channel is going to be called `lobby` and so we should head to `web/channels/user_socket.ex` and then add a new line for:

```elixir
channel "lobby", Chatroom.LobbyChannel
```

We need to be sure to add a file describing our `Chatroom.LobbyChannel`. So let's create a new file called `web/channels/lobby_channel.ex` and then implement the code for the `lobby` channel. 

```elixir
defmodule Chatroom.LobbyChannel do
  use Phoenix.Channel

  def join("lobby", _payload, socket) do
    {:ok, socket}
  end

  def handle_in("new_message", payload, socket) do
    broadcast! socket, "new_message", payload
    {:noreply, socket}
  end
end
```

The `join` method here always returns `{:ok, socket}` to allow all connections to the channel. The `handle_in` method is fired every time a new incoming message is received on the socket, which broadcasts that message to all other open sockets.

## Frontend Fun
Now we are going to add the functionality to joining a channel, but first we are gonna go back to our roots and add in jQuery into our `<head>...</head>`:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
<script src="<%= static_path(@conn, "/js/app.js") %>"></script>
```

To get the basic functionality of web sockets, go into `web/static/js/app.js` and uncomment the line:

```js
// ...
import socket from "./socket"
```

AND NOW THE PIÈCE DE RÉSISTANCE!~ We need to add some logic for the socket stuff. Go towards the bottom, and you can delete everything below `socket.connect()` in `web/static/js/socket.js`:

```js
socket.connect()

let channel = socket.channel("lobby", {});
let list    = $('#message-list');
let message = $('#message');
let name    = $('#name');

message.on('keypress', event => {
  if (event.keyCode == 13) {
    channel.push('new_message', { name: name.val(), message: message.val() });
    message.val('');
  }
});

channel.on('new_message', payload => {
  list.append(`<b>${payload.name || 'Anonymous'}:</b> ${payload.message}<br>`);
  list.prop({scrollTop: list.prop("scrollHeight")});
});

channel.join()
  .receive("ok", resp => { console.log("Joined successfully", resp) })
  .receive("error", resp => { console.log("Unable to join", resp) })
```

Now our chat app will be ready to go!!!

# Further Readings!
When I find something new, I really enjoy following up and reading through more content. Here is a curated list of things I have come across that may help you if you are interested in learning more!

- [Awesome List - Elixir Posts](https://github.com/greyhwndz/awesome-elixir-posts)
- [Up and Running with Phoenix](http://www.phoenixframework.org/docs/up-and-running)
- [Elixir Examples](https://elixir-examples.github.io)
- [Elixir Lang - Talks](https://github.com/elixir-lang/elixir/wiki/Talks)
- [Elixir School](https://elixirschool.com/)

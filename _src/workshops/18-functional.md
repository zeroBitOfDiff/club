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

`grades` is matched with a new data type that we are seeing in Elixir, lists! They are similar to arrays in C, however, these are do not just contain homogenous, the same, type of data. We cannot access them the same way as arrays but in this case, we won't worry about that! However, do remember that order **does** matter!

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

With our additions, you may notice that we separate out our functions to do specific tasks. This is important in functional programming. We want things to be rather distinct and want to be able to say, "I know exactly where we are failing", and be able

- `def compute_mean(grades) do` - Here we want to make our logic simple, to compute the mean, we need to know the sum and then divide by the length of our given collection (list). That's all this function should do and that's all we see. Nice and simple! When we want to calculate our GPA, we will just use this function.
- `def gpa(letters) do` - This function will be the glue to get everything working. You notice, in this function, we are taking `letters`, so our collection which contains all of our letter grades. In this we also begin to make use of the `|>` (pipe) operator. With this we can say that whatever item in the previous expression will fill in the first parameter of the next function as if it were written explicitly there. It is a way to fluidly write out nested functions without having to store the variables along the way.
- `Enum.map(&(convert_ltog(&1)))` - It looks a tad messy but I promise it works just as the code we had before `Enum.map(grades, fn x -> Student.convert_ltog(x) end)`. The `&` in this case is a shorthand for an anonymous function. Above, we used `fn x -> ... end` to represent an anonymous function. They work the same way as named functions, except that there isn't a name associated with their definition so they get called relatively on the spot (unless we match them to a variable). As you remember, a higher-order function takes in a function in one of its parameters, so essentially we can make whatever function we'd like into the parameter without having to define one big ol' thing. Whenever you make use of `&`, you can assume any number of parameters getting passed in but each match with a numerical value so when we say `&1` we are talking about the first parameter given to us.

Once you have done that, you just go into your terminal, and you can just do:

    $ elixir test.ex
    3.625
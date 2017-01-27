---
title: Bash Workshop
slug: workshops/bash
template: workshop
author: Maxcell Wilson
---

Note: if you don't know some of the things in command line, our very first talk was about [command line](/workshops/command-line).

# What is a script?
Outside of technology, when we talk about scripts we associate those typically with a script of a play, movie, or TV show. The script is essentially the resource that actors have to know what they should say and do. Similarly for a computer, scripts tell the computer what it should say or do. As far as Bash scripts, we are telling what the Bash shell should do.

These Bash scripts can be plaintext files which contain a series of commands. These commands work on command line, but might not generally be something we type all the way out (you will soon see why). So key thing to take away, these commands work on both interfaces, command line and in a script, and do exactly the same thing.

# How do they work?
For those of you who care about trivia knowledge, here is some information about computers. However, you are more than fine to skip this part.

In Linux, there are programs and processes. A program is some blob of binary data consisting of instructions for the CPU and other resources put together and typically located on your hard disk. Programs don't actually "run", however, a copy of it is which is a process. This copy has its instructions and resources from hard disk copied into your RAM and then allocate space in RAM for it be ran, have variables managed and track the process in its execution.

# Hello World
If you head to your Terminal ([Cygwin](https://cygwin.com/install.html) for some of you!), let's write this _amazing_ script:

```bash
#!/usr/bin/env bash
# or
#!/user/bin/sh
# Basic Bash Script

echo "Hello World!"
```

And before continuing, let's be sure to break this down.
* `#!` - This is known as the **shebang**. This indicates what interpreter/program we are going to be using, along with where it should be located. It needs to be connected with

* `#` - Anything after this isn't executed.
* `echo "some text"` - will print out a message to our screen.

We are going to save this small script as `hello.sh` and then go to Terminal again and try to execute it:
```bash
$ ./hello.sh
bash: permission denied: ./hello.sh
$ ls -l hello.sh
-rw-r--r--  1 Prince  staff  33 Jan 27 13:41 hello.sh
$ chmod 755 hello.sh
$ ls -l hello.sh
-rwxr-xr-x  1 Prince  staff  33 Jan 27 13:41 hello.sh
$ ./hello.sh
Hello World!
```

**Hold up**. Why is there a `./` before our file? Well, for now, understand that the computer would try to find the command across our `$PATH`. But since this isn't something we have added, it will come up with nothing. So by being explicit that this file is here, we are able to increase the safety, have several different versions of our program, and also it is just convenient.

# Variables
Let's try making a script that allows us to copy one variable into another.
```bash
#!/usr/bin/env bash
# or
#!/user/bin/sh
# Copies a variable into another

cp $1 $2

echo "Details for $2"
ls -lh $2
```

So what's happening here?
* `cp $1 $2` - We are 'copying' the contents of one file into another file.
* `echo "Details for $2"` - Here we are letting our users know what we are checking (the second argument to the script)
* `ls -lh $2` - Finally we are going to be checking out the detailed information and give us the memory size as human readable.

So our output looks something like:
```bash
$ ./copy.sh file1.txt file3.txt
Details for file3.txt
-rw-r--r--  1 Prince  staff    28B Jan 27 17:05 file3.txt
```

Other neat special variables are as follows:
* `$0` - Name of the script
* `$1 - $9` - The first 9 arguments to our script
* `$#` - The number of arguments passed to our script
* `$@` - All arguments supplied to the script
* `$RANDOM` - a different random number each time it is referred to
* `$LINENO` - current line number

# Conditionals
If you have done programming before, you are probably going to be familiar with these already. `if` statements will always end with a `fi`. Not too confusing right? If you need an `else`, it is the same, as `else`. However, if you need to check for another conditional, you would need to do `elif` or else if.

```bash
#!/usr/bin/env bash
#or
#!/user/bin/sh
# Basic if statement

if [ $1 -gt 10 ]
then
  echo "Welp, you guessed a larger number than me."
else
  echo "Nice try."
fi
```

```bash
#!/usr/bin/env bash
#or
#!/user/bin/sh
# Name based components

name="$1"
echo -n "$name, "
if [[ "$name" == "Prince" ]]
then
  echo "you suck."
elif [[ "$name" == * ]]
then
  echo "a very cool person."
fi
```

# Loops
Structures that let us continue on till we have met our conditionals!

So `while` loops! You continue `while` the condition is true.
```bash
#!/usr/bin/env bash
#or
#!/user/bin/sh

counter=1
while [ $counter -le 10 ]
do
  echo "$counter"
  ((counter++))
done

echo "All done!"
```

`until` loops! You continue until something is met. Similar yet in the reverse.
```bash
#!/usr/bin/env bash
#or
#!/user/bin/sh

counter=1
until [ $counter -gt 10 ]
do
  echo "$counter"
  ((counter++))
done

echo "All done!"
```

`for` loops will go through a given list and do the instructions on the items on that list.
```bash
#!/usr/bin/env bash
#or
#!/user/bin/sh

echo "List of students:"

names='Prince Steve Adam'
for name in $names
do
  echo $name
done
```

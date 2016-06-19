# UnleakJS
JavaScript Library to fix memory leak issues.

## Use
Download the source code, and set in your HTML page.

```HTML
  <script src="build/unleak.js" charset="utf-8"></script>
```
then, you can use ```setInterval```s any time, and don't worry about memory leak the lib will clear it to you.

## Built-in functions.
When you use UnleakJS the variable ```unleakjs``` became available to you, and the lib override ```setIterval``` and ```clearInterval``` functions to manage memory, and don't worry, it will not crash your current application, the functions still with their originals arguments.

You can cancel the interval anytime. look the examples.

* *Canceling by method*
```JavaScript
  var a = setInterval(function(){ ...CODE... }, 500);
  a.clear();
```

* *Canceling by clearInterval*
```JavaScript
  var a = setInterval(function(){ ...CODE... }, 500);
  clearInterval(a);
```

if you get crazy and want delete all timers in your code, you can use
```JavaScript
unleakjs.clearIntervals();
```

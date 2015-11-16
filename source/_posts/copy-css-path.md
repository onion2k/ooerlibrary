title: Copy CSS Path
s: copy-css-path
date: 2015-11-13 08:02:26
tags: [javascript, frontend, css]
---
One of the most useful aspects of Chrome's dev tools is the 'Copy CSS Path' option available in the context menu. With a selected element it looks up the DOM tree and generators a selector for each level until it has a unique reference to that specific element.

One problem with Chrome though is that this function is only available from the context menu; it's not available from either the console or in the page context.

This code replicates the function so you can use it in a script.

```javascript
function copyCssPath(<element>){
    return path;
}
```
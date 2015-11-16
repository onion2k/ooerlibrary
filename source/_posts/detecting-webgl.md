title: Detecting WebGL
date: 2015-11-14 14:40:20
tags: [javascript, frontend, webgl]
---
While WebGL is available in most modern browsers there is still a requirement to check whether it's available for users on older versions. Unfortunately it's not simply a case of checking if the API is available as some browsers report is as being there even when it's not available.

```javascript
var detectWebGl = function() {
    try {
        return (!!window.WebGLRenderingContext && 
                !!document.createElement('canvas').getContext('experimental-webgl'));
    } catch(e) {
        return false;
    }
}
```
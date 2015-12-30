title: twinsticks.js
date: 2015-12-28 09:31:03
tags:
---
A sub-genre of shoot'em'up games is the 'twin stick shooter', where the player controls a character's direction of motion with one control stick and the direction they're firing in with a second. This type of game was pioneered with titles like SmashTV in the 1990s and perfected by games like Geometry Wars today.

twinsticks.js is a library that affords a game developer a quick and simple way of using the twin sticks game mechanic by using two on-screen virtual joysticks, one on the left side and one on the right side of the screen. The user can press anywhere they feel comfortable, and the motion is calculated from their initial press.
<!-- more -->
<div id="game" style="position: relative; width: 100%; height: 400px; border: 1px solid #888; margin: 10px 0;">

<canvas id="stage" width=100 height=100 style="position: absolute; top:0px; left:0px; bottom:0; right:0;"></canvas>
<canvas id="controller" width=100 height=100 style="position: absolute; top:0px; left:0px; bottom:0; right:0;"></canvas>

<div id="inputLeft" style="position:absolute; top:0;left:0;bottom:0;right:50%;"></div>
<div id="inputRight" style="position:absolute; top:0;left:50%;bottom:0;right:0;"></div>

</div>
<script src="/js/hammer.js"></script>
<script src="/code/twinsticks.js"></script>
```js
Coming soon
```
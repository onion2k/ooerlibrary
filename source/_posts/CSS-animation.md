title: CSS Animation
date: 2015-12-14 08:06:43
tags:
---
Using CSS to make things move is a much better approach than JS animation, but with a particular caveat - you should only animate attributes that are calculated on the GPU. Modifying a transform is fine, it'll be fast and it won't cause a repaint. Modifying _anything else_ is a bad idea.
<!-- more -->
<link rel="stylesheet" href="/code/css-animation.css">
<div id="wrapper"><article><h1>Ooer.com<h1></article></div>
```css

    div#wrapper {
    	position: absolute;
    	top: 0;
    	left: 0;
    	right: 0;
    	bottom: 0;
    	background-color: #BBB;
    }

    h1 {
    	font-size: 48.0rem;
    	font-family: Phosphate;
    	color: #FFF;
	    transform: translateZ(0);
    }

    article {
    	position: absolute;
    	top: 50%;
    	left: 50%;
    	transform: translate(-50%, -50%) rotate(-5deg);
    }

    article > h1 {
    	animation: slideright 5s infinite;
		-webkit-animation-timing-function: linear; /* Chrome, Safari, Opera */
    	animation-timing-function: linear;
    }

	@-webkit-keyframes slideright {
    	0% { transform: translate(-130%); }
    	20% { transform: translate(-10%); }
    	80% { transform: translate(10%); }
    	100% { transform: translate(130%); }
    }

```
/**
 * Main.js
 * @global ParallaxScroller => parallax_scroller
 * @desc Listens until DOMContentLoaded event to initialize ParallaxScroller
 */ 
'use strict';

let parallax_scroller;

document.addEventListener("DOMContentLoaded", () => parallax_scroller = new ParallaxScroller());
overlay
=======

A lightweight and flexible jQuery/Zepto plugin to show an overlay in the page.

Documents and examples see: [http://alex1990.github.io/overlay](http://alex1990.github.io/overlay).

Usage
-----

It's easy to use it. As the below code: 

```js
$(function(){
    // By default, overlay is hidden.
    var overlay = new Overlay();
})
```

The above code will generate an element: `<div class="overlay"></div>`.

Custom style:

```js
$(function(){
    var overlay = new Overlay({
        backgroundColor: '#fff',
        opacity: 0.5,
        zIndex: 999
});
```
**Note:** If you're using Zepto, then the [fx](https://github.com/madrobby/zepto/blob/master/src/fx.js#files) module must be included.

More introduction and examples see: [http://alex1990.github.io/overlay](http://alex1990.github.io/overlay)

Packages
--------

You can use `npm` or `bower` to install it.

**NPM:**

```bash
npm install simple-overlay
```

**Bower:**

```bash
bower install simple-overlay
```

Issues
------

If you come across bugs or usage problems, welcome to submit an issue in here:
[https://github.com/Alex1990/overlay/issues](https://github.com/Alex1990/overlay/issues)

License
-------

Under the [MIT License](https://github.com/Alex1990/overlay/blob/master/LICENSE).

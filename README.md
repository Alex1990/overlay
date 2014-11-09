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

The above code will generate an element: `&lt;div class="overlay"&gt;&lt;/div&gt`.

Custom style:

```js
$(function(){
    var overlay = new Overlay({
        backgroundColor: '#fff',
        opacity: 0.5,
        zIndex: 999
});
```

More introduction and examples see: [http://alex1990.github.io/overlay](http://alex1990.github.io/overlay)

Issues
------

If you come cross a bug or a usage prolem, welcome to submit a issue in here:
[https://github.com/Alex1990/overlay/issues](https://github.com/Alex1990/overlay/issues)

License
-------

Under the [MIT License](https://github.com/Alex1990/overlay/blob/master/LICENSE).
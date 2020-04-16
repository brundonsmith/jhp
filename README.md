
# What is this?

JavaScript template strings work pretty elegantly for HTML rendering, but 
setting up and working on a JavaScript web server, while fairly simple, doesn't 
quite match the delightful simplicity of doing the same with PHP.

This project aims to recreate that PHP experience, in JavaScript.

# Usage

## Running the server
```bash
npx jhp-serve ./my-proj  # Assumes you have Node/npm installed
```

## Project structure

Example:
```
my-proj/
  index.html.js
  about.html.js
  contact.html.js
```

```javascript
// index.html.js

module.exports = (req) =>
  `<h1>Hello!</h1>
   <p>
     Thanks for visiting the page at ${req.path}
   </p>`
```

A jhp project is just a directory containing `.html.js` files and/or static 
files. `.html.js` files are analogous to `.php` files, in that each handles one
route and (usually) renders one page. For both kinds of files, the route is the 
same as the subdirectory relative to the project root. You do not need to 
restart the server to test changes made to your `.html.js` files.

Each `.html.js` file exports a single function which returns either an HTML 
string, or a Promise of an HTML string. The latter is useful if, for example,
you need to query a database before rendering the HTML.

Render functions are passed two optional arguments, `req` and `res`, which are 
the ExpressJS [Request](https://expressjs.com/en/4x/api.html#req) and 
[Response](https://expressjs.com/en/4x/api.html#res) objects. The response's 
content type has already been set to HTML, so that the common case of returning 
an HTML string doesn't have to mess with it. The request body is parsed as being
"form-encoded", meaning it will work as expected for native HTML forms.

Your `.html.js` files are just regular JavaScript files, so you can import 
libraries or do whatever additional logic you may want to do in them.

A full example site can be found here: 
[https://github.com/brundonsmith/jhp-example-site](https://github.com/brundonsmith/jhp-example-site)

# Tips

Your JavaScript functions can construct their HTML strings in whatever way you
choose, but for the most PHP-like experience I recommend using arrow functions 
with template string literals for basic cases.

When it comes to syntax highlighting of the HTML itself, your mileage may vary 
depending on your editor. From a quick search it appears that Atom may have this 
built-in. VSCode at least has some great extensions that give the template 
strings first-class status as HTML code including syntax highlighting, 
formatting, autocomplete, etc. Here are a couple of them:

- [lit-html](https://marketplace.visualstudio.com/items?itemName=bierner.lit-html)
- [es6-string-html](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html)

If you plan on having additional server code, I recommend making your JHP site
a subdirectory of your overall project, so that your server code and config 
files aren't served publicly on the web.
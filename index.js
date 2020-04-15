#!/usr/bin/env node

const path = require('path')
const fs = require('fs')
const express = require('express')
const app = express()

// root path of the website's files
const SITE = path.resolve(process.argv[2] || process.cwd())



app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
  let route = req.path.substr(1) || 'index';
  if(!route.match(/.*\.html\.js$/)) {
    route += '.html.js';
  }
  const filePath = path.resolve(SITE, route)

  // try to find an .html.js file
  if(fs.existsSync(filePath)) {

    // Load the JS code and then clear it from the module cache. This is so that
    // the .html.js file is re-loaded fresh on each request, which is a classic 
    // PHP feature and helpful for development.
    const handler = require(filePath)
    delete require.cache[filePath]

    res.set('Content-Type', 'text/html')

    // Call the template file and then send the result
    Promise.resolve(handler(req, res))
      .then(result => res.send(result))
  } else {

    // fall back to static serving
    next()
  }
})

app.use(express.static(SITE))



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(
`JHP server available at localhost:${PORT}
Serving files under ${SITE}`
))

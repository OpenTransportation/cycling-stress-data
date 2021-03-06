#! /usr/bin/env node

const fs = require('fs')
const meow = require('meow')
const cyclingStressData = require('../')
const cli = meow(`
  Usage:
    $ cycling-stress-data <qa-tiles>
  Options:
    --output    [cycling-stress-data] Filepath to store outputs
    --bbox      Excludes QATiles by BBox
    --tiles     Excludes QATiles by an Array of Tiles
    --debug     [false] Enables DEBUG mode
  Examples:
    $ cycling-stress-data latest.planet.mbtiles
    $ cycling-stress-data latest.planet.mbtiles --tiles [[654,1584,12]]
    $ cycling-stress-data latest.planet.mbtiles --bbox [-122.5,37.6,-122.1,37.9]
`, {
  boolean: ['debug']
})

// Handle user Inputs
if (!cli.input[0]) throw new Error('must provide a QA Tiles filepath')
const mbtiles = cli.input[0]
if (!fs.existsSync(mbtiles)) throw new Error(mbtiles + ' does not exists')

// Handle Options
const options = cli.flags

// BBox
if (options.bbox) {
  options.bbox = JSON.parse(options.bbox)
  if (options.bbox && options.bbox.length !== 4) throw new Error('invalid bbox')
}

// Tiles
if (options.tiles) {
  options.tiles = JSON.parse(options.tiles)
  if (!Array.isArray(options.tiles[0]) || options.tiles[0].length !== 3) throw new Error('invalid tiles')
}

cyclingStressData(mbtiles, options)

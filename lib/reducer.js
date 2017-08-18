const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const write = require('write-json-file')
const bboxPolygon = require('@turf/bbox-polygon')
const globalMercator = require('global-mercator')
const qaTilesFilter = require('./qa-tiles-filter')
const {featureCollection} = require('@turf/helpers')

// Globals
const debug = global.mapOptions && global.mapOptions.debug
const output = global.mapOptions && global.mapOptions.output

// QA Tile reducer script
module.exports = (sources, tile, writeData, done) => {
  // Main processing
  const quadkey = globalMercator.googleToQuadkey(tile)
  const features = sources.qatiles.osm
  const highways = qaTilesFilter(tile, features)

  // Create folder if does not exist
  if (!fs.existsSync(output)) mkdirp.sync(output)

  // Output Features for Testing purposes
  if (debug) {
    const debugPath = path.join(output, quadkey) + path.sep

    // GeoJSON
    write.sync(debugPath + 'highways.geojson', featureCollection(highways))
    write.sync(debugPath + 'tile.geojson', bboxPolygon(globalMercator.googleToBBox(tile)))

    // Additional Information
    write.sync(debugPath + 'stats.json', {
      tile,
      quadkey,
      features: features.length,
      highways: highways.length
    })
  }
  // Output Results
  if (highways.length) fs.writeFileSync(path.join(output, quadkey + '.geojson'), featureCollection(highways))
  done(null, highways)
}

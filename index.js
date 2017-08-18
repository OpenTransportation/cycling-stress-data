const path = require('path')
const mkdirp = require('mkdirp')
const tileReduce = require('tile-reduce')
const globalMercator = require('global-mercator')

/**
 * Cycling Stress Data builder from OSM QA Tiles
 *
 * @param {string} mbtiles filepath to QA Tiles
 * @param {*} [options] extra options
 * @param {BBox} [options.bbox] Filter by BBox
 * @param {string} [options.output="cycling-stress-data"] directory to store outputs results
 * @param {Tile[]} [options.tiles] Filter by Tiles
 * @param {boolean} [options.debug=false] Enables DEBUG mode
 * @returns {EventEmitter} tile-reduce EventEmitter
 */
module.exports = function (mbtiles, options) {
  options = options || {}
  const output = options.output || 'cycling-stress-data'
  const debug = options.debug

  // Create folder if not exists
  mkdirp.sync(output)

  // Tile Reduce options
  Object.assign(options, {
    zoom: 12,
    map: path.join(__dirname, 'lib', 'reducer.js'),
    sources: [{name: 'qatiles', mbtiles, raw: true}],
    mapOptions: {
      output,
      debug
    }
  })
  const ee = tileReduce(options)

  // Execute the following after each tile is completed
  ee.on('reduce', (result, tile) => {
    const quadkey = globalMercator.googleToQuadkey(tile)
    console.log('processing quadkey', quadkey)
  })
  ee.on('end', () => {
    console.log('done')
  })
  return ee
}

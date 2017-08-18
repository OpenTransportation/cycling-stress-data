/**
 * Filter to (Multi)LineString & remove extra properties
 *
 * @param {Array<number>} tile The [x,y,z] tile the features exist in
 * @param {object} features VectorTile layer of Features from a single OSM QA Tile
 * @returns {Array<Feature>} filtered Features to only (Multi)LineString
 * @example
 * const lines = filterQATiles(features)
 */
module.exports = function (tile, features) {
  const results = []
  for (let i = 0; i < features.length; i++) {
    const feature = features.feature(i)

    // Only include lines
    if (feature.type !== 2) continue

    // Only include highway OSM data
    if (!feature.properties.highway) continue

    // Only include highway OSM data
    // if (['primary', 'trunk', 'secondary', 'motorway', 'tertiary'].indexOf(feature.properties.highway) === -1) continue

    // Convert Vector Tile to GeoJSON
    const geojson = feature.toGeoJSON(tile[0], tile[1], tile[2])
    results.push(geojson)
  }
  return results
}

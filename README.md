# Cycling Stress Data - LTS (Level of Traffic Stress)

## Scripts

```
$ wget https://s3.amazonaws.com/mapbox/osm-qa-tiles/latest.country/canada.mbtiles.gz
$ gzip -d canada.mbtiles.gz
$ mobile-map-builder --bbox ottawa --url canada.mbtiles --min 12 --max 12 --name osm-qa-tiles --format pbf --attribution OpenStreetMap --description "OSM QATiles for Ottawa" ottawa.mbtiles --verbose
$ aws s3 cp ottawa.mbtiles s3://opentransportation.io/osm-qa-tiles/ottawa.mbtiles
```

## Tippecanoe

```
SOURCE=ottawa

# Highways
tippecanoe \
    --output=$SOURCE-highways.mbtiles \
    --force \
    --layer ottawa-highways \
    --minimum-zoom 6 \
    --maximum-zoom 11 \
    --full-detail 21 \
    --drop-smallest-as-needed \
    --drop-densest-as-needed \
    --drop-fraction-as-needed \
    --simplify-only-low-zooms \
    $SOURCE.geojson

# Roads
tippecanoe \
    --output=$SOURCE-roads.mbtiles \
    --force \
    --layer ottawa-roads \
    --minimum-zoom 11 \
    --maximum-zoom 14 \
    --full-detail 18 \
    --drop-smallest-as-needed \
    --drop-densest-as-needed \
    --drop-fraction-as-needed \
    --simplify-only-low-zooms \
    $SOURCE.geojson
```

## References

- https://www.ocf.berkeley.edu/~jlynn/bikemap/
- https://civicdata.wordpress.com/2013/02/24/cyclist-level-of-comfort-in-berkeley/
- https://tack-n.ca/
- https://wiki.openstreetmap.org/wiki/Canada:Ontario:Ottawa#Useful_info_for_Ottawa_mappers
- https://osmlab.github.io/osm-qa-tiles/

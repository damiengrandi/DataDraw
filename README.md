DataDraw
========

Data visualisation JS API for Google Maps

![View](/../images/view.png?raw=true "View")

Dependencies : 
	CanvasLayer.js (from google maps utility library v3), 
	Google Maps API v3, 
    proj4js

A demo is available here : http://forefire.univ-corse.fr/wind

Example of use (Scalars) :
--------------

```javascript

var data = {
  type: "scalar",
  units: "m",
  projection: "EPSG:2154",
  gridWidth: 4,
  gridHeight: 2,
  xll: 1153987.5,
  xlr: 1177537.5,
  xul: 1153987.5,
  xur: 1177537.5,
  yll: 6144312.5,
  ylr: 6144312.5,
  yul: 6172112.5,
  yur: 6172112.5,
  field: [10, 10, 5, 5, 5, 5, 10, 10]
}

function update()
{
  if (!datadraw.field) {
    return;
  }

  datadraw.cleanCanvas();
  datadraw.drawVector(20, false);
}

datadraw = new DataDraw(map, update);
datadraw.setColorMap(colorFactory.Maps.spring);
datadraw.loadData(data);
```

shows :

![Scalar](/../images/scalar_example.png?raw=true "Scalar Example without interpolation")

representing a grid that looks like : 

```javascript
[ 10 , 5 , 5 , 10 ]
[ 10 , 5 , 5 , 10 ]
```


Example of use (Vectors) :
--------------

```javascript

var data = {
  type: "vector",
  units: "m/s",
  projection: "EPSG:2154",
  gridWidth: 3,
  gridHeight: 2,
  xll: 1153987.5,
  xlr: 1177537.5,
  xul: 1153987.5,
  xur: 1177537.5,
  yll: 6144312.5,
  ylr: 6144312.5,
  yul: 6172112.5,
  yur: 6172112.5,
  field: [2, 2, 2, 2, 2, 5, 2, 5, 1.5, 8, 1.5, 8]
}

function update()
{
  if (!datadraw.field) {
    return;
  }

  datadraw.cleanCanvas();
  datadraw.drawScalar(50, false);   // Draw the module
  datadraw.drawVector(60, false);
}

datadraw = new DataDraw(map, update);
datadraw.setColorMap(colorFactory.Maps.spring);
datadraw.loadData(data);
```

shows :

![Scalar](/../images/vector_example.png?raw=true "Vector Example without interpolation")

representing a grid that looks like : 

```javascript
[ [2, 2] , [2, 5] , [1.5, 8] ]
[ [2, 2] , [2, 5] , [1.5, 8] ]
```

**You can display particles instead of vectors if you want :**

```javascript
function update()
{
  if (!datadraw.field) {
    return;
  }

  datadraw.cleanCanvas();
  datadraw.drawParticles(5);
}

datadraw = new DataDraw(map, update);
/* 
 * Set animate to "true" will make the "update" function be called in a loop
 * It's necessary if you want to draw particles because they have to move
 */
datadraw.setAnimate(true);
datadraw.setColorMap(colorFactory.Maps.spring);
datadraw.loadData(data);
```
![Particles](/../images/particles_example.png?raw=true "Particles Example")

If you specify a screen position (pixels from the top-left corner of your browser) you can get this :
```javascript
function update()
{
  if (!datadraw.field) {
    return;
  }

  datadraw.cleanCanvas();
  data.drawParticles(5, 0, 20);  // Origin of particles (X: 0px Y: 20px)
}
```
![Particles at Position](/../images/particles_pos_example.png?raw=true "Particles at Position Example")


Data format :
--------------

```javascript
{
  type:         // "vector" or "scalar"   
  units:        // will be shown in the legend (see datadraw.drawLegend)
  projection:   // projection system, "EPSG:XXXXX"
  gridWidth:    // number of rows
  gridHeight:   // number of cols

  /* Corners of the field, in the projection system specified */
  xll: // X lower left
  xlr: // X lower right
  xul: // X upper left
  xur: // X upper right

  yll: // Y lower left
  ylr: // Y lower right
  yul: // Y upper left
  yur: // Y upper right


  field:        // Depending of the type, see examples above
}
```
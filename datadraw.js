/*
 * Authors & Contributors: 
 *  GRANDI Damien <damiengrandi AT gmail DOT com>
 *  FILIPPI Jean-Baptiste <battifilippi AT gmail DOT com>
 *  BOSSEUR Frederic <fbosseur AT gmail DOT com>
 * 
 * This file is part of DataDraw JS.
 *
 * DataDraw JS is free software: you can redistribute it
 * and/or modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation, either version 3 of
 * the License, or (at your option) any later version.
 *
 * DataDraw JS is distributed in the hope that it will be
 * useful, but WITHOUT ANY WARRANTY; without even the implied warranty
 * of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with DataDraw JS.  If not, see
 * <http://www.gnu.org/licenses/>.
 */

/**
 * Class to build a set of colors corresponding to a range of values
 * @class 
 * @param {colorFactory.Maps} style Map of color to use
 * @param {Number} min Value corresponding to the first color
 * @param {Number} max Value corresponding to the last color
 * @param {Number} number Number of colors to build
 */
function colorFactory(style, min, max, number)
{
    this.maxIndex = number - 1;
    this.min = min;
    this.max = max;

    this.getColorForValue = function(value)
    {
        var index = Math.floor((value - this.min) / (this.max - this.min) * this.maxIndex);

        return {
            'r': this.colors.r[index],
            'g': this.colors.g[index],
            'b': this.colors.b[index]
        };
    };

    this.getColorForPercent = function(percent)
    {
        var index = Math.floor(this.maxIndex / 100 * percent);
        var value = ((this.max - this.min) * percent / 100) - this.min;

        return {
            'r': this.colors.r[index],
            'g': this.colors.g[index],
            'b': this.colors.b[index],
            'value': value
        };
    };

    this.buildColors = function(map, number)
    {
        var res = {'r': [], 'g': [], 'b': []};
        var keys = ['r', 'g', 'b'];

        for (var i = 0; i < keys.length; i++)
        {
            var t1 = map[keys[i]][0].map(function(x) {
                return Math.round(x * number);
            });

            var t2 = map[keys[i]][1].map(function(x) {
                return x * 255;
            });

            res[keys[i]] = this.lines(t1, t2).map(Math.round);
        }

        return res;
    };

    this.lines = function(xt, yt)
    {
        var a = [];

        for (var i = 0; i < xt.length - 1; i++) {
            a = a.concat(this.linspace(yt[i], yt[i + 1], xt[i + 1] - xt[i]));
        }

        return a;
    };

    this.linspace = function(from, to, len)
    {
        if (len == 1) {
            return [(to + from) / 2];
        }

        var arr = [];
        var step = (to - from) / (len - 1);

        for (var i = 0; i < len; i++) {
            arr[i] = from + (i * step);
        }

        return arr;
    };

    this.colors = this.buildColors(style, number);
}

colorFactory.Maps = {
    jet: {
        r: [
            [0.000, 0.376, 0.627, 0.878, 1.000]
                    , [0.000, 0.016, 1.000, 0.984, 0.500]
        ]
        , g: [
            [0.000, 0.125, 0.376, 0.627, 0.878, 1.000]
                    , [0.000, 0.016, 1.000, 0.984, 0.000, 0.000]
        ]
        , b: [
            [0.000, 0.125, 0.376, 0.627, 1.000]
                    , [0.516, 1.000, 0.984, 0.000, 0.000]
        ]

    }
    , hsv: {
        r: [
            [0.000, 0.169, 0.173, 0.337, 0.341, 0.671, 0.675, 0.839, 0.843, 1.000]
                    , [1.000, 0.992, 0.969, 0.000, 0.000, 0.008, 0.031, 1.000, 1.000, 1.000]
        ]
        , g: [
            [0.000, 0.169, 0.173, 0.506, 0.671, 0.675, 1.000]
                    , [0.000, 1.000, 1.000, 0.977, 0.000, 0.000, 0.000]
        ]
        , b: [
            [0.000, 0.337, 0.341, 0.506, 0.839, 0.843, 1.000]
                    , [0.000, 0.016, 0.039, 1.000, 0.984, 0.961, 0.023]
        ]

    }
    , hot: {
        r: [
            [0.000, 0.376, 1.000]
                    , [0.010, 1.000, 1.000]
        ]
        , g: [
            [0.000, 0.376, 0.753, 1.000]
                    , [0.000, 0.010, 1.000, 1.000]
        ]
        , b: [
            [0.000, 0.753, 1.000]
                    , [0.000, 0.016, 1.000]
        ]

    }
    , cool: {
        r: [
            [0.000, 1.000]
                    , [0.000, 1.000]
        ]
        , g: [
            [0.000, 1.000]
                    , [1.000, 0.000]
        ]
        , b: [
            [0.000, 1.000]
                    , [1.000, 1.000]
        ]

    }
    , spring: {
        r: [
            [0.000, 1.000]
                    , [1.000, 1.000]
        ]
        , g: [
            [0.000, 1.000]
                    , [0.000, 1.000]
        ]
        , b: [
            [0.000, 1.000]
                    , [1.000, 0.000]
        ]

    }
    , summer: {
        r: [
            [0.000, 1.000]
                    , [0.000, 1.000]
        ]
        , g: [
            [0.000, 1.000]
                    , [0.500, 1.000]
        ]
        , b: [
            [0.000, 1.000]
                    , [0.400, 0.400]
        ]

    }
    , autumn: {
        r: [
            [0.000, 1.000]
                    , [1.000, 1.000]
        ]
        , g: [
            [0.000, 1.000]
                    , [0.000, 1.000]
        ]
        , b: [
            [0.000, 1.000]
                    , [0.000, 0.000]
        ]

    }
    , winter: {
        r: [
            [0.000, 1.000]
                    , [0.000, 0.000]
        ]
        , g: [
            [0.000, 1.000]
                    , [0.000, 1.000]
        ]
        , b: [
            [0.000, 1.000]
                    , [1.000, 0.500]
        ]

    }
    , gray: {
        r: [
            [0.000, 1.000]
                    , [0.000, 1.000]
        ]
        , g: [
            [0.000, 1.000]
                    , [0.000, 1.000]
        ]
        , b: [
            [0.000, 1.000]
                    , [0.000, 1.000]
        ]

    }
    , bone: {
        r: [
            [0.000, 0.753, 1.000]
                    , [0.000, 0.661, 1.000]
        ]
        , g: [
            [0.000, 0.376, 0.753, 1.000]
                    , [0.000, 0.331, 0.784, 1.000]
        ]
        , b: [
            [0.000, 0.376, 1.000]
                    , [0.001, 0.454, 1.000]
        ]

    }
    , copper: {
        r: [
            [0.000, 0.804, 1.000]
                    , [0.000, 1.000, 1.000]
        ]
        , g: [
            [0.000, 1.000]
                    , [0.000, 0.781]
        ]
        , b: [
            [0.000, 1.000]
                    , [0.000, 0.497]
        ]

    }
};

/**
 * Class handling data drawing
 * @class
 * @param {google.maps.Map} map Google Maps instance
 * @param {function} update Function to call at each draw
 */
var DataDraw = function(map, update)
{
    this.field;
    this.projection = "";
    this.type = "scalar";
    this.units = "";
    this.map = map;
    this.src = null;
    this.update = update;
    this.colorMap = colorFactory.Maps.hsv;
    this.colors = null;
    this.particles = new Array(1000);
    this.positions = [];
    this.nbpos = 0;

    this.canvasLayer = new CanvasLayer({
        map: map,
        resizeHandler: DataDraw.dummy,
        animate: false,
        updateHandler: update
    });

    this.context = this.canvasLayer.canvas.getContext('2d');
};

DataDraw.prototype.loadData = function(data)
{
    this.projection = data.projection;
    this.type = data.type;
    this.units = data.units;
    var me = this;
    var i = 0;

    if (data.type == "vector")
    {
        this.field = new DataDraw.VectorField();
        for (var x = 0; x < data.gridWidth; x++)
        {
            this.field.addRow();
            for (var y = 0; y < data.gridHeight; y++)
            {
                this.field.add(data.field[i++], data.field[i++]);
            }
        }
    }
    else if (data.type == "scalar")
    {
        this.field = new DataDraw.ScalarField();
        for (var x = 0; x < data.gridWidth; x++)
        {
            this.field.addRow();
            for (var y = 0; y < data.gridHeight; y++)
            {
                this.field.add(data.field[i++]);
            }
        }
    }
    this.field.setCorners(data.xll, data.yll, data.xul, data.yul, data.xur, data.yur, data.xlr, data.ylr);
    this.field.dataGathered();
    this.cleanCanvas();
    this.colors = new colorFactory(this.colorMap, this.field.minLength, this.field.maxLength, 50);

    if (typeof Proj4js.defs[data.projection] === "undefined")
    {
        Proj4js.loadScript("http://spatialreference.org/ref/epsg/" + this.projection.slice(5) + "/proj4js/", function() {
            me.src = new Proj4js.Proj(me.projection);
            me.update();
        });
    }
    else
    {
        this.src = new Proj4js.Proj(this.projection);
        this.update();
    }
};

//==============================================================================
// Misc
//==============================================================================

DataDraw.dummy = function() {
};

DataDraw.prototype.setAnimate = function(animated)
{
    this.canvasLayer.setAnimate(animated);
};

DataDraw.prototype.cleanCanvas = function()
{
    this.context.clearRect(0, 0, this.canvasLayer.canvas.width, this.canvasLayer.canvas.height);
};

DataDraw.prototype.setColorMap = function(map)
{
    this.colorMap = map;
    if (this.field) {
        this.colors = new colorFactory(this.colorMap, this.field.minLength, this.field.maxLength, 50);
        this.update();
    }
};

DataDraw.prototype.drawLegend = function(canvas, w, opt_fixed, opt_withoutUnits)
{
    if (!this.field) {
        return;
    }

    var ctx = canvas.getContext("2d");
    var h = canvas.height;
    ctx.clearRect(0, 0, canvas.width, h);
    var fixed = opt_fixed || 0;
    var withoutUnits = opt_withoutUnits || false;
    var nb = 50;
    var inc = 100 / nb;

    for (var i = 0; i < 100; i += inc)
    {
        var c = this.colors.getColorForPercent(i);
        ctx.fillStyle = "rgb(" + c.r + "," + c.g + "," + c.b + ")";
        ctx.fillRect(0, h - ((h / inc) * (i / nb)), w, h / nb);
    }

    ctx.font = "20px Arial";
    ctx.fillStyle = "rgb(255,255,255)";
    if (withoutUnits)
    {
        ctx.fillText(this.field.maxLength.toFixed(fixed).toString(), w, 20);
        ctx.fillText(this.field.minLength.toFixed(fixed).toString(), w, h - 3);
    }
    else
    {
        ctx.fillText(this.field.maxLength.toFixed(fixed).toString() + " " + this.units, w, 20);
        ctx.fillText(this.field.minLength.toFixed(fixed).toString() + " " + this.units, w, h - 3);
    }
};

//==============================================================================
// Field
//==============================================================================

/**
 * Represents a Field of Data
 * @class
 */
DataDraw.Field = function()
{
    this.data = [];
    this.minLength = Infinity;
    this.maxLength = -Infinity;
    this.rows = 0;
    this.cols = 0;
    this.corners;
    this.pxIndexes;
    this.pyIndexes;
};

DataDraw.Field.prototype.exact = function(i, j)
{
    var na = Math.floor(i);
    var nb = Math.floor(j);
    return this.data[na][nb];
};

DataDraw.Field.prototype.setCorners = function(xll, yll, xul, yul, xur, yur, xlr, ylr)
{
    this.corners = {
        xll: xll, yll: yll,
        xul: xul, yul: yul,
        xur: xur, yur: yur,
        xlr: xlr, ylr: ylr
    };
};

DataDraw.Field.prototype.getIndexesFromCoords = function(x, y)
{
    var i = (x - this.corners.xll) / this.pxIndexes;
    var j = (y - this.corners.yll) / this.pyIndexes;

    i = i < 0 ? 0 : i;
    j = j < 0 ? 0 : j;
    i = i > this.cols - 1 ? this.cols - 1 : i;
    j = j > this.rows - 1 ? this.rows - 1 : j;

    return {
        i: i,
        j: j
    };
};

DataDraw.Field.prototype.inBounds = function(x, y)
{
    return x >= this.corners.xll && x <= this.corners.xur && y >= this.corners.yll && y <= this.corners.yur;
};

DataDraw.Field.prototype.addRow = function()
{
    this.data[this.data.length] = [];
};

DataDraw.Field.prototype.add = function(value)
{
    var row = this.data[this.data.length - 1];
    row[row.length] = value;
};

DataDraw.Field.prototype.dataGathered = function()
{
    this.cols = this.data.length;
    if (this.cols > 0) {
        this.rows = this.data[0].length;
    }

    this.pxIndexes = Math.sqrt(Math.pow(this.corners.xur - this.corners.xul, 2) + Math.pow(this.corners.yur - this.corners.yul, 2)) / this.cols;
    this.pyIndexes = Math.sqrt(Math.pow(this.corners.xul - this.corners.xll, 2) + Math.pow(this.corners.yul - this.corners.yll, 2)) / this.rows;
};

//==============================================================================
// VectorField
//==============================================================================

/**
 * Represents a field of vectors
 * @class
 * @augments DataDraw.Field
 */
DataDraw.VectorField = function()
{
    DataDraw.Field.call(this);
    this.minX = Infinity;
    this.minY = Infinity;
    this.maxX = -Infinity;
    this.maxY = -Infinity;
    this.maxAbsX;
    this.maxAbsY;
    this.xRatio = 1;
    this.yRatio = 1;
};

DataDraw.VectorField.prototype = new DataDraw.Field;

DataDraw.VectorField.prototype.dataGathered = function()
{
    this.xRatio = this.maxX - this.minX;
    this.yRatio = this.maxY - this.minY;
    this.maxAbsX = Math.max(Math.abs(this.maxX), Math.abs(this.minX));
    this.maxAbsY = Math.max(Math.abs(this.maxY), Math.abs(this.minY));
    DataDraw.Field.prototype.dataGathered.call(this);
};

DataDraw.VectorField.prototype.add = function(vx, vy)
{
    this.minX = Math.min(this.minX, vx);
    this.minY = Math.min(this.minY, vy);
    this.maxX = Math.max(this.maxX, vx);
    this.maxY = Math.max(this.maxY, vy);
    this.minLength = Math.min(this.minLength, Math.sqrt(vx * vx + vy * vy));
    this.maxLength = Math.max(this.maxLength, Math.sqrt(vx * vx + vy * vy));
    DataDraw.Field.prototype.add.call(this, [vx, vy]);
};

DataDraw.VectorField.prototype.getValue = function(indexes, opt_interpolate)
{
    var v = this.getVector(indexes, opt_interpolate);
    return Math.sqrt(v[0] * v[0] + v[1] * v[1]);
};

DataDraw.VectorField.prototype.getVector = function(indexes, opt_interpolate)
{
    return (opt_interpolate) ? this.interpolate(indexes.i, indexes.j) : this.exact(indexes.i, indexes.j);
};

DataDraw.VectorField.prototype.interpolate = function(i, j)
{
    var na = Math.floor(i);
    var nb = Math.floor(j);
    var ma = Math.ceil(i);
    var mb = Math.ceil(j);
    var fa = i - na;
    var fb = j - nb;

    return [
        this.data[na][nb][0] * (1 - fa) * (1 - fb) +
                this.data[ma][nb][0] * fa * (1 - fb) +
                this.data[na][mb][0] * (1 - fa) * fb +
                this.data[ma][mb][0] * fa * fb,
        this.data[na][nb][1] * (1 - fa) * (1 - fb) +
                this.data[ma][nb][1] * fa * (1 - fb) +
                this.data[na][mb][1] * (1 - fa) * fb +
                this.data[ma][mb][1] * fa * fb
    ];
};

//==============================================================================
// ScalarField
//==============================================================================

/**
 * Represents a field of scalars
 * @class
 * @augments DataDraw.Field
 */
DataDraw.ScalarField = function()
{
    DataDraw.Field.call(this);
};

DataDraw.ScalarField.prototype = new DataDraw.Field;

DataDraw.ScalarField.prototype.add = function(v)
{
    this.minLength = Math.min(this.minLength, v);
    this.maxLength = Math.max(this.maxLength, v);
    DataDraw.Field.prototype.add.call(this, v);
};

DataDraw.ScalarField.prototype.getValue = function(indexes, opt_interpolate)
{
    return (opt_interpolate) ? this.interpolate(indexes.i, indexes.j) : this.exact(indexes.i, indexes.j);
};

DataDraw.ScalarField.prototype.interpolate = function(i, j)
{
    var na = Math.floor(i);
    var nb = Math.floor(j);
    var ma = Math.ceil(i);
    var mb = Math.ceil(j);
    var fa = i - na;
    var fb = j - nb;

    return this.data[na][nb] * (1 - fa) * (1 - fb) +
            this.data[ma][nb] * fa * (1 - fb) +
            this.data[na][mb] * (1 - fa) * fb +
            this.data[ma][mb] * fa * fb;
};

//==============================================================================
// Data finding
//==============================================================================

DataDraw.prototype.fromScreenToPoint = function(windowX, windowY)
{
    var pWGS = this.canvasLayer.getProjection().fromContainerPixelToLatLng(new google.maps.Point(windowX, windowY));
    return this.fromLatLngToPoint(pWGS.lat(), pWGS.lng());
};

DataDraw.prototype.fromPointToScreen = function(xProj, yProj)
{
    var pProj = new Proj4js.Point(xProj, yProj);
    Proj4js.transform(this.src, Proj4js.WGS84, pProj);
    var p = this.canvasLayer.getProjection().fromLatLngToContainerPixel(new google.maps.LatLng(pProj.y, pProj.x));

    return {
        x: p.x,
        y: p.y
    };
};

DataDraw.prototype.fromLatLngToPoint = function(lat, lng)
{
    var pProj = new Proj4js.Point(lng, lat);
    Proj4js.transform(Proj4js.WGS84, this.src, pProj);

    return {
        x: pProj.x,
        y: pProj.y
    };
};

//==============================================================================
// Scalars
//==============================================================================

DataDraw.prototype.drawScalar = function(size, opt_interpolate)
{
    var me = this;
    var opt_secondLoad = (opt_secondLoad === false) ? false : true;
    var canvasWidth = this.canvasLayer.canvas.width;
    var canvasHeight = this.canvasLayer.canvas.height;
    size = parseFloat(size);

    for (var i = 0; i < canvasWidth + size; i += size)
    {
        for (var j = 0; j < canvasHeight + size; j += size)
        {
            var point = this.fromScreenToPoint(i, j);
            if (this.field.inBounds(point.x, point.y))
            {
                var c = this.colors.getColorForValue(this.field.getValue(this.field.getIndexesFromCoords(point.x, point.y), opt_interpolate));
                this.context.beginPath();
                this.context.moveTo(i, j - size);
                this.context.lineTo(i, j);
                this.context.strokeStyle = "rgba(" + c.r + "," + c.g + "," + c.b + ", 0.3)";
                this.context.lineWidth = size;
                this.context.stroke();
            }
        }
    }
};

//==============================================================================
// Vectors
//==============================================================================

DataDraw.prototype.drawVector = function(size, opt_interpolate)
{
    if (this.type == "scalar") {
        return;
    }

    var canvasWidth = this.canvasLayer.canvas.width;
    var canvasHeight = this.canvasLayer.canvas.height;
    size = parseFloat(size);
    var xMax = this.field.maxAbsX / size;
    var yMax = this.field.maxAbsY / size;

    for (var i = 0; i < canvasWidth + size; i += size)
    {
        for (var j = 0; j < canvasHeight; j += size)
        {
            var point = this.fromScreenToPoint(i, j);
            if (this.field.inBounds(point.x, point.y))
            {
                var v = this.field.getVector(this.field.getIndexesFromCoords(point.x, point.y), opt_interpolate);
                var y = j - (size / 2);
                DataDraw.drawArrow(this.context, "rgba(0,0,0,1)", i, y, v[0] / xMax + i, v[1] / yMax + y);
            }
        }
    }
};

DataDraw.drawArrow = function(ctx, arrowColor, fromx, fromy, tox, toy)
{
    var angle = Math.atan2(toy - fromy, tox - fromx);
    ctx.beginPath();
    ctx.moveTo(fromx, fromy);
    ctx.lineTo(tox, toy);

    ctx.moveTo(tox, toy);
    ctx.lineTo(tox - 5 * Math.cos(angle - Math.PI / 8), toy - 5 * Math.sin(angle - Math.PI / 8));
    ctx.moveTo(tox, toy);
    ctx.lineTo(tox - 5 * Math.cos(angle + Math.PI / 8), toy - 5 * Math.sin(angle + Math.PI / 8));

    ctx.strokeStyle = arrowColor;
    ctx.lineWidth = 0.8;
    ctx.stroke();
};

//==============================================================================
// Particles
// 3 possibilities :
// - No position (this.position is empty) & call to drawParticles(size)
//      --> draw data everywhere
// - No position & call to drawParticles(size, x, y)
//      --> draw data from the x,y position on the screen (in pixels)
// - Pos(s) recorded (addPosition called before) & call to drawParticles(size)
//      --> draw data from multiples positions (call resetPositions() to empty)
//==============================================================================

/**
 * Represents a particle
 * @class
 * @param {Number} x WGS84 longitude
 * @param {Number} y WGS84 latitude
 * @param {Number} age number of cycles defining the lifetime of a particle
 * @param {Number} vrand offset from original position 
 */
DataDraw.Particle = function(x, y, age, vrand)
{
    this.x = x;
    this.y = y;
    this.nextX = -1;
    this.nextY = -1;
    this.age = age;
    this.vrand = vrand || [0, 0];
};

DataDraw.prototype.drawParticles = function(size, posX, posY)
{
    if (this.type == "scalar") {
        return;
    }

    this.context.lineWidth = 2;
    this.animate(posX, posY);

    for (var i = 0; i < this.particles.length; i++)
    {
        var p = this.particles[i];
        var point = this.fromScreenToPoint(p.x, p.y);
        var indexes = this.field.getIndexesFromCoords(point.x, point.y);
        var v = this.field.getVector(indexes);
        var s = this.field.getValue(indexes);
        var offsetX = (v[0] + p.vrand[0]) * size / this.field.xRatio;
        var offsetY = (v[1] + p.vrand[1]) * size / this.field.yRatio;
        p.nextX = p.x + (offsetX / 4);
        p.nextY = p.y + (offsetY / 4);

        var c = this.colors.getColorForValue(s);
        var o = 0.8 * s / this.field.maxLength;
        this.context.strokeStyle = "rgba(" + c.r + "," + c.g + "," + c.b + ", " + o + ")";
        this.context.beginPath();
        this.context.moveTo(p.x, p.y);
        this.context.lineTo(p.x + offsetX, p.y + offsetY);
        this.context.stroke();
    }
};

DataDraw.prototype.animate = function(x, y)
{
    for (var i = 0; i < this.particles.length; i++)
    {
        var p = this.particles[i];

        if (p == null)
        {
            this.particles[i] = this.makeParticle(x, y);
            continue;
        }

        p.age--;

        if (p.age > 0)
        {
            p.x = p.nextX;
            p.y = p.nextY;
        }
        else {
            this.particles[i] = this.makeParticle(x, y);
        }
    }
};

DataDraw.prototype.addParticlePositionFromLatLng = function(lat, lng)
{
    this.positions.push([lng, lat]);
};

DataDraw.prototype.addParticlePosition = function(x, y)
{
    var pWGS = this.canvasLayer.getProjection().fromContainerPixelToLatLng(new google.maps.Point(x, y));
    this.addParticlePositionFromLatLng(pWGS.lat(), pWGS.lng());
};

DataDraw.prototype.resetPositions = function()
{
    this.positions = [];
    this.nbpos = 0;
};

DataDraw.prototype.makeParticle = function(x, y)
{
    if (x != null && y != null)
    {
        var p = this.fromScreenToPoint(x, y);
        if (this.field.inBounds(p.x, p.y))
        {
            var vdiff = 8;
            return new DataDraw.Particle(x, y, 1 + 200 * Math.random(), [vdiff * (Math.random() - 0.5), vdiff * (Math.random() - 0.5)]);
        }
    }
    else if (this.positions.length != 0)
    {
        var px = this.canvasLayer.getProjection().fromLatLngToContainerPixel(new google.maps.LatLng(this.positions[this.nbpos][1], this.positions[this.nbpos][0]));
        var p = this.fromScreenToPoint(px.x, px.y);
        this.nbpos++;

        if (this.nbpos >= this.positions.length) {
            this.nbpos = 0;
        }

        if (this.field.inBounds(p.x, p.y))
        {
            var vdiff = 8;
            return new DataDraw.Particle(px.x, px.y, 1 + 200 * Math.random(), [vdiff * (Math.random() - 0.5), vdiff * (Math.random() - 0.5)]);
        }
    }

    while (true)
    {
        var px = (1 - Math.random()) * this.canvasLayer.canvas.width;
        var py = (1 - Math.random()) * this.canvasLayer.canvas.height;
        var p = this.fromScreenToPoint(px, py);

        if (this.field.inBounds(p.x, p.y))
        {
            return new DataDraw.Particle(px, py, 10 + 10 * Math.random());
        }
    }
};

DataDraw.prototype.setNumberOfParticles = function(nb)
{
    this.particles = new Array(nb);
};
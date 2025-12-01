// The main schematic namespace
var Schematic = (function () {
    var module = {};

    // Draws a resistor symbol with lead ends at (x1, y1) and (x2, y2).
    module.drawResistor = function (x1, y1, x2, y2, settings) {
        var context = settings.context;
        x2 = x2 - x1;
        y2 = y2 - y1;

        var angle  = Math.atan(y2 / x2);
        var length = Math.sqrt(Math.pow(x2, 2) + Math.pow(y2, 2));

        x2 = length;
        y2 = 0;

        var width = 1.5;
        var height = 0.4;
        bodyA = (x2 - width) / 2
        bodyB = bodyA + width;

        context.save();
        context.scale(settings.scale, settings.scale);
        context.translate(x1, y1);
        context.rotate(angle);
        context.beginPath();

        context.moveTo(0, 0);
        context.lineTo(bodyA, 0);

        context.rect(bodyA, -height/2, width, height);

        context.moveTo(bodyB, y2);
        context.lineTo(x2, y2);

        context.restore();
        context.fillStyle = "white";
        context.fill();
        context.strokeStyle = "black";
        context.stroke();
    }

    // Draws a capacitor symbol with lead ends at (x1, y1) and (x2, y2).
    module.drawCapacitor = function (x1, y1, x2, y2, settings) {
        var context = settings.context;
        x2 = x2 - x1;
        y2 = y2 - y1;

        var angle  = Math.atan(y2 / x2);
        var length = Math.sqrt(Math.pow(x2, 2) + Math.pow(y2, 2));

        var spacing = 0.25;
        bodyA = (length - spacing) / 2;
        bodyB = bodyA + spacing;

        context.save();
        context.scale(settings.scale, settings.scale);
        context.translate(x1, y1);
        context.rotate(angle);
        context.beginPath();

        context.moveTo(0, 0);
        context.lineTo(bodyA, 0);

        context.moveTo(bodyA, -0.5);
        context.lineTo(bodyA,  0.5);

        context.moveTo(bodyB, -0.5);
        context.lineTo(bodyB,  0.5);

        context.moveTo(bodyB, 0);
        context.lineTo(length, 0);

        context.restore();
        context.strokeStyle="black";
        context.stroke();
    }

    // Draws a wire going through the points in {points}.
    module.drawWire = function (points, settings) {
        var context = settings.context;
        context.save();
        context.scale(settings.scale, settings.scale);
        context.beginPath();

        context.moveTo(points[0].x, points[0].y);

        for (var i = 0; i < points.length; i++) {
            context.lineTo(points[i].x, points[i].y);
        }

        context.restore();
        context.stroke();
    }

    // Draws a ground symbol at (x, y). Gound symbols always point straight down.
    module.drawGround = function (x, y, settings) {
        var context = settings.context;
        context.save();
        context.scale(settings.scale, settings.scale);
        context.beginPath();

        context.moveTo(x - 0.4, y);
        context.lineTo(x + 0.4, y);
        context.moveTo(x - 0.2, y + 0.2);
        context.lineTo(x + 0.2, y + 0.2);

        context.restore();
        context.stroke();
    }

    // Draws a terminal at position (x, y) with the given {label}. Terminals
    // should be drawed last to not make them see-through.
    module.drawTerminal = function (x, y, label, settings) {
        var context = settings.context;
        context.save();
        context.scale(settings.scale, settings.scale);
        context.beginPath();

        context.ellipse(x, y, 0.16, 0.16, 0, 0, 2 * Math.PI);

        context.restore();
        context.fillStyle="white";
        context.fill();
        context.fillStyle="black";
        context.strokeStyle="black";
        context.stroke();
        context.textAlign="center";
        context.font = settings.labelStyle;
        context.fillText(label, x * settings.scale, (y-0.5) * settings.scale);
    }

    // Draws a wire joint at (x, y).
    module.drawJoint= function (x, y, settings) {
        var context = settings.context;
        context.save();
        context.scale(settings.scale, settings.scale);
        context.beginPath();

        context.ellipse(x, y, 0.1, 0.1, 0, 0, 2 * Math.PI);

        context.restore();
        context.fillStyle="black";
        context.fill();
    }

    // Draws a grid
    module.drawGrid = function (settings) {
        var context = settings.context;
        context.save();
        context.scale(settings.scale, settings.scale);
        context.beginPath();

        for (var i = 0; i <= settings.width; i++) {
            context.moveTo(i, 0);
            context.lineTo(i, settings.height);
        }

        for (var i = 0; i <= settings.height; i++) {
            context.moveTo(0, i);
            context.lineTo(settings.width, i);
        }

        context.restore();
        context.strokeStyle="#e0e0e0";
        context.stroke();
    }

    // Default settings object, so you don't have to create yourself.
    module.defaultSettings = {
        scale: 30,
        labelStyle: "14px Monospace"
    }

    return module;
}());

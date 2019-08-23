

document.addEventListener('DOMContentLoaded', function(evt) {
    const canvas = document.getElementById('mycanvas');
    const ctx = canvas.getContext("2d");

    drawBackground(ctx);
    drawShapes(ctx);
    fill(canvas, 100, 100, [0, 80, 200, 255]);
    fill(canvas, 360, 100, [0, 200, 80, 255]);
});

function drawBackground(ctx) {
    ctx.save();
    ctx.fillStyle = '#ffffffff';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.restore();
}

function drawShapes(ctx) {
    ctx.save();
    ctx.strokeStyle = 'rgb(100, 36, 0)';
    ctx.fillStyle = 'rgb(100, 36, 0)';

    ctx.strokeRect(70, 70, 100, 100);

    ctx.beginPath();
    ctx.ellipse(360, 120, 50, 50, 0, 0, Math.PI * 2);
    ctx.stroke();

    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.ellipse(240, 120, 100, 40, 0, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.ellipse(380, 120, 10, 10, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(380, 150, 10, 10, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
}


function fill(canvas, px, py, fcolor) {
    const ctx = canvas.getContext("2d");
    const image = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const bdata = image.data;

    const getColor = function (x, y) {
        const pos = (y * image.width + x) * 4;
        return [bdata[pos], bdata[pos+1], bdata[pos+2], bdata[pos+3]];
    };

    const putColor = function (x, y, color) {
        const pos = (y * image.width + x) * 4;
        for (let i = 0; i < 4; i++) {
            bdata[pos + i] = color[i];
        }
    };

    const matchColor = function (x, y, color) {
        const [r, g, b, a] = getColor(x, y);

        if (r === color[0] && g === color[1] && b === color[2]) {
            return true;
        }
        return false;
    };

    const scolor = getColor(px, py);
    const pstack = [[px, py]];
    while (pstack.length) {
        let p = pstack.pop();
        let [x, y] = p;

        while (y >= 0 && matchColor(x, y, scolor)) {
            y -= 1;
        }
        y += 1;
        let reachLeft = false;
        let reachRight = false;
        while (y <= canvas.height && matchColor(x, y, scolor)) {
            putColor(x, y, fcolor);

            if (x > 0) {
                if (matchColor(x-1, y, scolor)) {
                    if (!reachLeft) {
                        pstack.push([x-1, y]);
                        reachLeft = true;
                    }
                } else if (reachLeft) {
                    reachLeft = false;
                }
            }

            if (x < canvas.width) {
                if (matchColor(x+1, y, scolor)) {
                    if (!reachRight) {
                        pstack.push([x+1, y]);
                        reachRight = true;
                    }
                } else if (reachRight) {
                    reachRight = false;
                }
            }
            y += 1;

        }
    }
    ctx.putImageData(image, 0, 0);
}

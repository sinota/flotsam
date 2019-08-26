

document.addEventListener('DOMContentLoaded', function(evt) {
    const canvas = document.getElementById('mycanvas');
    
    const app = new Coloring(canvas, 'image/design-image.png');
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

    const scolor = getColor(bdata, px, py);
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

class Coloring {
    constructor(canvas, imgPath) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        canvas.addEventListener('mousedown', this.clicked.bind(this));

        let dimg = new Image();
        dimg.addEventListener('load', this.init.bind(this));
        dimg.src = imgPath;
        this.designImage = dimg;
    }

    init(evt) {
        this.drawDesign();
        this.designData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        this.clear();
        this.imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        this.redraw();
        this.fillColor = [200, 0, 0, 255];
    }

    clear() {
        this.ctx.save();
        this.ctx.fillStyle = '#ffffffff';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.restore();
    }

    drawDesign() {
        this.ctx.drawImage(this.designImage, 0, 0, this.designImage.width, this.designImage.height);
    }

    redraw() {
        this.clear();
        this.ctx.putImageData(this.imageData, 0, 0);
        this.drawDesign();
    }

    clicked(evt) {
        let [px, py] = [evt.clientX, evt.clientY];
        this.fill(px, py);
        this.redraw();
    }

    fill(px, py) {
        const ctx = this.ctx;
        const image = this.imageData;
        const bdata = image.data;
        const ddata = this.designData.data;
        const fcolor = this.fillColor;

        const getColor = function (data, x, y) {
            const pos = (y * image.width + x) * 4;
            return [data[pos], data[pos+1], data[pos+2], data[pos+3]];
        };

        const putColor = function (x, y, color) {
            const pos = (y * image.width + x) * 4;
            for (let i = 0; i < 4; i++) {
                bdata[pos + i] = color[i];
            }
        };

        const matchColor = function (x, y, color) {
            let [r, g, b, a] = getColor(ddata, x, y);

            if ((r + g + b) < 100 && a > 200) {
                return false;
            }
            [r, g, b, a] = getColor(bdata, x, y);

            if (r === color[0] && g === color[1] && b === color[2]) {
                return true;
            }
            return false;
        };

        const scolor = getColor(bdata, px, py);
        if (scolor[0] === fcolor[0] && scolor[1] === fcolor[1] && scolor[2] === fcolor[2]) {
            return;
        }
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
            while (y <= this.canvas.height && matchColor(x, y, scolor)) {
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

                if (x < this.canvas.width) {
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

    }

}

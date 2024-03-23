const canvasEl = document.querySelector("canvas");
const canvasCtx = canvasEl.getContext("2d");

const lineWidth = 15;
const gapX = 10;

const mouse = { x: 0, y: 0 };

const field = {
    w: window.innerWidth,
    h: window.innerHeight,
    draw: function () {
        canvasCtx.fillStyle = "#286047";
        canvasCtx.fillRect(0, 0, this.w, this.h);
    },
};

const centralLine = {
    x: window.innerWidth / 2 - lineWidth / 2,
    y: 0,
    w: lineWidth,
    h: window.innerHeight,
    draw: function () {
        canvasCtx.fillStyle = "#ffffff";
        canvasCtx.fillRect(this.x, this.y, this.w, this.h);
    },
};

const leftPaddle = {
    x: gapX,
    y: 100,
    w: lineWidth,
    h: 200,
    _move: function () {
        this.y = mouse.y - this.h / 2;
    },
    draw: function () {
        canvasCtx.fillRect(this.x, this.y, this.w, this.h);

        this._move();
    },
};

const rightPaddle = {
    x: field.w - lineWidth - gapX,
    y: 0,
    w: lineWidth,
    h: 200,
    speed: 5,
    _move: function () {
        if (this.y + this.h / 2 < ball.y + ball.r) {
            this.y += this.speed;
        } else {
            this.y -= this.speed;
        }
    },

    speedUp: function () {
        this.speed += 2;
    },

    draw: function () {
        canvasCtx.fillRect(this.x, this.y, this.w, this.h);

        this._move();
    },
};

const score = {
    human: 0,
    computer: 0,
    x: window.innerWidth / 4,
    y: 50,
    increaseHuman: function () {
        this.human++;
    },
    increaseComputer: function () {
        this.computer++;
    },
    draw: function () {
        canvasCtx.font = "bold 72px Arial";
        canvasCtx.textAlign = "center";
        canvasCtx.textBaseline = "top";
        canvasCtx.fillStyle = "#01341D";

        canvasCtx.fillText(this.human, this.x, this.y);
        canvasCtx.fillText(
            this.computer,
            this.x + window.innerWidth / 2,
            this.y
        );
    },
};

const ball = {
    x: field.w / 2,
    y: field.h / 2,
    r: 20,
    speed: 5,
    directionY: 1,
    directionX: 1,
    calcPosition: function () {
        if (this.x > field.w - this.r - rightPaddle.w - gapX) {
            if (
                this.y + this.r > rightPaddle.y &&
                this.y - this.r < rightPaddle.y + rightPaddle.h
            ) {
                this._reverseX();
            } else {
                score.increaseHuman();
                this._pointUp();
            }
        }

        if (this.x < this.r + leftPaddle.w + gapX) {
            if (
                this.y + this.r > leftPaddle.y &&
                this.y - this.r < leftPaddle.y + leftPaddle.h
            ) {
                this._reverseX();
            } else {
                score.increaseComputer();
                this._pointUp();
            }
        }

        if (
            (this.y - this.r < 0 && this.directionY < 0) ||
            (this.y > field.h - this.r && this.directionY > 0)
        ) {
            this._reverseY();
        }
    },

    _reverseY: function () {
        this.directionY *= -1;
    },
    _reverseX: function () {
        this.directionX *= -1;
    },

    _speedUp: function () {
        this.speed += 3;
    },

    _pointUp: function () {
        this.x = field.w / 2;
        this.y = field.h / 2;

        this._speedUp();
    },
    _move: function () {
        this.x += this.directionX * this.speed;
        this.y += this.directionY * this.speed;
    },
    draw: function () {
        canvasCtx.fillStyle = "#ffffff";
        canvasCtx.beginPath();
        canvasCtx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
        canvasCtx.fill();

        this.calcPosition();
        this._move();
    },
};

function setup() {
    canvasEl.width = window.innerWidth;
    canvasEl.height = window.innerHeight;

    canvasCtx.width = window.innerWidth;
    canvasCtx.height = window.innerHeight;
}

function draw() {
    //desenha campo
    field.draw();

    //desenha linha central
    centralLine.draw();

    //desenha raquete esquerda
    leftPaddle.draw();

    //desenha raquete direita
    rightPaddle.draw();

    //desenha placar
    score.draw(4, 2);

    //desenha bolinha
    ball.draw();
}

window.animateFrame = (function () {
    return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            return window.setTimeout(callback, 1000 / 60);
        }
    );
})();

function main() {
    animateFrame(main);
    draw();
}

setup();
main();

canvasEl.addEventListener("mousemove", (e) => {
    (mouse.x = e.pageX), (mouse.y = e.pageY);
});

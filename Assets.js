let sprites = {};
let assetsStillLoading = 0;

function assetLoadingLoop(callback) {
    if (assetsStillLoading) {
        requestAnimationFrame(assetLoadingLoop.bind(this, callback));
    } else {
        callback();
    }
}

function loadAssets(callback) {
    function loadSprite(filename) {
        assetsStillLoading++;
        let spriteImage = new Image();
        spriteImage.src = "./assets/sprites/" + filename;
        spriteImage.onload = function () {
            assetsStillLoading--;
        }
        return spriteImage;
    }

    sprites.background = loadSprite("spr_background4.png");
    sprites.stick = loadSprite("spr_stick.png")
    sprites.whiteBall = loadSprite("spr_whiteball.png")
    sprites.redBall = loadSprite("spr_redBall.png")
    sprites.yellowBall = loadSprite("spr_yellowBall.png")
    sprites.blackBall = loadSprite("spr_blackBall.png")

    assetLoadingLoop(callback);

}

function getBallSpriteByColor(color) {

    switch (color) {
        case COLOR.RED:
            return sprites.redBall;
        case COLOR.YELLOW:
            return sprites.yelllowBall;
        case COLOR.BLACK:
            return sprites.blackBall;
        case COLOR.WHITE:
            return sprites.whiteBall;

    }
}

class Archer {
    constructor(game, x, y, chats) {
        Object.assign(this, { game, x, y, chats });

        this.radius = 20;
        this.visualRadius = 200;

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/archer.png");

        this.animations = [];
        this.animations.push([]);
        this.animations[0].push(new Animator(this.spritesheet, 4, 10, 48, 48, 5, 0.25, 26, false, true));
        this.animations[0].push(new Animator(this.spritesheet, 64, 10, 48, 48, 5, 0.25, 26, false, true));
        this.animations[0].push(new Animator(this.spritesheet, 128, 10, 48, 48, 5, 0.25, 26, false, true));
        this.animations[0].push(new Animator(this.spritesheet, 183, 10, 48, 48, 5, 0.25, 26, false, true));
        this.animations[0].push(new Animator(this.spritesheet, 239, 10, 48, 48, 5, 0.25, 26, false, true));

        this.animations.push([]);
        this.animations[1].push(new Animator(this.spritesheet, 4, 372, 48, 64, 2, 0.5, 10, false, true));
        this.animations[1].push(new Animator(this.spritesheet, 64, 372, 48, 64, 2, 0.5, 10, false, true));
        this.animations[1].push(new Animator(this.spritesheet, 128, 372, 48, 64, 2, 0.5, 10, false, true));
        this.animations[1].push(new Animator(this.spritesheet, 183, 372, 48, 64, 2, 0.5, 10, false, true));
        this.animations[1].push(new Animator(this.spritesheet, 239, 372, 48, 64, 2, 0.5, 10, false, true));

        this.state = 0; // 0 walking, 1 attacking, 2 dead

        this.facing = 5; // 0 = up, clockwise

        this.elapsedTime = 0;
    };

    update() {
        this.elapsedTime += this.game.clockTick;

        if (this.game.click && collide(this, this.game.click)) {
            if (distance(this, this.game.footy) < this.visualRadius) {
                loadChat(this.chats[this.game.footy.state]);
            } else {
                loadChat(error[0]);
            }
        };

        var dir = { x: (this.game.footy.x - this.x), y: (this.game.footy.y - this.y) };

        this.facing = getFacing(dir);
    };

    draw(ctx) {
        var xOffset = 25;
        var yOffset = 30;
        if (this.state === 0) {
            switch (this.facing) {
                case 0:
                    xOffset = 22;
                    yOffset = 30;
                    break;
                case 1:
                    xOffset = 20;
                    yOffset = 28;
                    break;
                case 2:
                    xOffset = 18;
                    yOffset = 28;
                    break;
                case 3:
                    xOffset = 20;
                    yOffset = 25;
                    break;
                case 4:
                    xOffset = 22;
                    yOffset = 25;
                    break;
                case 5:
                    xOffset = 25;
                    yOffset = 25;
                    break;
                case 6:
                    xOffset = 30;
                    yOffset = 25;
                    break;
                case 7:
                    xOffset = 25;
                    yOffset = 25;
                    break;
            }
        }
        if (this.facing < 5) {
            this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - xOffset, this.y - yOffset, 1);
        } else {
            ctx.save();
            ctx.scale(-1, 1);
            this.animations[this.state][8 - this.facing].drawFrame(this.game.clockTick, ctx, -(this.x) - 48 + xOffset, this.y - yOffset, 1);
            ctx.restore();
        }

        if (PARAMS.DEBUG) {
         
            ctx.strokeStyle = "Red";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();

            ctx.setLineDash([5, 15]);
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.visualRadius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();
            ctx.setLineDash([]);
        }
    };
};

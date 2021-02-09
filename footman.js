class Footman {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.initialPoint = { x, y };

        this.radius = 20;
        this.visualRadius = 200;

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/footman.png");

        this.velocity = { x: 0, y: 0 };

        this.animations = [];
        this.animations.push([]);
        this.animations[0].push(new Animator(this.spritesheet, 12, 9, 48, 53, 5, 0.2, 0, false, true));
        this.animations[0].push(new Animator(this.spritesheet, 88, 9, 48, 53, 5, 0.2, 0, false, true));
        this.animations[0].push(new Animator(this.spritesheet, 160, 9, 48, 53, 5, 0.2, 0, false, true));
        this.animations[0].push(new Animator(this.spritesheet, 236, 9, 48, 53, 5, 0.2, 0, false, true));
        this.animations[0].push(new Animator(this.spritesheet, 308, 9, 48, 53, 5, 0.2, 0, false, true));

        this.animations.push([]);
        this.animations[1].push(new Animator(this.spritesheet, 0, 277, 64, 64, 4, 0.2, 0, false, true));
        this.animations[1].push(new Animator(this.spritesheet, 77, 277, 64, 64, 4, 0.2, 0, false, true));
        this.animations[1].push(new Animator(this.spritesheet, 150, 277, 64, 64, 4, 0.2, 0, false, true));
        this.animations[1].push(new Animator(this.spritesheet, 233, 277, 64, 64, 4, 0.2, 0, false, true));
        this.animations[1].push(new Animator(this.spritesheet, 312, 277, 64, 64, 4, 0.2, 0, false, true));

        this.state = 0;

        this.facing = 0; // 0 = up, clockwise

        this.elapsedTime = 0;
    };

    update() {
        this.elapsedTime += this.game.clockTick;
        var speed = 128;

        if (this.game.up && !this.game.down) {
            this.velocity.y = -speed;
        } else if (this.game.down && !this.game.up) {
            this.velocity.y = speed;
        } else {
            this.velocity.y = 0;
        }

        if (this.game.left && !this.game.right) {
            this.velocity.x = -speed;
        } else if (this.game.right && !this.game.left) {
            this.velocity.x = speed;
        } else {
            this.velocity.x = 0;
        }

        //for (var i = 0; i < this.game.entities.length; i++) {
        //    var ent = this.game.entities[i];
        //    if (ent instanceof Tower && canSee(this, ent)) {
        //        this.target = ent;
        //    }
        //    if (ent instanceof Tower && collide(this, ent)) {
        //        if (this.state === 0) {
        //            this.state = 1;
        //            this.elapsedTime = 0;
        //        } else if (this.elapsedTime > 0.8) {
        //            var damage = 7 + randomInt(4);
        //            ent.hitpoints -= damage;
        //            this.game.addEntity(new Score(this.game, ent.x, ent.y, damage));
        //            this.elapsedTime = 0;
        //        }
        //    }
        //}

        this.x += this.velocity.x * this.game.clockTick;
        this.y += this.velocity.y * this.game.clockTick;

        this.facing = getFacing(this.velocity);
    };

    draw(ctx) {
        var xOffset = 25;
        var yOffset = 30;
        if (this.state === 1) {
            switch (this.facing) {
                case 0:
                    xOffset = 38;
                    yOffset = 30;
                    break;
                case 1:
                    xOffset = 35;
                    yOffset = 30;
                    break;
                case 2:
                    xOffset = 35;
                    yOffset = 30;
                    break;
                case 3:
                    xOffset = 25;
                    yOffset = 30;
                    break;
                case 4:
                    xOffset = 20;
                    yOffset = 30;
                    break;
                case 5:
                    xOffset = 40;
                    yOffset = 30;
                    break;
                case 6:
                    xOffset = 25;
                    yOffset = 30;
                    break;
                case 7:
                    xOffset = 30;
                    yOffset = 30;
                    break;
            }
        }
        var width = this.state ? 64 : 48;
        if (this.facing < 5) {
            this.animations[0][this.facing].drawFrame(this.game.clockTick, ctx, this.x - xOffset, this.y - yOffset, 1);
        } else {
            ctx.save();
            ctx.scale(-1, 1);
            this.animations[0][8 - this.facing].drawFrame(this.game.clockTick, ctx, -(this.x) - width + xOffset, this.y - yOffset, 1);
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

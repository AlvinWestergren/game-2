controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mySprite.isHittingTile(CollisionDirection.Bottom)) {
        mySprite.ay = -1735
        pause(93)
        mySprite.ay = 680
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    mySprite,
    assets.animation`myAnim`,
    200,
    true
    )
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    mySprite,
    assets.animation`myAnim0`,
    200,
    true
    )
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy, effects.fire, 500)
    scene.cameraShake(4, 200)
})
let mySprite2: Sprite = null
let mySprite: Sprite = null
game.splash("Para ganar el juego tienes", "que llegar a los arboles")
game.splash("Cada tipo de árbol t lleva", "a una dimension diferente")
game.splash("Habra monstruos que", "intentaran atacarte")
mySprite = sprites.create(img`
    . . . . f f f f f . . . . . . . 
    . . . f e e e e e f . . . . . . 
    . . f d d d d e e e f . . . . . 
    . c d f d d f d e e f f . . . . 
    . c d f d d f d e e d d f . . . 
    c d e e d d d d e e b d c . . . 
    c d d d d c d d e e b d c . f f 
    c c c c c d d d e e f c . f e f 
    . f d d d d d e e f f . . f e f 
    . . f f f f f e e e e f . f e f 
    . . . . f e e e e e e e f f e f 
    . . . f e f f e f e e e e f f . 
    . . . f e f f e f e e e e f . . 
    . . . f d b f d b f f e f . . . 
    . . . f d d c d d b b d f . . . 
    . . . . f f f f f f f f f . . . 
    `, SpriteKind.Player)
tiles.setCurrentTilemap(tilemap`nivel6`)
controller.moveSprite(mySprite, 100, 0)
scene.cameraFollowSprite(mySprite)
info.setScore(info.countdown())
info.setLife(3)
mySprite.setPosition(5, 200)
mySprite.ay = 100
game.splash("NIVEL 1", "Facil")
mySprite.sayText("sigue hacia delante", 5000, true)
music.play(music.stringPlayable("E F B C5 G F A B ", 185), music.PlaybackMode.LoopingInBackground)
game.onUpdate(function () {
    if (mySprite.tileKindAt(TileDirection.Bottom, sprites.swamp.swampTile1)) {
        info.changeLifeBy(-1)
        mySprite.setPosition(5, 200)
        sprites.destroyAllSpritesOfKind(SpriteKind.Enemy, effects.fire, 500)
    }
    if (mySprite.tileKindAt(TileDirection.Bottom, sprites.swamp.swampTile2)) {
        info.changeLifeBy(-1)
        mySprite.setPosition(5, 280)
        sprites.destroyAllSpritesOfKind(SpriteKind.Enemy, effects.fire, 500)
    }
    if (mySprite.tileKindAt(TileDirection.Center, sprites.builtin.forestTiles0)) {
        game.setGameOverEffect(true, effects.confetti)
        info.setLife(3)
        tiles.setCurrentTilemap(tilemap`nivel0`)
        sprites.destroyAllSpritesOfKind(SpriteKind.Enemy, effects.fire, 500)
        mySprite.setPosition(5, 200)
        game.splash("NIVEL 2", "Intermedio")
    }
    if (mySprite.tileKindAt(TileDirection.Center, sprites.castle.saplingOak)) {
        game.setGameOverEffect(true, effects.confetti)
        info.setLife(3)
        tiles.setCurrentTilemap(tilemap`nivel8`)
        sprites.destroyAllSpritesOfKind(SpriteKind.Enemy, effects.fire, 500)
        mySprite.setPosition(5, 280)
        game.splash("NIVEL 3", "Difícil")
    }
    if (mySprite.tileKindAt(TileDirection.Center, sprites.castle.saplingPine)) {
        sprites.destroyAllSpritesOfKind(SpriteKind.Enemy, effects.confetti, 2000)
        game.setGameOverEffect(true, effects.confetti)
        game.splash("You took", info.score())
        game.splash("seconds")
        game.setGameOverScoringType(game.ScoringType.LowScore)
        game.gameOver(true)
    }
})
forever(function () {
    pause(972)
    info.changeScoreBy(1)
    if (info.life() == 0) {
        game.splash("You took", info.countdown())
        game.splash("seconds")
        game.setGameOverScoringType(game.ScoringType.LowScore)
    }
})
game.onUpdateInterval(3000, function () {
    mySprite2 = sprites.create(img`
        . . f f f . . . . . . . . . . . 
        f f f c c . . . . . . . . f f f 
        f f c c c . c c . . . f c b b c 
        f f c 3 c c 3 c c f f b b b c . 
        f f c 3 b c 3 b c f b b c c c . 
        f c b b b b b b c f b c b c c . 
        c c 1 b b b 1 b c b b c b b c . 
        c b b b b b b b b b c c c b c . 
        c b 1 f f 1 c b b c c c c c . . 
        c f 1 f f 1 f b b b b f c . . . 
        f f f f f f f b b b b f c . . . 
        f f 2 2 2 2 f b b b b f c c . . 
        . f 2 2 2 2 2 b b b c f . . . . 
        . . f 2 2 2 b b b c f . . . . . 
        . . . f f f f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy)
    mySprite2.setPosition(mySprite.x + randint(60, 80), mySprite.y - randint(40, 60))
    mySprite2.follow(mySprite, 35)
    mySprite2.setFlag(SpriteFlag.DestroyOnWall, true)
})

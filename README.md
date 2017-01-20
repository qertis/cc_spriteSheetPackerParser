# cc_spriteSheetPackerParser
> Cocos2d-JS V3 SpriteSheet Packer

## Usage
```js
let sprites = spriteSheetPackerParser('res/map.txt');
sprites.then(_ => {
  let helpFrame = cc.spriteFrameCache.getSpriteFrame('help');
  let helpSprite = new cc.Sprite(helpFrame);
  this.addChild(helpSprite);
})
```

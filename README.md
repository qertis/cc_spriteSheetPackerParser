# cc_spriteSheetPackerParser
> Sprite Sheet Packer Cocos2d-JS V3 for https://spritesheetpacker.codeplex.com/


## Usage
```js
let sprites = spriteSheetPackerParser('res/map.txt');
sprites.then(name => {
  let helpFrame = cc.spriteFrameCache.getSpriteFrame('help');
  let helpSprite = new cc.Sprite(helpFrame);
  this.addChild(helpSprite);
})
```

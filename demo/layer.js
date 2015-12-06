import spriteSheetPackerParser from '../spriteSheetPackerParser.js';

let Layer = cc.Layer.extend({
  ctor () {
  	this._super();

	let sprites = spriteSheetPackerParser('res/map.txt');
	  sprites.then(name => {
	    cc.log(name);

	    let helpFrame = cc.spriteFrameCache.getSpriteFrame('help');
	    let helpSprite = new cc.Sprite(helpFrame);
	    helpSprite.attr({
	      x : 300,
	      y : 300
	    });
	    this.addChild(helpSprite);

	  }).catch(e => {
	    cc.error(e);
	  });

  }
});

export default Layer;
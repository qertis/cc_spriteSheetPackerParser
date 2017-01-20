/**
 * Sprite Sheet Packer Parser for Cocos2d-js
 * @author Denis Baskovsky
 */
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.spriteSheetPackerParser = factory();
  }
}(this, function() {
  /**
   * @param txtPath {String}
   * @returns {Promise}
   */
  return function(txtPath) {
    /**
     * @return {Promise}
     */
    function loadStrokes() {
      return new Promise((resolve, reject) => {
        cc.loader.loadTxt(txtPath, (error, data) => {
          if (error) return reject(error);

          const strokes = data.split(/\n/g) || [];
          const outData = strokes.map(s => {
            /* example: add_energy = 134 354 130 131*/
            if (!s.match(/^(\w+).+=.(\d.+)/)) {
              return null;
            }

            const [name, value] = [RegExp.$1, RegExp.$2];

            if (!value.match(/(\d+)\s(\d+)\s(\d+)\s(\d+)/)) {
              return null;
            }

            const x = parseFloat(RegExp.$1);
            const y = parseFloat(RegExp.$2);
            const w = parseFloat(RegExp.$3);
            const h = parseFloat(RegExp.$4);

            return {name, x, y, w, h};
          });

          return resolve(outData.filter(oData => !!oData));
        });
      });
    }
    /**
     * Загрузка спрайтов
     * @return {Promise}
     */
    function loadSprites(coords) {
      return new Promise((resolve, reject) => {
        const imgPath = txtPath.replace(/txt$/, 'png');
        cc.loader.loadImg(imgPath, (error) => {
          if (error) return reject(error);

          const texture = cc.textureCache.addImage(imgPath);
          const textureAtlas = new cc.TextureAtlas(texture, coords.length);
          const spriteNameArray = coords.map(e => {
            const sprite = new cc.SpriteFrame();
            const rect = cc.rect(e.x, e.y, e.w, e.h);
            sprite.setTexture(textureAtlas.getTexture());
            sprite.setRect(rect);
            cc.spriteFrameCache.addSpriteFrame(sprite, e.name);

            return e.name;
          });

          return resolve(spriteNameArray);
        });
      });
    }

    return Promise.resolve(loadStrokes()).then(loadSprites);
  }

}));

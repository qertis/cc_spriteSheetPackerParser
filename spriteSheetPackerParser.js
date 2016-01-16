/**
 * Sprite Sheet Packer Parser for Cocos2d-js
 *
 * Home page: https://spritesheetpacker.codeplex.com/
 *
 * Author: Denis Baskovsky <denis@baskovsky.ru>
 *
 * @param txtPath {String}
 * @returns {Promise}
 */
export default function spriteSheetPackerParser(txtPath) {

  /**
   * Загрузка txt
   * @return {Promise}
   */
  function loadStrokes() {
    let strokes = new Promise((resolve, reject) => {
      cc.loader.loadTxt(txtPath, (error, data) => {
        if (error) {
          return reject(error);
        }

        let strokes = data.split(/\n/g) || [];

        let outData = strokes.map(s => {
          /* Пример валидного вхождения: add_energy = 134 354 130 131*/
          if (!s.match(/^(\w+).+=.(\d.+)/)) {
            return null;
          }

          let name = RegExp.$1;
          let value = RegExp.$2;

          if (!value.match(/(\d+)\s(\d+)\s(\d+)\s(\d+)/)) {
            return null;
          }

          let x = parseFloat(RegExp.$1);
          let y = parseFloat(RegExp.$2);
          let w = parseFloat(RegExp.$3);
          let h = parseFloat(RegExp.$4);

          return {name, x, y, w, h};
        });

        return resolve(outData.filter(e => !!e));
      });
    });

    return strokes;
  }

  /**
   * Загрузка спрайтов
   * @return {Promise}
   */
  function loadSprites(coords) {
    let sprites = new Promise((resolve, reject) => {
      let imgPath = txtPath.replace(/txt$/, 'png');
      cc.loader.loadImg(imgPath, (error) => {
        if (error) {
          return reject(error);
        }

        let texture = cc.textureCache.addImage(imgPath);
        let textureAtlas = new cc.TextureAtlas(texture, coords.length);

        let spriteNameArray = coords.map(e => {
          let sprite = new cc.SpriteFrame();
          let rect = cc.rect(e.x, e.y, e.w, e.h);
          sprite.setTexture(textureAtlas.getTexture());
          sprite.setRect(rect);

          cc.spriteFrameCache.addSpriteFrame(sprite, e.name);

          return e.name;
        });

        return resolve(spriteNameArray);
      });
    });

    return sprites;
  }

  return loadStrokes()
    .then(loadSprites)
    .catch(() => {
      throw 'Catch Error';
    });
}

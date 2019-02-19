'use strict';

const Service = require('egg').Service;
const ExifImage = require('exif').ExifImage;
const Piexif = require('piexifjs');
const fs = require('fs');

class ExifService extends Service {
  /**
   * 获取照片的exif信息
   * @param {String} file_path 照片的绝对路径
   * @return {Promise} 创建好的promise对象
   */
  get(file_path) {
    return new Promise((res, rej) => {
      try {
        new ExifImage({
          image: file_path,
        }, (err, data) => {
          err ? rej(err) : res(data);
        });
      } catch (error) {
        rej(error.message);
      }
    });
  }


  /**
   * 擦除图片中的exif信息
   * @param {String} file_path 等待擦除exif信息的照片绝对路径
   */
  remove(file_path) {
    try {
      const raw_jpeg = fs.readFileSync(file_path);
      const raw_data = raw_jpeg.toString('binary');

      const newData = Piexif.remove(raw_data);
      const newJpeg = new Buffer(newData, 'binary');
      fs.writeFileSync(file_path, newJpeg);
    } catch (err) {
      console.log(err.message);
    }
  }
}

module.exports = ExifService;
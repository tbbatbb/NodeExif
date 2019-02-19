'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const {
      ctx,
    } = this;
    await this.ctx.service.exif.get(this.app.baseDir + '/app/public/test.jpg')
      .then(result => {
        ctx.body = {
          success: true,
          data: result,
        };
      }).catch(err => {
        console.log(err.message);
        ctx.body = {
          success: false,
        };
      });

    await this.ctx.service.exif.remove(this.app.baseDir + '/app/public/test.jpg');
  }
}

module.exports = HomeController;

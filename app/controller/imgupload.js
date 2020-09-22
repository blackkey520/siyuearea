
const Controller = require('egg').Controller;
const path = require('path');
const fs = require('fs');
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');
 
class ImguploadController extends Controller {
    // 服务器渲染Controller
    * index() {
      const {
          ctx
      } = this;
      const stream = yield ctx.getFileStream();
      const filename = stream.filename;
      //  上传基础目录
      const uplaodBasePath = '../../app/public/upload/';
      // 生成文件夹
      const dir = path.join(__dirname, uplaodBasePath);
      const dirImg = path.join(__dirname, uplaodBasePath, filename);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir);
      if (fs.existsSync(dirImg)) {
          ctx.body = {
              msg: '此图片名已存在'
          };
          ctx.status = 400;
          return;
      }
    //   const res = fs.readdirSync(dir);
    //   if (res.length > 2) {
    //       ctx.body = {
    //           msg: '最多只能传三张图片'
    //       };
    //       ctx.status = 400;
    //       return;
    //   }
      const target = path.join(__dirname, uplaodBasePath, filename);
      // 写入流
      const writeStream = fs.createWriteStream(target);
      try {
          // 写入文件
          yield awaitWriteStream(stream.pipe(writeStream));
          ctx.body = {
              name: filename
          };
          ctx.status = 200;
      } catch (err) {
          // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
          yield sendToWormhole(stream);
          ctx.body = {
              msg: '写入图片失败'
          };
          ctx.status = 400;
          throw err;
      }
 
 
    }
}

module.exports = ImguploadController;
// exports.index = async function* () {
//    debugger;
//     const { ctx } = this;
//     const file = ctx.request.files[0];
//     debugger;
//     const fileinfo = fs.readFileSync(file.filepath);
//     const name = `YLW_${new Date().getTime()}_${file.filename}`;
//     const target = path.join(this.config.baseDir, `app/public/upload/${name}`);
//     try {
//       await fs.writeFileSync(target, fileinfo);
//     } catch (error) {
//       throw error;
//     } finally {
//       await fs.unlink(file.filepath, err => {
//         if (err) {
//           throw err;
//         }
//         console.log('删除缓存文件:' + file.filepath + '成功！');
//       });
//     }
//     ctx.body = { code: 200, message: '上传成功!', data: target, file };
// };
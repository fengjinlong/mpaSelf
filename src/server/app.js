import Koa from 'koa'
import controllersInit from "./controllers";
import render from 'koa-swig';
import { wrap } from "co";
import serve from 'koa-static';
const { viewDir, staticDir, port } = require('./config');

const app = new Koa();
app.context.render = wrap(render({
  root: viewDir,
  autoescape: true,
  cache: false,
  ext: 'html',
  // varControls: ["[[", "]]"],
  writeBody: false
}));
console.log(port)
// 静态
app.use(serve(staticDir));
controllersInit(app);
app.listen(port, () => {
  console.log('🍊🍎')
});
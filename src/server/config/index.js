/* eslint-disable no-undef */
import { extend } from "lodash";
import { join } from "path";
let $config = {
    // 模板 有前端打包到dist 的views assets
    viewDir: join(__dirname, "..", "views"),
    staticDir: join(__dirname, "..", "assets"),
    port: 3000
};

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV == "development") {
    const localConfig = {
        port: 3000
        // baseUrl: "http://localhost/mvc/basic/web/index.php?r="
    }
    $config = extend($config, localConfig);
}
if (process.env.NODE_ENV == "production") {
    const prodConfig = {
        port: 80
    }
    $config = extend($config, prodConfig);
}
// export default $config;
module.exports = $config;
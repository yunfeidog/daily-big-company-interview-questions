import {defineUserConfig} from "vuepress";
import {registerComponentsPlugin} from "@vuepress/plugin-register-components";
import {getDirname, path} from "@vuepress/utils";
import theme from "./theme.js";

// @ts-ignore
const __dirname = getDirname(import.meta.url);

//自定义用户配置
export default defineUserConfig({
    base: "/daily-big-company-interview-questions/",

    // 多语言设置
    locales: {
        "/": {
            lang: "zh-CN",
            title: "每日大厂面试题分享",
            description: "网站的描述",
            // 设置favicon
            head: [["link", {rel: "icon", href: "/favicon.svg"}]],
        },
    },
    // 主题设置
    theme,
    plugins: [
        // 注册全局组件的插件
        registerComponentsPlugin({
            componentsDir: path.resolve(__dirname, "./components"),
        }),
    ],

    shouldPrefetch: false,
});

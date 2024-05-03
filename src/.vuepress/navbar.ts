import {navbar} from "vuepress-theme-hope";

export const Navbar = navbar([
    {text: "最新面试题", icon: "blog", link: "/blog/"},
    {text: "大厂面试", icon: "free", link: "/interviews/"},
    {text: "后端面试题", icon: "blog", link: "/backEnd/"},
    {text: "前端面试题", icon: "blog", link: "/frontEnd/"},
    {text: "分类", icon: "tag", link: "/category/"},
    {text: "标签", icon: "tag", link: "/tag/"},
    {text: "实习招聘汇总", icon: "internship", link: "/internship/"},
    {text: "面经建议", icon: "doc", link: "/experience/"},
    {text: "时间线", icon: "timeline", link: "/timeline/"},
]);

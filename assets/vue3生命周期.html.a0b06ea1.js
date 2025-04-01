import{_ as e}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as i,c as n,a as l}from"./app.6c1a7a4b.js";const s={},t=l(`<blockquote><p>说一说你对Vue生命周期，生命周期钩子的理解</p></blockquote><p>思路： 先回答生命周期（钩子）的定义，再详细介绍一下，能对比2和3的不同就更好。</p><div class="custom-container tip"><p class="custom-container-title">提示</p><p><mark>Vue生命周期就是Vue实例从创建到销毁的过程。</mark> Vue在设计的时候，把这个过程分为了四个阶段，分别是初始化阶段，挂载阶段，更新阶段，销毁阶段。</p><p>在每个阶段都有一些被称为“生命周期钩子”的函数，使开发者可以在特定的阶段(时机)运行自己的代码。</p><ul><li>初始化阶段：在这个阶段，Vue主要是执行setup函数，做一些准备数据的工作。</li><li>挂载阶段：创建和插入Dom节点。</li><li>更新阶段：因响应式状态变更，重新渲染并打补丁。</li><li>取消挂载：将实例在Dom对象中移除。</li></ul></div><p>常用的钩子有：<br> 挂载阶段：</p><ul><li>onBeforeMount() : <mark>当这个钩子被调用时，组件已经完成了其响应式状态的设置</mark> ，但还没有创建 DOM 节点。它即将首次执行 DOM 渲染过程。</li><li>onMounted() : 在组件挂载后执行。</li></ul><p>更新阶段：</p><ul><li>onBeforeUpdate() : 注册一个钩子，在组件即将因为响应式状态变更而更新其 DOM 树之前调用。</li><li>onUpdated() : 注册一个回调函数，在组件挂载完成后执行。</li></ul><p>卸载阶段：</p><ul><li>onBeforeUnmount(): 注册一个钩子，在组件实例被卸载之前调用。</li><li>onUnmounted(): 注册一个回调函数，在组件实例被卸载之后调用。</li></ul><p>缓存组件特有钩子：</p><div class="language-Vue line-numbers-mode" data-ext="Vue"><pre class="language-Vue"><code>&lt;script setup&gt;
import { onActivated, onDeactivated } from &#39;vue&#39;

onActivated(() =&gt; {
  // 调用时机为首次挂载
  // 以及每次从缓存中被重新插入时
})

onDeactivated(() =&gt; {
  // 在从 DOM 上移除、进入缓存
  // 以及组件卸载时调用
})
&lt;/script&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,11),d=[t];function a(u,o){return i(),n("div",null,d)}const v=e(s,[["render",a],["__file","vue3生命周期.html.vue"]]);export{v as default};

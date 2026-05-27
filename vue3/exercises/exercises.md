# Vue3 练习题
 False
 False> @Module: vue3
 False> @Total: 8
 False> @Difficulty: 进阶
 False
 False## 选择题
 False
 False### 1. 关于 `ref` 和 `reactive`，以下说法正确的是？
 False
 FalseA. `ref` 只能用于基本类型
 FalseB. `reactive` 返回的对象重新赋值后仍保持响应式
 FalseC. `ref` 在模板中自动解包，无需 `.value`
 FalseD. `reactive` 的性能优于 `ref`
 False
 False<details>
 False<summary>查看答案</summary>
 False
 False**答案**: C
 False
 False**解析**: `ref` 可用于任何类型（包括对象和数组），A 错。`reactive` 返回的代理对象重新赋值会丢失响应式，B 错。模板中 `ref` 自动解包，C 正确。两者性能差异可忽略，D 错。
 False</details>
 False
 False### 2. 以下组合式 API 写法中，`computed` 的依赖追踪发生在？
 False
```javascript
 Trueconst count = ref(0);
 Trueconst doubled = computed(() => count.value * 2);
 True```

 FalseA. `ref(0)` 调用时
 FalseB. `computed()` 调用时
 FalseC. 首次读取 `doubled.value` 时
 FalseD. `count.value` 变化时
 False
 False<details>
 False<summary>查看答案</summary>
 False
 False**答案**: C
 False
 False**解析**: Vue3 的 `computed` 是惰性求值的。依赖追踪在 getter 函数首次执行时（即首次读取 `.value`）建立，而非创建时。之后当依赖变化时标记为 dirty，下次读取时重新计算。
 False</details>
 False
 False### 3. 父子组件通信中，以下哪种方式不能实现子→父通信？
 False
 FalseA. `emit`
 FalseB. `v-model`
 FalseC. `provide/inject`
 FalseD. `defineExpose` + `ref` 模板引用
 False
 False<details>
 False<summary>查看答案</summary>
 False
 False**答案**: C
 False
 False**解析**: `provide/inject` 是祖先→后代单向数据流，子组件无法通过 inject 向父组件传递数据。`emit` 和 `v-model`（语法糖基于 emit）是标准的子→父通信方式。`defineExpose` 配合模板 `ref` 可让父组件直接调用子组件方法。
 False</details>
 False
 False### 4. 在 Pinia 中，以下哪种方式可以修改 store 状态？
 False
 FalseA. 直接在组件中 `store.count++`
 FalseB. 通过 `$patch` 方法
 FalseC. 通过 action
 FalseD. 以上都可以
 False
 False<details>
 False<summary>查看答案</summary>
 False
 False**答案**: D
 False
 False**解析**: Pinia 允许直接修改状态、使用 `$patch`（支持对象和函数形式）、以及通过 action 修改。这比 Vuex 更灵活，Vuex 要求必须通过 mutation 修改。
 False</details>
 False
 False### 5. Vue Router 的导航守卫执行顺序是？
 False
 FalseA. 组件内守卫 → 全局守卫 → 路由独享守卫
 FalseB. 全局前置守卫 → 路由独享守卫 → 组件内守卫 → 全局解析守卫 → 全局后置守卫
 FalseC. 全局后置守卫 → 路由独享守卫 → 组件内守卫
 FalseD. 路由独享守卫 → 全局守卫 → 组件内守卫
 False
 False<details>
 False<summary>查看答案</summary>
 False
 False**答案**: B
 False
 False**解析**: 完整顺序：`beforeEach` → `beforeEnter` → `beforeRouteEnter` → `beforeResolve` → `afterEach`。全局前置最先执行，组件内守卫在路由独享守卫之后。
 False</details>
 False
 False## 编程题
 False
 False### 1. 可复用的分页组合式函数
 False
 False实现 `usePagination(fetchFn, pageSize)` 组合式函数，封装分页逻辑（当前页、总页数、翻页、数据加载状态）。
 False
 False**输入**: `const { data, page, totalPages, nextPage, prevPage, loading } = usePagination(fetchUsers, 10)`
 False**输出**: 响应式的分页状态和控制方法
 False
 False<details>
 False<summary>查看参考答案</summary>
 False
```javascript
 Trueimport { ref, computed, watch } from 'vue';
 True
 Trueexport function usePagination(fetchFn, pageSize = 10) {
 True const page = ref(1);
 True const data = ref([]);
 True const total = ref(0);
 True const loading = ref(false);
 True
 True const totalPages = computed(() => Math.ceil(total.value / pageSize));
 True
 True async function fetchData() {
 True loading.value = true;
 True try {
 True const res = await fetchFn({ page: page.value, pageSize });
 True data.value = res.data;
 True total.value = res.total;
 True } finally {
 True loading.value = false;
 True }
 True }
 True
 True function nextPage() {
 True if (page.value < totalPages.value) {
 True page.value++;
 True }
 True }
 True
 True function prevPage() {
 True if (page.value > 1) {
 True page.value--;
 True }
 True }
 True
 True watch(page, fetchData, { immediate: true });
 True
 True return { data, page, totalPages, nextPage, prevPage, loading };
 True}
 True```
</details>
 False
 False### 2. Pinia Store 实战
 False
 False为一个 Todo 应用创建 Pinia store，支持：添加、删除、切换完成状态、按状态筛选、统计未完成数量。
 False
 False**输入**: 添加 3 个 todo，完成 1 个，筛选 `active`
 False**输出**: 返回 2 个未完成的 todo
 False
 False<details>
 False<summary>查看参考答案</summary>
 False
```javascript
 Trueimport { defineStore } from 'pinia';
 Trueimport { ref, computed } from 'vue';
 True
 Trueexport const useTodoStore = defineStore('todo', () => {
 True const todos = ref([]);
 True const filter = ref('all');
 True
 True const filteredTodos = computed(() => {
 True switch (filter.value) {
 True case 'active':
 True return todos.value.filter((t) => !t.done);
 True case 'completed':
 True return todos.value.filter((t) => t.done);
 True default:
 True return todos.value;
 True }
 True });
 True
 True const remaining = computed(() => todos.value.filter((t) => !t.done).length);
 True
 True function addTodo(text) {
 True todos.value.push({ id: Date.now(), text, done: false });
 True }
 True
 True function removeTodo(id) {
 True todos.value = todos.value.filter((t) => t.id !== id);
 True }
 True
 True function toggleTodo(id) {
 True const todo = todos.value.find((t) => t.id === id);
 True if (todo) todo.done = !todo.done;
 True }
 True
 True function setFilter(f) {
 True filter.value = f;
 True }
 True
 True return { todos, filter, filteredTodos, remaining, addTodo, removeTodo, toggleTodo, setFilter };
 True});
 True```
</details>
 False
 False### 3. 带权限的路由守卫
 False
 False实现 Vue Router 全局前置守卫，根据用户角色（`admin`/`user`/`guest`）控制路由访问权限。未授权时重定向到 403 页面，未登录时重定向到登录页。
 False
 False**输入**: `guest` 用户访问 `/admin/dashboard`
 False**输出**: 重定向到 `/403`
 False
 False<details>
 False<summary>查看参考答案</summary>
 False
```javascript
 Trueimport { createRouter } from 'vue-router';
 True
 Trueconst roleAccessMap = {
 True admin: ['admin', 'user', 'guest'],
 True user: ['user', 'guest'],
 True guest: ['guest'],
 True};
 True
 Truefunction createGuardedRouter(routes) {
 True const router = createRouter({ routes });
 True
 True router.beforeEach((to, from) => {
 True const userRole = localStorage.getItem('role') || 'guest';
 True const requiresAuth = to.meta.requiresAuth;
 True const requiredRole = to.meta.role;
 True
 True if (!requiresAuth) return true;
 True
 True if (userRole === 'guest' && requiresAuth) {
 True return { name: 'login', query: { redirect: to.fullPath } };
 True }
 True
 True if (requiredRole && !roleAccessMap[userRole]?.includes(requiredRole)) {
 True return { name: 'forbidden' };
 True }
 True
 True return true;
 True });
 True
 True return router;
 True}
 True```
</details>
 False
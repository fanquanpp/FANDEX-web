# 多线程基础 (Multithreading Basics)
 False
 False> @Version: v3.5.0
 False
 False> @Author: Anonymous
 False> @Category: Java Basics
 False> @Description: 线程创建、生命周期、同步机制及 Java 线程池。 | Thread creation, lifecycle, synchronization, and pools.
 False
 False---
 False
 False## 目录
 False
 False1. [线程概念](#线程概念)
 False2. [线程创建方式](#线程创建方式)
 False3. [线程生命周期](#线程生命周期)
 False4. [线程同步](#线程同步)
 False5. [线程池](#线程池)
 False6. [并发工具类](#并发工具类)
 False7. [线程安全集合](#线程安全集合)
 False8. [线程间通信](#线程间通信)
 False9. [实际应用案例](#实际应用案例)
 False10. [线程安全问题](#线程安全问题)
 False11. [最佳实践](#最佳实践)
 False12. [常见陷阱](#常见陷阱)
 False
 False---
 False
 False## 1. 线程概念 (Threads)
 False
 False### 1.1 进程与线程
 False
 False- **进程**: 操作系统分配资源的最小单位，拥有独立的内存空间
 False- **线程**: 进程内部的执行流，共享进程的内存空间，是 CPU 调度的最小单位
 False- **多线程的优势**: 提高程序响应速度，充分利用 CPU 资源，简化程序结构
 False
 False### 1.2 Java 中的线程
 False
 False- **Thread 类**: 表示线程的类
 False- **Runnable 接口**: 定义线程执行体的接口
 False- **Callable 接口**: 可以返回结果和抛出异常的接口
 False
 False## 2. 线程创建方式 (Creation)
 False
 False### 2.1 继承 Thread 类
 False
```java
 Trueclass MyThread extends Thread {
 True @Override
 True public void run() {
 True for (int i = 0; i < 10; i++) {
 True System.out.println(Thread.currentThread().getName() + ": " + i);
 True try {
 True Thread.sleep(100);
 True } catch (InterruptedException e) {
 True e.printStackTrace();
 True }
 True }
 True }
 True}
 True
 True// 使用
 TrueMyThread thread1 = new MyThread();
 TrueMyThread thread2 = new MyThread();
 Truethread1.start();
 Truethread2.start();
 True```

 False### 2.2 实现 Runnable 接口
 False
```java
 Trueclass MyRunnable implements Runnable {
 True @Override
 True public void run() {
 True for (int i = 0; i < 10; i++) {
 True System.out.println(Thread.currentThread().getName() + ": " + i);
 True try {
 True Thread.sleep(100);
 True } catch (InterruptedException e) {
 True e.printStackTrace();
 True }
 True }
 True }
 True}
 True
 True// 使用
 TrueRunnable runnable = new MyRunnable();
 TrueThread thread1 = new Thread(runnable, "Thread-1");
 TrueThread thread2 = new Thread(runnable, "Thread-2");
 Truethread1.start();
 Truethread2.start();
 True```

 False### 2.3 实现 Callable 接口
 False
```java
 Trueclass MyCallable implements Callable<Integer> {
 True @Override
 True public Integer call() throws Exception {
 True int sum = 0;
 True for (int i = 1; i <= 100; i++) {
 True sum += i;
 True }
 True return sum;
 True }
 True}
 True
 True// 使用
 TrueCallable<Integer> callable = new MyCallable();
 TrueFutureTask<Integer> futureTask = new FutureTask<>(callable);
 TrueThread thread = new Thread(futureTask);
 Truethread.start();
 True
 Truetry {
 True // 获取结果
 True Integer result = futureTask.get();
 True System.out.println("Sum: " + result);
 True} catch (Exception e) {
 True e.printStackTrace();
 True}
 True```

 False### 2.4 使用 Lambda 表达式
 False
```java
 True// 使用 Lambda 表达式创建线程
 TrueThread thread1 = new Thread(() -> {
 True for (int i = 0; i < 10; i++) {
 True System.out.println(Thread.currentThread().getName() + ": " + i);
 True try {
 True Thread.sleep(100);
 True } catch (InterruptedException e) {
 True e.printStackTrace();
 True }
 True }
 True}, "Thread-1");
 True
 Truethread1.start();
 True```

 False## 3. 线程生命周期 (Lifecycle)
 False
 False### 3.1 线程状态
 False
 FalseJava 线程有 6 种状态，定义在 `Thread.State` 枚举中：
 False
 False1. **新建 (NEW)**: 线程被创建但尚未启动
 False2. **可运行 (RUNNABLE)**: 线程正在 JVM 中运行或等待 CPU 执行权
 False3. **阻塞 (BLOCKED)**: 线程等待获取锁
 False4. **等待 (WAITING)**: 线程无限期等待其他线程的通知
 False5. **超时等待 (TIMED_WAITING)**: 线程在指定时间内等待
 False6. **终止 (TERMINATED)**: 线程执行完成
 False
 False### 3.2 状态转换图
 False
```
 True┌─────────┐ start() ┌──────────┐ CPU调度 ┌──────────┐
 True│ NEW │───────────────→│ RUNNABLE │──────────────→│ RUNNING │
 True└─────────┘ └──────────┘ └──────────┘
 True ↑ ↑ │
 True │ │ │
 True │ await() │ wait()/sleep() │
 True │ join() │ join(timeout) │
 True │ │ │
 True┌─────────┐ run()结束 ┌──────────┐←─────────────┘
 True│TERMINATED│←───────────────┐ │ WAITING │
 True└─────────┘ │ └──────────┘
 True │ ↑
 True │ │
 True │ sleep(timeout)
 True │ wait(timeout)
 True │ join(timeout)
 True │ │
 True │ ↓
 True │ ┌───────────────┐
 True │ │TIMED_WAITING │
 True │ └───────────────┘
 True │ ↑
 True │ │
 True │ 获取锁失败
 True │ │
 True └─────────┘
 True ┌──────────┐
 True │ BLOCKED │
 True └──────────┘
 True```

 False### 3.3 状态转换方法
 False
 False- **NEW → RUNNABLE**: `start()`
 False- **RUNNABLE → BLOCKED**: 获取锁失败
 False- **RUNNABLE → WAITING**: `wait()`, `join()`, `LockSupport.park()`
 False- **RUNNABLE → TIMED_WAITING**: `sleep(time)`, `wait(time)`, `join(time)`, `LockSupport.parkNanos()`, `LockSupport.parkUntil()`
 False- **BLOCKED → RUNNABLE**: 获取锁成功
 False- **WAITING → RUNNABLE**: 被其他线程唤醒
 False- **TIMED_WAITING → RUNNABLE**: 超时或被其他线程唤醒
 False- **RUNNABLE → TERMINATED**: `run()` 方法执行完成
 False
 False## 4. 线程同步 (Synchronization)
 False
 False### 4.1 线程安全问题
 False
 False- **并发访问共享资源**时可能导致的数据不一致问题
 False- **示例**: 多线程同时操作同一个计数器
 False
 False### 4.2 synchronized 关键字
 False
 False#### 4.2.1 同步方法
 False
```java
 Truepublic synchronized void increment() {
 True count++;
 True}
 True```

 False#### 4.2.2 同步代码块
 False
```java
 Truesynchronized (this) {
 True count++;
 True}
 True```

 False#### 4.2.3 静态同步方法
 False
```java
 Truepublic static synchronized void increment() {
 True staticCount++;
 True}
 True```

 False### 4.3 volatile 关键字
 False
 False- **保证可见性**: 一个线程对变量的修改对其他线程立即可见
 False- **保证有序性**: 禁止指令重排序
 False- **不保证原子性**: 适合于状态标记或双重检查锁定
 False
```java
 Trueprivate volatile boolean flag = false;
 True
 Truepublic void setFlag(boolean flag) {
 True this.flag = flag; // 对其他线程可见
 True}
 True
 Truepublic boolean getFlag() {
 True return flag; // 读取最新值
 True}
 True```

 False### 4.4 Lock 接口
 False
 False#### 4.4.1 ReentrantLock
 False
```java
 Trueprivate final Lock lock = new ReentrantLock();
 True
 Truepublic void increment() {
 True lock.lock();
 True try {
 True count++;
 True } finally {
 True lock.unlock(); // 必须在 finally 中释放锁
 True }
 True}
 True```

 False#### 4.4.2 ReentrantReadWriteLock
 False
 False- **读锁**: 多个线程可以同时获取
 False- **写锁**: 只能有一个线程获取
 False
```java
 Trueprivate final ReadWriteLock rwLock = new ReentrantReadWriteLock();
 Trueprivate final Lock readLock = rwLock.readLock();
 Trueprivate final Lock writeLock = rwLock.writeLock();
 True
 Truepublic void read() {
 True readLock.lock();
 True try {
 True // 读取操作
 True } finally {
 True readLock.unlock();
 True }
 True}
 True
 Truepublic void write() {
 True writeLock.lock();
 True try {
 True // 写入操作
 True } finally {
 True writeLock.unlock();
 True }
 True}
 True```

 False### 4.5 原子类
 False
 False- **java.util.concurrent.atomic 包**提供的原子操作类
 False- **保证原子性**，无需使用锁
 False
```java
 Trueprivate AtomicInteger count = new AtomicInteger(0);
 True
 Truepublic void increment() {
 True count.incrementAndGet(); // 原子操作
 True}
 True
 Truepublic int getCount() {
 True return count.get();
 True}
 True```

 False## 5. 线程池 (Thread Pools)
 False
 False### 5.1 线程池的优势
 False
 False- **减少线程创建和销毁的开销**
 False- **控制最大并发数**，避免资源耗尽
 False- **提高线程的可管理性**
 False- **提供任务队列**，实现任务的缓冲
 False
 False### 5.2 Executor 框架
 False
 False- **Executor**: 执行任务的接口
 False- **ExecutorService**: 扩展了 Executor，提供了生命周期管理
 False- **ScheduledExecutorService**: 支持定时和周期性任务
 False
 False### 5.3 线程池的创建
 False
 False#### 5.3.1 使用 Executors 工厂方法
 False
 False- **newFixedThreadPool(int nThreads)**: 创建固定大小的线程池
 False- **newCachedThreadPool()**: 创建可缓存的线程池
 False- **newSingleThreadExecutor()**: 创建单线程的线程池
 False- **newScheduledThreadPool(int corePoolSize)**: 创建支持定时和周期性任务的线程池
 False
```java
 True// 创建固定大小的线程池
 TrueExecutorService executorService = Executors.newFixedThreadPool(5);
 True
 True// 提交任务
 Truefor (int i = 0; i < 10; i++) {
 True final int taskId = i;
 True executorService.submit(() -> {
 True System.out.println("Task " + taskId + " executed by " + Thread.currentThread().getName());
 True try {
 True Thread.sleep(1000);
 True } catch (InterruptedException e) {
 True e.printStackTrace();
 True }
 True });
 True}
 True
 True// 关闭线程池
 TrueexecutorService.shutdown();
 True```

 False#### 5.3.2 自定义线程池
 False
 False使用 `ThreadPoolExecutor` 构造函数自定义线程池参数。
 False
```java
 TrueThreadPoolExecutor executor = new ThreadPoolExecutor(
 True 5, // 核心线程数
 True 10, // 最大线程数
 True 60L, // 空闲线程存活时间
 True TimeUnit.SECONDS, // 时间单位
 True new LinkedBlockingQueue<>(100), // 工作队列
 True Executors.defaultThreadFactory(), // 线程工厂
 True new ThreadPoolExecutor.AbortPolicy() // 拒绝策略
 True);
 True```

 False### 5.4 线程池的参数
 False
 False- **corePoolSize**: 核心线程数
 False- **maximumPoolSize**: 最大线程数
 False- **keepAliveTime**: 空闲线程存活时间
 False- **unit**: 时间单位
 False- **workQueue**: 工作队列
 False- **threadFactory**: 线程工厂
 False- **handler**: 拒绝策略
 False
 False### 5.5 拒绝策略
 False
 False- **AbortPolicy**: 直接抛出异常
 False- **CallerRunsPolicy**: 由调用线程执行任务
 False- **DiscardPolicy**: 丢弃任务
 False- **DiscardOldestPolicy**: 丢弃最旧的任务
 False
 False## 6. 并发工具类
 False
 False### 6.1 CountDownLatch
 False
 False- **倒计时门闩**，等待一组线程完成
 False
```java
 TrueCountDownLatch latch = new CountDownLatch(3);
 True
 Truefor (int i = 0; i < 3; i++) {
 True new Thread(() -> {
 True System.out.println(Thread.currentThread().getName() + " is working");
 True try {
 True Thread.sleep(1000);
 True } catch (InterruptedException e) {
 True e.printStackTrace();
 True }
 True latch.countDown(); // 倒计时减1
 True System.out.println(Thread.currentThread().getName() + " finished");
 True }).start();
 True}
 True
 TrueSystem.out.println("Waiting for all threads to finish...");
 Truelatch.await(); // 等待倒计时为0
 TrueSystem.out.println("All threads have finished");
 True```

 False### 6.2 CyclicBarrier
 False
 False- **循环栅栏**，等待一组线程达到屏障
 False
```java
 TrueCyclicBarrier barrier = new CyclicBarrier(3, () -> {
 True System.out.println("All threads have reached the barrier");
 True});
 True
 Truefor (int i = 0; i < 3; i++) {
 True new Thread(() -> {
 True System.out.println(Thread.currentThread().getName() + " is working");
 True try {
 True Thread.sleep(1000);
 True System.out.println(Thread.currentThread().getName() + " is waiting at the barrier");
 True barrier.await(); // 等待其他线程
 True System.out.println(Thread.currentThread().getName() + " continues");
 True } catch (Exception e) {
 True e.printStackTrace();
 True }
 True }).start();
 True}
 True```

 False### 6.3 Semaphore
 False
 False- **信号量**，控制同时访问资源的线程数
 False
```java
 TrueSemaphore semaphore = new Semaphore(2); // 最多2个线程同时访问
 True
 Truefor (int i = 0; i < 5; i++) {
 True new Thread(() -> {
 True try {
 True semaphore.acquire(); // 获取许可
 True System.out.println(Thread.currentThread().getName() + " acquired the semaphore");
 True Thread.sleep(2000);
 True } catch (InterruptedException e) {
 True e.printStackTrace();
 True } finally {
 True semaphore.release(); // 释放许可
 True System.out.println(Thread.currentThread().getName() + " released the semaphore");
 True }
 True }).start();
 True}
 True```

 False### 6.4 Future 和 CompletableFuture
 False
 False- **Future**: 表示异步计算的结果
 False- **CompletableFuture**: 提供了更丰富的异步操作 API
 False
```java
 True// 使用 CompletableFuture
 TrueCompletableFuture.supplyAsync(() -> {
 True System.out.println("Task executed in thread: " + Thread.currentThread().getName());
 True try {
 True Thread.sleep(1000);
 True } catch (InterruptedException e) {
 True e.printStackTrace();
 True }
 True return "Hello, CompletableFuture!";
 True}).thenAccept(result -> {
 True System.out.println("Result: " + result);
 True}).exceptionally(ex -> {
 True ex.printStackTrace();
 True return "Error occurred";
 True});
 True
 TrueSystem.out.println("Main thread continues");
 True// 等待异步任务完成
 Truetry {
 True Thread.sleep(2000);
 True} catch (InterruptedException e) {
 True e.printStackTrace();
 True}
 True```

 False## 7. 线程安全集合
 False
 False### 7.1 并发集合
 False
 False- **ConcurrentHashMap**: 线程安全的 HashMap
 False- **CopyOnWriteArrayList**: 读多写少场景的线程安全列表
 False- **CopyOnWriteArraySet**: 基于 CopyOnWriteArrayList 的线程安全集合
 False- **ConcurrentLinkedQueue**: 无界线程安全队列
 False- **BlockingQueue**: 阻塞队列接口，如 ArrayBlockingQueue, LinkedBlockingQueue
 False
 False### 7.2 同步集合
 False
 False- 通过 `Collections.synchronizedXXX()` 创建的线程安全集合
 False- 方法级同步，性能较低
 False
 False## 8. 线程间通信
 False
 False### 8.1 wait() 和 notify()/notifyAll()
 False
```java
 Trueclass SharedResource {
 True private boolean available = false;
 True private int data;
 True 
 True public synchronized void produce(int value) {
 True while (available) {
 True try {
 True wait(); // 等待消费者消费
 True } catch (InterruptedException e) {
 True e.printStackTrace();
 True }
 True }
 True data = value;
 True available = true;
 True System.out.println("Produced: " + data);
 True notifyAll(); // 通知消费者
 True }
 True 
 True public synchronized int consume() {
 True while (!available) {
 True try {
 True wait(); // 等待生产者生产
 True } catch (InterruptedException e) {
 True e.printStackTrace();
 True }
 True }
 True available = false;
 True System.out.println("Consumed: " + data);
 True notifyAll(); // 通知生产者
 True return data;
 True }
 True}
 True```

 False### 8.2 Condition
 False
 False- **更灵活的线程间通信方式**
 False- **与 Lock 配合使用**
 False
```java
 Trueclass BoundedBuffer {
 True private final Lock lock = new ReentrantLock();
 True private final Condition notFull = lock.newCondition();
 True private final Condition notEmpty = lock.newCondition();
 True private final Object[] buffer;
 True private int count, putIndex, takeIndex;
 True 
 True public BoundedBuffer(int size) {
 True buffer = new Object[size];
 True }
 True 
 True public void put(Object item) throws InterruptedException {
 True lock.lock();
 True try {
 True while (count == buffer.length) {
 True notFull.await(); // 缓冲区满，等待
 True }
 True buffer[putIndex] = item;
 True if (++putIndex == buffer.length) putIndex = 0;
 True count++;
 True notEmpty.signal(); // 通知消费者
 True } finally {
 True lock.unlock();
 True }
 True }
 True 
 True public Object take() throws InterruptedException {
 True lock.lock();
 True try {
 True while (count == 0) {
 True notEmpty.await(); // 缓冲区空，等待
 True }
 True Object item = buffer[takeIndex];
 True if (++takeIndex == buffer.length) takeIndex = 0;
 True count--;
 True notFull.signal(); // 通知生产者
 True return item;
 True } finally {
 True lock.unlock();
 True }
 True }
 True}
 True```

 False## 9. 实际应用案例
 False
 False### 9.1 生产者-消费者模式
 False
```java
 Truepublic class ProducerConsumerExample {
 True public static void main(String[] args) {
 True BlockingQueue<Integer> queue = new ArrayBlockingQueue<>(10);
 True 
 True // 生产者线程
 True Runnable producer = () -> {
 True try {
 True for (int i = 0; i < 20; i++) {
 True queue.put(i);
 True System.out.println("Produced: " + i);
 True Thread.sleep(100);
 True }
 True } catch (InterruptedException e) {
 True e.printStackTrace();
 True }
 True };
 True 
 True // 消费者线程
 True Runnable consumer = () -> {
 True try {
 True for (int i = 0; i < 20; i++) {
 True int value = queue.take();
 True System.out.println("Consumed: " + value);
 True Thread.sleep(200);
 True }
 True } catch (InterruptedException e) {
 True e.printStackTrace();
 True }
 True };
 True 
 True new Thread(producer).start();
 True new Thread(consumer).start();
 True }
 True}
 True```

 False### 9.2 线程池的使用
 False
```java
 Truepublic class ThreadPoolExample {
 True public static void main(String[] args) {
 True // 创建线程池
 True ExecutorService executorService = Executors.newFixedThreadPool(5);
 True 
 True // 提交任务
 True List<Future<Integer>> futures = new ArrayList<>();
 True for (int i = 0; i < 10; i++) {
 True final int taskId = i;
 True Future<Integer> future = executorService.submit(() -> {
 True System.out.println("Task " + taskId + " started");
 True Thread.sleep(1000);
 True System.out.println("Task " + taskId + " completed");
 True return taskId * 10;
 True });
 True futures.add(future);
 True }
 True 
 True // 获取结果
 True for (int i = 0; i < futures.size(); i++) {
 True try {
 True Integer result = futures.get(i).get();
 True System.out.println("Result of task " + i + ": " + result);
 True } catch (Exception e) {
 True e.printStackTrace();
 True }
 True }
 True 
 True // 关闭线程池
 True executorService.shutdown();
 True }
 True}
 True```

 False### 9.3 并行计算
 False
```java
 Truepublic class ParallelComputationExample {
 True public static void main(String[] args) {
 True int[] numbers = new int[1000000];
 True for (int i = 0; i < numbers.length; i++) {
 True numbers[i] = i + 1;
 True }
 True 
 True // 并行计算总和
 True long startTime = System.currentTimeMillis();
 True int sum = Arrays.stream(numbers).parallel().sum();
 True long endTime = System.currentTimeMillis();
 True 
 True System.out.println("Sum: " + sum);
 True System.out.println("Time taken: " + (endTime - startTime) + " ms");
 True }
 True}
 True```

 False## 10. 线程安全问题
 False
 False### 10.1 常见的线程安全问题
 False
 False- **竞态条件**: 多个线程同时访问共享资源导致数据不一致
 False- **死锁**: 两个或多个线程互相等待对方释放资源
 False- **活锁**: 线程不断尝试但始终无法获得资源
 False- **饥饿**: 某些线程长期无法获得 CPU 执行权
 False
 False### 10.2 死锁示例
 False
```java
 Trueclass DeadlockExample {
 True private static final Object lock1 = new Object();
 True private static final Object lock2 = new Object();
 True 
 True public static void main(String[] args) {
 True // 线程1: 先获取 lock1，再获取 lock2
 True new Thread(() -> {
 True synchronized (lock1) {
 True System.out.println("Thread 1 acquired lock1");
 True try {
 True Thread.sleep(100);
 True } catch (InterruptedException e) {
 True e.printStackTrace();
 True }
 True synchronized (lock2) {
 True System.out.println("Thread 1 acquired lock2");
 True }
 True }
 True }).start();
 True 
 True // 线程2: 先获取 lock2，再获取 lock1
 True new Thread(() -> {
 True synchronized (lock2) {
 True System.out.println("Thread 2 acquired lock2");
 True try {
 True Thread.sleep(100);
 True } catch (InterruptedException e) {
 True e.printStackTrace();
 True }
 True synchronized (lock1) {
 True System.out.println("Thread 2 acquired lock1");
 True }
 True }
 True }).start();
 True }
 True}
 True```

 False### 10.3 避免死锁的方法
 False
 False- **按顺序获取锁**
 False- **使用定时锁** (`tryLock()`)
 False- **使用 Lock 替代 synchronized**
 False- **减少锁的范围**
 False- **使用无锁数据结构**
 False
 False## 11. 最佳实践
 False
 False### 11.1 线程创建与管理
 False
 False- **优先使用线程池**而非直接创建线程
 False- **合理设置线程池参数**
 False- **使用 ExecutorService 管理线程生命周期**
 False- **避免创建过多线程**
 False
 False### 11.2 线程同步
 False
 False- **优先使用 synchronized** 关键字，简单易用
 False- **复杂场景使用 Lock** 接口
 False- **使用原子类**处理简单的原子操作
 False- **最小化同步范围**
 False- **避免在同步块中执行耗时操作**
 False
 False### 11.3 线程安全
 False
 False- **使用线程安全的集合**
 False- **避免共享可变状态**
 False- **使用不可变对象**
 False- **合理使用 volatile**
 False- **考虑使用并发工具类**
 False
 False### 11.4 性能优化
 False
 False- **减少线程上下文切换**
 False- **避免线程阻塞**
 False- **使用适当的并发级别**
 False- **考虑使用无锁算法**
 False- **合理使用缓存**
 False
 False## 12. 常见陷阱
 False
 False### 12.1 线程启动错误
 False
 False- **调用 run() 而不是 start()**
 False- **多次调用 start()**
 False
 False### 12.2 线程安全陷阱
 False
 False- **忘记释放锁**
 False- **死锁**
 False- **过度同步**
 False- **不正确的 volatile 使用**
 False
 False### 12.3 线程池陷阱
 False
 False- **线程池参数设置不合理**
 False- **忘记关闭线程池**
 False- **任务队列过大**
 False- **拒绝策略选择不当**
 False
 False### 12.4 内存可见性问题
 False
 False- **共享变量未使用 volatile**
 False- **非线程安全的单例模式**
 False
 False---
 False
 False### 更新日志 (Changelog)
 False
 False- 2026-04-05: 拆分并细化线程池与同步机制。
 False- 2026-05-03: 扩展内容，添加线程创建的具体实现、线程生命周期的详细说明、线程同步的各种机制、线程池的详细使用、并发工具类、线程安全问题和实际应用案例。
 False
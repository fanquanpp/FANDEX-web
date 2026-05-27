/*
 * @Author:      Anonymous
 * @Algorithm:   设计模式 (Design Patterns in TypeScript)
 * @Language:    TypeScript 5.0+
 * @Time Compl.: N/A
 * @Description: 演示 TypeScript 中的常用设计模式：单例模式 (Singleton) 与 观察者模式 (Observer)。 | Demonstrate common design patterns in TypeScript: Singleton and Observer.
 * @Teaching:    掌握设计模式有助于编写可维护的大型前端项目。 | Design patterns help write maintainable large-scale frontend projects.
 */

// 1. 单例模式 | Singleton Pattern
class Singleton {
    private static instance: Singleton;
    private constructor() {}

    public static getInstance(): Singleton {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }

    public showMessage(): void {
        console.log("Hello from Singleton! | 来自单例模式的问候！");
    }
}

// 2. 观察者模式 | Observer Pattern
interface Observer {
    update(message: string): void;
}

class Subject {
    private observers: Observer[] = [];

    public attach(observer: Observer): void {
        this.observers.push(observer);
    }

    public detach(observer: Observer): void {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    public notify(message: string): void {
        this.observers.forEach(obs => obs.update(message));
    }
}

class ConcreteObserver implements Observer {
    constructor(private name: string) {}
    update(message: string): void {
        console.log(`${this.name} received: ${message} | ${this.name} 收到消息：${message}`);
    }
}

// 3. 单元测试 | Unit Test
function testDesignPatterns() {
    // Test Singleton
    const s1 = Singleton.getInstance();
    const s2 = Singleton.getInstance();
    console.assert(s1 === s2, "Singleton test failed!");
    s1.showMessage();

    // Test Observer
    const sub = new Subject();
    const obs1 = new ConcreteObserver("Observer 1");
    const obs2 = new ConcreteObserver("Observer 2");
    
    sub.attach(obs1);
    sub.attach(obs2);
    sub.notify("Hello Observers! | 观察者们好！");
    
    sub.detach(obs1);
    sub.notify("Observer 1 detached! | 观察者 1 已离开！");
    
    console.log("Design Patterns (TS) tests passed! | 设计模式 (TS) 测试通过！");
}

if (require.main === module) {
    testDesignPatterns();
}

export { Singleton, Subject, ConcreteObserver };

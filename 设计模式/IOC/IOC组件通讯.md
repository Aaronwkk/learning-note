实现一个基于 IoC（控制反转）的组件通信示例，我们可以使用简单的 JavaScript 和一些设计模式，例如观察者模式或事件总线模式。下面是一个基于事件总线的示例，展示如何使用 IoC 容器来管理和注入共享服务，实现组件之间的通信。

### 步骤

1. 创建一个简单的 IoC 容器。
2. 实现一个事件总线服务。
3. 创建两个组件，通过事件总线服务进行通信。
4. 使用 IoC 容器将事件总线服务注入到组件中。

### 代码实现

#### 1. 创建 IoC 容器

首先，我们创建一个简单的 IoC 容器，用于管理和注入依赖。

```javascript
class IoCContainer {
  constructor() {
    this.services = new Map();
  }

  register(name, service) {
    this.services.set(name, service);
  }

  get(name) {
    return this.services.get(name);
  }
}

const container = new IoCContainer();
```

#### 2. 实现事件总线服务

接下来，我们实现一个简单的事件总线服务，用于组件之间的通信。

```javascript
class EventBus {
  constructor() {
    this.events = {};
  }

  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  }
}

const eventBus = new EventBus();
container.register('eventBus', eventBus);
```

#### 3. 创建组件

然后，我们创建两个组件，通过事件总线服务进行通信。

```javascript
class ComponentA {
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.init();
  }

  init() {
    // 监听事件
    this.eventBus.on('message', this.onMessageReceived.bind(this));
  }

  sendMessage(message) {
    // 发送事件
    this.eventBus.emit('message', message);
  }

  onMessageReceived(data) {
    console.log('ComponentA received:', data);
  }
}

class ComponentB {
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.init();
  }

  init() {
    // 监听事件
    this.eventBus.on('message', this.onMessageReceived.bind(this));
  }

  sendMessage(message) {
    // 发送事件
    this.eventBus.emit('message', message);
  }

  onMessageReceived(data) {
    console.log('ComponentB received:', data);
  }
}
```

#### 4. 使用 IoC 容器注入服务

最后，我们使用 IoC 容器将事件总线服务注入到组件中，并展示组件之间的通信。

```javascript
const eventBus = container.get('eventBus');
const componentA = new ComponentA(eventBus);
const componentB = new ComponentB(eventBus);

// ComponentA 发送消息
componentA.sendMessage('Hello from ComponentA');

// ComponentB 发送消息
componentB.sendMessage('Hello from ComponentB');
```

### 运行效果

执行上述代码后，控制台会输出以下内容：

```
ComponentA received: Hello from ComponentB
ComponentB received: Hello from ComponentA
```

### 解释

1. **IoC 容器**：用于管理和注入依赖服务。
2. **事件总线服务**：用于组件之间的通信，通过发布/订阅模式实现。
3. **组件 A 和 B**：通过事件总线发送和接收消息，实现组件之间的通信。
4. **依赖注入**：使用 IoC 容器将事件总线服务注入到组件中，简化了组件之间的通信逻辑。

通过这种方式，组件之间无需直接引用对方，只需通过事件总线进行通信，降低了耦合度，提高了可维护性。
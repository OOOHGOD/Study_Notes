### 一、最常用：用现成的装饰器（贴别人做好的贴纸）

这是你写代码90%会遇到的情况——别人已经把装饰器写好了，你只要一行代码就能给函数加功能，就像直接贴贴纸一样。

![](https://x105sv7wkkn.feishu.cn/space/api/box/stream/download/asynccode/?code=M2EzYTcxZjBkYTliY2RmYjkwZjdjMjUwMjVjZDAyMGNfMEkyN3Z3cU0zSndHRllVdTNZOW14MnBDQnpVd0tONWJfVG9rZW46VjhMYmJ1eDdHb1RuUFp4Q0lkUGNFc0kzbkhkXzE3ODM5NzIwNTQ6MTc4Mzk3NTY1NF9WNA&add_watermark=true&scene_type=CCM)

你截图里的 `@tool` 就是典型的现成装饰器，用法规则非常简单：

1. 先写好你的普通函数
2. 在函数的**头顶上一行**，写 `@装饰器的名字`
举个你截图里的简化例子：

```Python
# 1. 先导入别人写好的 tool 装饰器
from langchain.tools import tool

# 2. 把 @tool 贴在函数上面，装饰器就生效了
@tool
def get_weather(city: str) -> str:
    """查询城市的天气"""
    weather = {
        "北京": "晴天 25度",
        "上海": "多云 28度"
    }
    return f"{city}的天气是：{weather.get(city, '未知天气')}"
```

贴完 `@tool` 之后，这个查天气的函数就自动多了「能被AI程序识别、自动调用」的新能力，你完全不用改函数内部的代码。

Python自带的很多功能也是这么用的，比如 `@property`、`@staticmethod`，都是贴在函数头上就生效。

---

### 二、进阶：自己写装饰器（自己做魔法贴纸）

如果你想给函数加自定义的新功能（比如“每次运行都打印日志”“计算函数运行时间”），就可以自己写一个装饰器。

装饰器的本质：**一个接收“函数”当参数，返回“新函数”的函数**。

我们一步步做一个「执行前后打招呼」的装饰器：

#### 1. 写装饰器本身

```Python
# 这就是装饰器：它的参数 func，就是你要装饰的原函数
def say_hello_decorator(func):
    # 这是包装函数：在原函数的基础上，叠加新功能
    def wrapper():
        # ✨ 新功能1：调用原函数前，先打招呼
        print("Hello！准备开始执行啦～")
        
        # 调用原本的函数，保留它原来的功能
        func()
        
        # ✨ 新功能2：函数执行完，说再见
        print("Bye！执行结束啦～")
    
    # 把“加了新功能的新函数”返回出去
    return wrapper
```

#### 2. 用 @ 贴到你的函数上

```Python
@say_hello_decorator
def my_function():
    print("我是原本的函数，正在运行")
```

这个 `@` 是Python的简便写法（也叫语法糖），它本质上等价于：

`my_function = say_hello_decorator(my_function)`

就像把函数送进装饰器里加工一遍，再把加工好的新函数换回来。

#### 3. 调用函数看效果

```Python
my_function()
```

运行结果：

```Plain
Hello！准备开始执行啦～
我是原本的函数，正在运行
Bye！执行结束啦～
```

我们完全没改 `my_function` 内部的代码，只贴了个装饰器，它就多了前后打招呼的功能。

---

### 三、如果原函数带参数怎么办？

你截图里的 `get_weather(city)` 是带参数的函数，这时候装饰器的包装函数要能接住参数，我们用 `*args, **kwargs` 就能兼容所有参数：

```Python
def say_hello_decorator(func):
    # *args, **kwargs 可以接住任意数量、任意名字的参数
    def wrapper(*args, **kwargs):
        print("Hello！准备开始执行啦～")
        
        # 把参数原封不动传给原函数，并且接住它的返回值
        result = func(*args, **kwargs)
        
        print("Bye！执行结束啦～")
        # 把原函数的结果正常返回出去
        return result
    
    return wrapper
```

给带参数的加法函数用：

```Python
@say_hello_decorator
def add(a, b):
    return a + b

print(add(3, 5))
```

运行结果：

```Plain
Hello！准备开始执行啦～
Bye！执行结束啦～
8
```

---

### 总结

1. **用现成装饰器**：函数头顶写 `@装饰器名`，一键生效
    
2. **自己写装饰器**：写一个「接收函数、返回新函数」的函数，再用 `@` 贴到目标函数上
    

需要我再举一个计算函数运行时间的装饰器例子，或者讲一讲你图里 `@tool` 的具体工作原理吗？
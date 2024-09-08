import { type JSX, Show, createSignal } from "solid-js";

type Props = {
  children: JSX.Element;
};

function Tooltip(props: Props) {
  const [isVisible, setIsVisible] = createSignal(false);
  const [clickCount, setClickCount] = createSignal(0);

  const messages = [
    "std::cout << \"Hello, World!\" << std::endl;", // C++
    "import numpy as np", // Python
    "import jax.numpy as jnp", // JAX
    "std::vector<int> v = {1, 2, 3};", // C++
    "def my_function():\n    pass", // Python
    "x = jnp.array([1, 2, 3])", // JAX
    "std::unique_ptr<MyClass> ptr = std::make_unique<MyClass>();", // C++
    "class MyClass:\n    def __init__(self):\n        pass", // Python
    "y = jnp.dot(x, x)", // JAX
    "std::thread t([]{ do_something(); });", // C++
    "with open('file.txt', 'r') as file:\n    content = file.read()", // Python
    "z = jnp.add(x, y)", // JAX
    "std::map<std::string, int> my_map;", // C++
    "try:\n    x = 1 / 0\nexcept ZeroDivisionError:\n    pass", // Python
    "grad_fn = jax.grad(my_function)", // JAX
    "std::shared_ptr<MyClass> sp = std::make_shared<MyClass>();", // C++
    "import matplotlib.pyplot as plt", // Python
    "key = jax.random.PRNGKey(0)", // JAX
    "std::mutex mtx;", // C++
    "for i in range(10):\n    print(i)", // Python
    "jax.jit(my_function)", // JAX
    "std::condition_variable cv;", // C++
    "import pandas as pd", // Python
    "jax.vmap(my_function)", // JAX
  ];

  const currentMessage = () => {
    const count = clickCount();
    if (count >= messages.length) {
      return messages[messages.length - 1];
    }
    return messages[count];
  };

  return (
    <div class="relative inline-block">
      <div
        onMouseDown={() => {
          setIsVisible(!isVisible());
          if (isVisible()) {
            setClickCount((count) => count + 1);
          }
        }}
        onMouseUp={() => {
          setIsVisible(false);
        }}
        onTouchStart={() => {
          setIsVisible(!isVisible());
          if (isVisible()) {
            setClickCount((count) => count + 1);
          }
        }}
        onTouchEnd={() => {
          setIsVisible(false);
        }}
      >
        {props.children}
      </div>

      <Show when={isVisible()}>
        <div class="absolute left-1/2 -translate-x-1/2 -translate-y-24 mt-1 w-auto max-h-[70px] p-2 bg-black text-white text-center rounded-lg z-10 shadow-custom shadow-primary-500 border border-primary-500 whitespace-normal after:content-[''] after:block after:rotate-45 after:w-4 after:h-4 after:shadow-custom after:shadow-primary-500 after:absolute after:-bottom-2 after:-translate-x-1/2 after:left-1/2 after:bg-black after:z-20">
          <p class="w-max">{currentMessage()}</p>
        </div>
      </Show>
    </div>
  );
}

export default Tooltip;

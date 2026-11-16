process.on("message", (data) => {

  const fib = (n) => {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
  };

  
  const result = fib(data.num);
  process.send({ result });
});

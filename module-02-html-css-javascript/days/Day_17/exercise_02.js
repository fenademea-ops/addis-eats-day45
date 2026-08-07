function makeCounter() {
  let count = 0; // Private variable enclosed within the lexical scope

  return function() {
    count += 1;
    return count;
  };
}

const counter = makeCounter();

console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3

/* 
EXPLANATION:
The `count` variable stays private because it is declared inside the local scope of `makeCounter`.
JavaScript uses lexical scoping, meaning the inner returned function retains access to `count` via 
a closure, even after `makeCounter()` finishes execution. External code has no direct reference 
or access to `count` and can only modify it through the returned function.
*/
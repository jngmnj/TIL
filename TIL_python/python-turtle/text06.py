import turtle as t
from random import randint

# 기하학패턴 
for steps in range(100):
    for c in ('blue', 'red', 'green'):
        t.color(c)
        t.forward(steps)
        t.right(30)
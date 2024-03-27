from random import randint
import math

# 중앙을 유지하는 y좌표 구하기 

r = 10

def drawRain():
    # 좌표
    x = randint(-250, 250)
    y = randint(-250, 250)

    for i in range(10, -1, -1): 
        # t.circle(r * i) 
        # 
        # t.circle((11 - i)*r) 
        print("반지름",(11 - i)*r)
        
        # print("Y값1", (r * i)*(-1)) # -10씩 줄어듦
        print("Y값2", (r * (11 - i))*(-1)) # -10씩 줄어듦
        print("Y값4", y - r * (11 - i)) # -10씩 줄어듦


drawRain()

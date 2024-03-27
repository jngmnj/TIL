import turtle
from random import randint
import math

# 원을 여러 개의 작은 선으로 구성
# def draw_circle(radius, num_lines):
#     for i in range(num_lines):
#         turtle.pensize(randint(1, 10))
#         turtle.forward(2 * radius * math.pi / num_lines)
#         turtle.left(360 / num_lines)

# # 원 그리기
# draw_circle(50, 4)

# turtle.done()

# 색상 설정
turtle.colormode(255)

# RGBA 색상을 만드는 함수
def rgba(r, g, b, a):
    return (r, g, b, a)

# RGBA 색상을 RGB 형식으로 변환하는 함수
def rgba_to_rgb(r, g, b, a):
    # r, g, b, a = rgba_color
    return (int((1 - a) * 255 + a * r), int((1 - a) * 255 + a * g), int((1 - a) * 255 + a * b))

# 투명도를 조절할 색상
custom_color = rgba(255, 0, 0, 0.5)  # 빨간색에 투명도 0.5

# RGBA 색상을 RGB로 변환
# rgb_color = rgba_to_rgb(custom_color)

# 그림 그리기
def draw_square():
    for i in range(4):
        turtle.forward(100)
        turtle.left(90)

# 그림 사라지게 하기
def disappear():
    turtle.clear()

# 점점 투명해지는 효과
def fade_out():
    for i in range(10, -1, -1):
        turtle.pencolor(0, 0, 0)
        turtle.pencolor(rgba_to_rgb(255, 0, 0, i/10))
        turtle.forward(10)

# 그림 그리기 및 사라지게 하기
draw_square()
# disappear()
fade_out()

# turtle.done()
        


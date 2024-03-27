import turtle
turtle.colormode(255)
# RGBA 색상을 만드는 함수
def rgba(r, g, b, a):
    return (r, g, b, a)

# RGBA 색상을 RGB 형식으로 변환하는 함수
def rgba_to_rgb(rgba_color):
    r, g, b, a = rgba_color
    # return ((1 - a) * 255 + a * r, (1 - a) * 255 + a * g, (1 - a) * 255 + a * b)
    return (int((1 - a) * 255 + a * r), int((1 - a) * 255 + a * g), int((1 - a) * 255 + a * b))


# 투명도를 조절할 색상
custom_color = rgba(255, 0, 0, 0.1)  # 빨간색에 투명도 0.5

# RGBA 색상을 RGB로 변환
rgb_color = rgba_to_rgb(custom_color)

# Turtle 설정
screen = turtle.Screen()
screen.bgcolor("white")
turtle.speed(0)
turtle.penup()
turtle.goto(-100, 0)
turtle.pendown()

# RGB로 변환된 색상으로 펜 색상 설정
# turtle.pencolor(rgb_color)
turtle.pencolor(rgba_to_rgb(custom_color))

# 원 그리기
turtle.circle(100)

# 종료
turtle.done()
import turtle

# 초기 설정
screen = turtle.Screen()
screen.setup(width=600, height=600)
screen.bgcolor("white")

# 거북이 설정
t = turtle.Turtle()
t.speed(0)  # 최대 속도

# 기하학적 패턴 그리기
for i in range(36):  # 전체 36개의 도형 그리기
    if i % 2 == 0:
        t.color("blue")  # 파란색으로 설정
    else:
        t.color("red")  # 빨간색으로 설정

    if i % 3 == 0:
        # 삼각형 그리기
        for _ in range(3):
            t.forward(100)
            t.left(120)
    elif i % 3 == 1:
        # 원 그리기
        t.circle(50)
    else:
        # 사각형 그리기
        for _ in range(4):
            t.forward(100)
            t.left(90)

    # 거북이 위치 및 각도 조정
    t.penup()
    t.goto(0, 0)
    t.pendown()
    t.right(10)  # 다음 도형을 그릴 때 거북이의 회전 각도 조정

# 화면 유지
turtle.done()
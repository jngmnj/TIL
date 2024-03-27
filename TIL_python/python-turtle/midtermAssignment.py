# 2024-03-26
# 조건문 반복문 함수 하나 이상씩 사용하여 터틀로 그림그리기

# ideas
# 서클 그리는데 컬러, 펜굵기 어떤 지점에서 다르게 (펜굵기와 컬러는 불규칙적으로 )
# 떨어지는 빗방울 transition animation
# fade out 되거나
# 크기가 점점 커지면서 없어지거나 
import turtle as t
from random import randint

# 화면 초기화
t.clearscreen()

# background color
t.bgcolor('white')

# color mode RGB
t.colormode(255);

# 팬톤 RGB color palette
colors = [
    (247, 127, 190),  # 팬톤 비비드 핑크
    (152, 193, 217),  # 팬톤 비비드 블루
    (255, 204, 0),    # 팬톤 비비드 옐로우
    (175, 238, 188),  # 팬톤 비비드 민트
    (204, 128, 209),  # 팬톤 비비드 라일락
    (255, 153, 51),   # 팬톤 비비드 오렌지
    (237, 162, 200),  # 팬톤 비비드 라벤더
]

def rgba(rgb, a):
    r, g, b = rgb
    return (r, g, b, a)


# RGBA 색상을 RGB 형식으로 변환하는 함수
def rgba_to_rgb(rgba_color):
    r, g, b, a = rgba_color
    return (int((1 - a) * 255 + a * r), int((1 - a) * 255 + a * g), int((1 - a) * 255 + a * b))


# radius of the circle 
r = 10

# 속도 설정
t.speed(200)
  
# 퍼져나가면서 점점 옅어지기 
# opacity는 1에서 0까지 .1씩 작아짐
    
# i는 10부터 1까지 
# 반지름은 1r부터 10r까지
def drawRain():
    # 좌표
    x = randint(-250, 250)
    y = randint(-250, 250)
    randomColor = colors[randint(0,6)]
    t.up() 
    t.goto(x,y)
    t.down()
    
    for i in range(10, -1, -1): 
        t.pencolor(rgba_to_rgb(rgba(randomColor, i/10)))
        t.circle((11 - i)*r) 

        # y 좌표 변경
        t.up() 
        newY = y - r * (11 - i)
        t.sety(newY)
        t.down()

for i in range(30):
    drawRain()

t.done()
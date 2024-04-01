# 2024-03-26
# 조건문 반복문 함수 하나 이상씩 사용하여 터틀로 그림그리기
# 크기가 점점 커지면서 opacity가 줄어드는 컬러감(rgba -> rgb 변환 필요)

import turtle as t
from random import randint

# 화면 초기화
t.clearscreen()

# background color 설정
t.bgcolor('white')

# color mode RGB로 변경
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
# a = 알파채널값. 투명도. 
# RGB는 알파채널이 없기때문에 투명도를 색상에 반영하려면 
# (1-a) * 255에 a*(r|g|b)를 더한다. 
def rgba_to_rgb(rgba_color):
    r, g, b, a = rgba_color
    return (int((1 - a) * 255 + a * r), int((1 - a) * 255 + a * g), int((1 - a) * 255 + a * b))


# radius of the circle 
r = 8


# 속도 설정
t.speed(2000)
  
# 퍼져나가면서 점점 옅어지기 
# opacity는 1에서 0까지 .1씩 작아짐
    
# i는 10부터 1까지 
# 반지름은 1r부터 10r까지
def drawRain():
    # 좌표
    x = randint(-250, 250)
    y = randint(-250, 250)
    # 그림 색상이 팬톤 컬러팔레트에서 0부터 6개 
    randomColor = colors[randint(0,6)]
    t.up() 
    t.goto(x,y)
    t.down()
    
    for i in range(10, -1, -1): 
        # 그림 하나에 크기가 작은것부터 큰것을 그리는데
        
        # 하나 그릴때마다 색상이 점점 옅어지게된다.
        t.pencolor(rgba_to_rgb(rgba(randomColor, i/10)))
        t.circle((11 - i)*r) 

        # y 좌표 변경
        t.up() 
        newY = y - r * (11 - i)
        t.sety(newY)
        t.down()

# 30개 그린다. 
for i in range(30):
    drawRain()

t.done()
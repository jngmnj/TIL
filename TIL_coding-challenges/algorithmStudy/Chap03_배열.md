# [Python Algorithm] Chapter03. 배열
> DATE: 2024-07-18

## 2. 2차원 배열 다뤄보기

### 2-1. 교점에 별 만들기(level2)
URL: https://school.programmers.co.kr/learn/courses/30/lessons/87377

Ax + By + C = 0으로 표현할 수 있는 n개의 직선이 주어질 때, 이 직선의 교점 중 정수 좌표에 별을 그리려 합니다.
...
직선 A, B, C에 대한 정보가 담긴 배열 line이 매개변수로 주어집니다. 이때 모든 별을 포함하는 최소 사각형을 return 하도록 solution 함수를 완성해주세요.

**문제 풀이 방식**
1. 교점 구하기
2. 정수 교점만 따로 변수로 저장
3. 교점을 모두 표현할 수 있는 최소한의 사각형 알아내기
4. 모든 교점 * 찍기
5. 배열 거꾸로 뒤집어 반환

#### 1. 교점 구하기
```python
    n = len(line)
    for i in range(n):
        a, b, e = line[i]
        for j in range(i + 1, n):
            c, d, f = line[j]
            if a * b == b * c:
                continue

            x = (b * f - e * d) / (a * d - b * c)
            y = (e * c - a * f) / (a * d - b * c)
```
직선수만큼 for문 돌리기
다른직선과 교차점 구하기
`a*b == b*c`면 continue는 ?? 


#### 2. 정수 교점만 따로 변수로 저장
```python
if x == int(x) and y == int(y):
    x = int(x)
    y = int(y)
    pos.append([x, y])
```
x와 y가 정수라면 x, y에 값을 담고?? 교차점 저장

#### 3. 교점을 모두 표현할 수 있는 최소한의 사각형 알아내기
```python
if x_min > x: x_min = x
if y_min > y: y_min = y
if x_max < x: x_max = x
if y_max < y: y_max = y
```
x, y 공식 바로 아래에서
x, y의 최솟값, 최대값 저장하기
나중에 최소 사각형 크기를 구할때 쓰일 예정

#### 4. 모든 교점 * 찍기
```python
# 가로길이
x_len = x_max - x_min + 1
# 세로길이
y_len = y_max - y_min + 1
# 가로, 세로 길이로 좌표 기록할 2차원배열 생성
# 해석: 가로길이와 세로길이의 2차원 배열인데 '.'로 초기화
# 리스트 내포(list comprehension)를 사용하여 2차원 리스트를 생성
coord = [['.'] * x_len for _ in range(y_len)] 

for star_x, star_y in pos:
    nx = star_x + abs(x_min) if x_min < 0 else star_x - x_min
    ny = star_y + abs(y_min) if y_min < 0 else star_y - y_min
    coord[ny][nx] = '*'
```
x,y 최소값이 음수라면 
절대값 연산 `abs()`로 증가량 자체를 보정하여 좌표를 찍어야함 

#### 5. 배열 거꾸로 뒤집어 반환
```python
for result in coord:
    answer.append(''.join(result))

return answer[::-1]
```
배열 역순으로 바꾸는 방법
- [].reverse()
- reversed([])
- 슬라이싱 사용 [::-1]으로 반대로 출력




#### 최종 코드
```python
def solution(line):
    #prevent swallow copy
    pos, answer = [], []
    n = len(line)

    # 초기화
    x_min = y_min = int(1e15)
    x_max = y_max = -int(1e15)

    for i in range(n): 
        a, b, e = line[i]
        for j in range(i+1, n):
            c, d, f = line[j]
            if a * b = b * c: continue
        
        x = (b * f - e * d) / (a * d - b * c)
        y = (e * c - a * f) / (a * d - b * c)
        
        if x == int(x) and y == int(y):
            x = int(x)
            y = int(y)
            pos.append([x, y])
            if x_min > x: x_min = x
            if y_min > y: y_min = y
            if x_max < x: x_max = x
            if y_max < y: y_max = y

    x_len = x_max - x_min + 1
    y_len = y_max - y_min + 1
    coord = [['.'] * x_len for _ in range(y_len)]

    for star_x, star_y in pos:
        nx = star_x + abs(x_min) if x_min < 0 else star_x - x_min
        ny = star_y + abs(y_min) if y_min < 0 else star_y - y_min
        coord[ny][nx] = '*'

    for result in coord:
        answer.append(''.join(result))

    return answer[::-1]
            
```
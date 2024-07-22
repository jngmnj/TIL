## while문

보통은 while문보다 for문을 더 많이 쓴다. 

### `while` 문의 기본 구조

`while` 문은 특정 조건이 참(`True`)인 동안 코드 블록을 반복해서 실행한다. 

```python
while 조건:
    실행할 코드
    
i = 1
while i <= 5:
    print(i)
    i += 1  # i를 1씩 증가시킨다
```

### 

## for문

특정한 변수를 이용하여 ‘in’뒤에 오는 데이터(리스트, 튜플 등)에 포함되어있는 원소를 첫번째 인덱스부터 차례대로 하나씩 방문한다. 

for문에서 연속적인 값을 차례대로 순회할때는 range()를 주로 사용한다. 

`range(시작값, 끝값 + 1)`

인자를 하나만 넣으면 자동으로 시작값은 0이 된다. 

```python
for i in range(1, 10, 2):  # 1부터 9까지 2씩 증가하면서 출력
    print(i)
```

## break와 continue

루프를 즉시 종료하려면 `break` 문을 사용해야 한다. 

`continue` 문을 사용하여 현재 반복의 나머지 부분을 건너뛰고 다음 반복을 시작할 수 있다.

```python
i = 1
while True:
    print("무한 루프")
    if i == 5:
	      break  # 반복 5회째 루프를 종료
	  i += 1
```

```python
i = 0
while i < 10:
    i += 1
    if i % 2 == 0:
        continue  # 짝수인 경우 다음 반복으로 건너뜀
    print(i)  # 홀수만 출력
```

## 배열에서 특정 원소 제외하기(?)

```python
scores = [90, 99, 77, 65, 97]
cheating_student_list = {2, 4}

for i in range(5):
    if i + 1 in cheating_student_list:
        continue
    if scores[i] >= 80:
		    print(i + 1, "번 학생은 합격입니다.")
```
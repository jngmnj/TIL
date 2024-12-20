# 2. 자료형

## 2-1. 정수형

- 정수형(Integer)은 정수를 다루는 자료형
- 양의 정수, 음의 정수, 0이 포함된다.
- 코딩테스트에서 출제되는 많은 문제들은 정수형을 주로 다루게 된다.

## 2-2. 실수형

- 소수점 아래의 데이터를 포함하는 수 자료형
- 파이썬에서는 변수에 소수점을 붙이 수를 대입하면 실수형 변수로 처리된다
- 소수부가 0이거나, 정수부가 0인 소수는 0을 생략하고 작성할 수 있다.

```python
# 소수부가 0일때 0생략
a = 5. # 5.0

# 정수부가 0일때 0생략
a = -.7 # -0.7
```

## 2-3. 지수 표현 방식

- 파이썬에서는 e나 E를 이용한 지수표현방식을 이용할 수 있다.
    - e나 E다음에 오는 수는 10의 지수부를 의미
    - 1e9는 10의 9제곱(1,000,000,000)
    - `유효숫자e지수 = 유효숫자 X 10지수`
- 지수 표현방식은 임의의 큰 수를 표현하기위해 자주 사용
- 최단 경로 알고리즘에서는 도달할 수 없는 노드에 대하여 최단거리를 무한(INF)으로 설정하곤 한다
- 이때 가능한 최댓값이 10억 미만이라면 무한(INF)의 값으로 1e9를 이용할 수 있다.

```python
a = 1e9 # 1000000000.0
a = int(1e9) # 1000000000
```

## 2-4. 실수형 더 알아보기

- 오늘날 가장 널리 쓰이는 IEEE754표준에서는 실수형을 저장하기 위해 4바이트, 혹은 8바이트의 고정된 크기의 메모리를 할당하므로, 컴퓨터 시스템은 실수정보를 표현하는 정확도에 한계를 가진다.
- 예) 10진수 체계에서는 0.3과 0.6을 더한 값이 0.9로 정확히 떨어진다.
    - 하지만 2진수에서는 0.9를 정확히 표현할 수 있는 방법이 없다.
    - 컴퓨터는 최대한 0.9와 가깝게 표현하지만, 미세한 오차가 발생하게 된다.

```python
a = 0.3 + 0.6 # 0.89999999

if a == 0.9:
	print(True)
else: 
	print(False)
	
# False
```

- 개발과정에서 실수 값을 제대로 비교하지 못해서 원하는 결과를 얻지 못할 수 있다.
- 이럴때는 round()함수를 이용할 수 있음(이 방법 권장)
- 예) 123.456을 소수 셋째자리에서 반올림하려면 round(123.456, 2)라고 작성
    - 결과는 123.46이 된다.

```python
a = 0.3 + 0.6
print(round(a, 4)) # 0.9

if round(a, 4) == 0.9:
	print(True)
else: 
	print(False)
	
# True
```

## 2-5. 수 자료형의 연산

- 수 자료형에 대하여 사칙연산과 나머지 연산자가 많이 사용된다.
- 단, **나누기 연산자(/)는 나눠진 결과를 실수형으로 반환**한다.
- 다양한 로직을 설계할 때 나머지연산자(%)를 이용해야 할 때가 많음
    - a가 홀수인지 체크해야 하는 경우
- 파이썬에서는 몫을 얻기위해 몫연산자(//)를 사용
- 이외에 거듭제곱 연산자(**)를 비롯해 다양한 연사자들이 존재
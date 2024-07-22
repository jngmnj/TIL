# 6. 기본 입출력

## 기본 입출력

- 모든 프로그램은 적절한(약속된) 입출력 양식을 가지고 있다. 
- 프로그램 동작의 첫번째 단계는 데이터를 입력받거나 생성하는것

## 자주 사용되는 표준 입력방법

- input() 함수는 **한 줄의 문자열을 입력**받는 함수
- map() 함수는 **리스트의 모든 원소에 각각 특정한 함수를 적용**할 때 사용
- 공백을 기준으로 구분된 데잉터를 입력받을때는 다음과 같이 사용
    - list(map(int, input().split()))
- 공백을 기준으로 구분된 데이터의 개수가 많지 않다면, 단순히 다음과 같이 사용
    - a, b, c = map(int, input().split()))

## 입력을 위한 전형적인 소스 코드

`data = list(map(int, input().split()))` << 이거는 자주사용하므로 꼭 외우기 

```python
# 데이터의 개수 입력
n = int(input()) 

# 각 데이터를 공백을 기준으로 구분하여 입력
data = list(map(int, input().split())) # 정수형으로 각각 

data.sort(reverse=True)
# print(data)
```

```python
# 공백기준으로 입력받기 
a, b, c = map(int, input().split()) 
print(a, b, c)
```

## 빠르게 입력받기

- 사용자로부터 **입력을 최대한 빠르게 받아야하는 경우**
- 파이썬의 경우 sys라이브러리에 정의되어있는 sys.stdin.readline() 메서드를 이용
- 단, 입력후 enter가 줄바꿈기호로 입력되므로 rstrip() 메서드를 함께 사용
- 이진탐색,정렬,그래프 관련 문제에서 자주 사용됨

```python
import sys

# 문자열 입력받기
data = sys.stdin.readline().rstrip()
print(data)
```

## 자주 사용되는 표준 출력방법

- 기본 출력 print() 함수 사용
    - 각 변수를 콤마를 이용하여 띄어쓰기로 구분하여 출력
- print()는 기본적으로 출력이후에 줄바꿈을 수행
    - 줄 바꿈을 원치 않는경우 end속성을 이용
    
    ```python
    # 기본 출력
    print("Hello, World!")
    
    # 여러 변수 출력
    a = 1
    b = 2
    print(a, b)
    
    # 줄바꿈 없이 출력
    for i in range(5):
        print(i, end=' ')  # 0 1 2 3 4
    ```
    
- 정수형과 문자열 결합하여 출력
    - 파이썬에서는 정수형과 문자열을 결합하여 출력할 때, 정수형을 문자열로 변환하여 사용
    - 이를 위해 `str()` 함수를 사용하여 정수형을 문자열로 변환한 후 `+` 연산자를 사용하여 결합
    
    ```python
    a = 10
    # 정수형 a를 문자열로 변환하여 결합
    print(str(a) + "개의 사과가 있습니다.")  # 출력: 10개의 사과가 있습니다.
    
    ```
    

## f-string 예제

파이썬의 f-string은 문자열 포매팅을 간편하게 해주는 기능. f-string을 사용하면, 문자열 안에 중괄호 `{}`를 이용하여 변수나 표현식을 삽입할 수 있다. f-string을 사용하려면 문자열 앞에 `f` 또는 `F`를 붙이면 된다.

### f-string 기본 사용법

```python
name = "Alice"
age = 25

# f-string을 사용하여 문자열 포매팅
message = f"안녕하세요, {name}님. 당신의 나이는 {age}세 입니다."
print(message)  # 출력: 안녕하세요, Alice님. 당신의 나이는 25세 입니다.

```

### 표현식 사용

f-string 안에서는 단순히 변수를 삽입하는 것 외에도, 표현식을 사용할 수 있다.

```python
a = 5
b = 3

# f-string 내에서 표현식 사용
result = f"{a} + {b} = {a + b}"
print(result)  # 출력: 5 + 3 = 8

```

### 포맷팅 옵션

f-string은 포맷팅 옵션도 지원한다. 예를 들어, 소수점 자리수를 지정하거나, 정수를 특정한 자리수로 맞추어 출력할 수 있다.

```python
number = 3.14159

# 소수점 둘째 자리까지 출력
formatted_number = f"{number:.2f}"
print(formatted_number)  # 출력: 3.14

# 정수를 5자리로 맞추어 출력
num = 42
formatted_num = f"{num:05d}"
print(formatted_num)  # 출력: 00042

```

f-string을 사용하면, 가독성 높고 간결한 코드 작성을 할 수 있다. 특히, 여러 변수를 포함한 문자열을 만들 때 매우 유용하다.
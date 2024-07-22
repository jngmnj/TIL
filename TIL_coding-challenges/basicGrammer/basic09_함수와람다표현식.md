# 9. 함수와 람다 표현식

## 함수

- 특정한 작업을 하나의 단위로 묶어놓은 것
- 함수를 사용하면 코드의 재사용성과 가독성을 높일 수 있다.
- 파이썬에서 함수를 정의하려면 `def` 키워드를 사용한다.

## 함수 종류

- 내장 함수: 파이썬이 기본적으로 제공하는 함수
- 사용자 정의 함수: 개발자가 직접 정의하여 사용 할 수 있는 함수

## 함수의 정의

```python
def 함수이름(매개변수1, 매개변수2, ...):
    실행할 코드
    return 반환값
```

## 함수 예제

### 1. 기본 함수

간단한 인사말을 출력하는 함수이다.

```python
ef say_hello():
    print("안녕하세요!")

say_hello()
```

### 2. 매개변수가 있는 함수

이름을 입력받아 인사말을 출력하는 함수이다.

```python
def greet(name):
    print(f"안녕하세요, {name}님!")

greet("철수")
```

### 3. 반환값이 있는 함수

두 수를 더하여 결과를 반환하는 함수이다.

```python
def add(a, b):
    return a + b

result = add(3, 5)
print(result)
```

### 4. 기본값을 갖는 매개변수

매개변수에 기본값을 지정할 수 있다.

```python
def greet(name="손님"):
    print(f"안녕하세요, {name}님!")

greet()
greet("영희")
```

### 5. 키워드 인자

함수를 호출할 때 인자의 이름을 지정할 수 있다. 이때 argument순서 바뀌어도 됨. 

```python
def introduce(name, age):
    print(f"이름: {name}, 나이: {age}")

introduce(age=25, name="철수")
```

### 6. 가변 인자

매개변수의 개수가 정해져 있지 않을 때는 `*`를 사용하여 가변 인자를 받을 수 있다.

```python
def print_numbers(*numbers):
    for number in numbers:
        print(number)

print_numbers(1, 2, 3, 4, 5)
```

### 7. 키워드 가변 인자

키워드 인자의 개수가 정해져 있지 않을 때는 `**`를 사용하여 가변 키워드 인자를 받을 수 있다.

```python
def print_info(**info):
    for key, value in info.items():
        print(f"{key}: {value}")

print_info(name="철수", age=25, city="서울")
```

### 8. 함수 내 함수

함수 안에 다른 함수를 정의할 수 있다.

```python
def outer_function():
    print("외부 함수 실행")

    def inner_function():
        print("내부 함수 실행")

    inner_function()

outer_function()
```

### 9. 람다 함수

짧은 함수를 간결하게 작성할 때는 `lambda` 키워드를 사용할 수 있다.

```python
add = lambda a, b: a + b
print(add(3, 5))
```

이처럼 파이썬 함수는 다양한 방식으로 정의하고 사용할 수 있다. 함수는 코드의 모듈화와 재사용성을 높이는 데 중요한 역할을 한다.

## global 키워드

global 키워드로 변수를 지정하면 해당 함수에서는 지역변수를 만들지 않고, 함수 바깥에 선언된 변수를 바로 참조하게 된다. 함수 내에서 전역변수 값 변경도 가능하다. 
전역 변수 자체를 함수 내부에서 수정(재할당)하려면 `global` 키워드를 사용해야 한다.

```python
x = 10  # 전역 변수

def modify_global():
    global x  # 전역 변수 x를 사용
    x = 20  # 전역 변수 x를 수정

modify_global()
print(x)  # 출력: 20
```

### `global` 키워드를 사용하지 않아도 되는 조건

- 함수 내부에서 전역 변수를 읽기만 하고, 수정하지 않을 때는 `global` 키워드를 사용할 필요가 없다.
- 전역 변수의 속성이나 메서드를 호출하는 경우
    - 전역 변수가 가리키는 객체의 속성이나 메서드를 수정하거나 호출할 때도 `global` 키워드가 필요 없다. 이는 객체의 참조가 변하지 않기 때문이다.
    
    ```python
    my_list = [1, 2, 3]  # 전역 리스트 변수
    
    def append_to_list():
        my_list.append(4)  # 전역 리스트 변수의 메서드를 호출하여 수정
    
    append_to_list()
    print(my_list)  # 출력: [1, 2, 3, 4]
    ```
    
    이 예제에서는 `my_list`라는 전역 리스트 변수의 `append` 메서드를 호출하여 리스트에 새로운 요소를 추가한다. `my_list` 자체를 재할당하는 것이 아니기 때문에 `global` 키워드가 필요 없다.
    

따라서, 전역 변수를 함수 내부에서 수정하지 않고 읽기만 하거나, 전역 변수가 가리키는 객체의 메서드나 속성을 사용하는 경우에는 `global` 키워드가 필요 없다. 반면에 전역 변수를 함수 내부에서 재할당하여 수정하려면 `global` 키워드를 반드시 사용해야 한다.

`global` 키워드는 전역 변수를 함수 내부에서 수정해야 할 때 사용한다. 하지만 전역 변수를 과도하게 사용하면 코드의 가독성과 유지보수성이 떨어질 수 있으므로, 가능한 한 함수의 매개변수와 반환값을 통해 데이터를 주고받는 것이 좋다.

## 여러개의 반환값

파이썬에서는 함수가 여러 개의 값을 반환할 수 있다. 이러한 값들은 튜플 형태로 반환된다. 예를 들어, 다음과 같이 여러 값을 반환할 수 있다.

```python
def operator(a, b):
	  add_var = a + b
	  subtract_var = a - b
	  multiply_var = a * b
	  divide_var = a / b
    return add_var, subtract_var, multiply_var, divide_var # 팩킹

a, b, c, d = operator(7, 3) # 언팩킹
print(a, b, c, d)
```

이 예제에서 `multiple_returns` 함수는 1, 2, 3의 세 값을 튜플로 반환한다.

## 람다 표현식

- 람다 표현식은 익명 함수(anonymous function)를 만들기 위한 간결한 문법이다.
- 일반적으로 짧은 함수를 한 줄로 정의할 때 사용한다.
- 람다 표현식은 `lambda` 키워드를 사용하여 정의한다.
    
    ```python
    lambda 인자1, 인자2, ... : 표현식
    ```
    
    - `lambda`: 람다 함수를 정의하기 위한 키워드.
    - `인자`: 함수에 전달할 입력값.
    - `표현식`: 함수의 반환값으로, 표현식의 결과가 반환된다.
    

## 람다 표현식 예제

### 1. 기본 예제

람다 표현식을 사용하여 두 수의 합을 계산하는 함수를 정의한다.

```python
add = lambda x, y: x + y
print(add(3, 5))  # 출력: 8

```

이 예제에서 `lambda x, y: x + y`는 두 인자 `x`와 `y`를 받아 그 합을 반환하는 람다 함수이다.

### 2. 함수의 인자로 람다 표현식 사용

람다 표현식은 함수의 인자로 자주 사용된다. 예를 들어, 리스트의 정렬 기준을 정의할 때 사용할 수 있다.

```python
# 튜플 리스트를 두 번째 요소를 기준으로 정렬
points = [(1, 2), (3, 1), (5, 7), (2, 4)]
sorted_points = sorted(points, key=lambda x: x[1])
print(sorted_points)  # 출력: [(3, 1), (1, 2), (2, 4), (5, 7)]
```

이 예제에서 `lambda x: x[1]`은 리스트의 각 요소(튜플)의 두 번째 요소를 기준으로 정렬하기 위한 람다 함수이다.

```python
array = [('홍길동', 2), ('이순신', 1), ('아무개', 7)]

def my_key(x):  # 한번만 사용되기때문에 lambda사용하면 좋음 
    return x[1]

print(sorted(array, key = my_key)          # 출력: [('이순신', 1), ('홍길동', 2), ('아무개', 7)]
print(sorted(array, key = lambda x: x[1])  # 출력: [('이순신', 1), ('홍길동', 2), ('아무개', 7)]
```

### 3. 고차 함수와 람다 표현식

고차 함수는 다른 함수를 인자로 받거나 함수를 반환하는 함수이다. 람다 표현식은 고차 함수와 함께 자주 사용된다.

```python
# 리스트의 각 요소에 10을 더함
numbers = [1, 2, 3, 4, 5]
modified_numbers = list(map(lambda x: x + 10, numbers))
print(modified_numbers)  # 출력: [11, 12, 13, 14, 15]
```

이 예제에서 `map` 함수는 리스트의 각 요소에 10을 더하는 람다 함수를 적용하여 새로운 리스트를 반환한다.

### 4. 조건부 표현식

람다 표현식 내에서 조건부 표현식을 사용할 수 있다.

```python
# 숫자가 짝수인지 홀수인지 판별
is_even = lambda x: '짝수' if x % 2 == 0 else '홀수'
print(is_even(4))  # 출력: 짝수
print(is_even(7))  # 출력: 홀수
```

이 예제에서 `lambda x: '짝수' if x % 2 == 0 else '홀수'`는 숫자가 짝수인지 홀수인지를 판별하는 람다 함수이다.
# 5. 사전과 집합 자료형

## 5-1. 사전 자료형

파이썬의 딕셔너리(Dictionary)는 키(key)와 값(value)의 쌍을 데이터로 가지는 자료형이다. 딕셔너리의 주요 특징은 다음과 같다:

1. **키-값 쌍**: 딕셔너리는 각 키에 대응하는 값을 가지는 쌍으로 구성됩니다. 키는 고유하며, 같은 키를 중복해서 사용할 수 없다.
    - 리스트나 튜플이 값을 순차적으로 저장하는 것과 대비 된다.
    - 원하는 ‘변경 불가능한(Immutable) 자료형’을 키로 사용할 수 있다.
2. **빠른 접근 속도**: 딕셔너리는 **해시 테이블**을 사용하여 구현되므로, 키를 통해 값을 빠르게 조회할 수 있다.
3. **변경 가능**: 딕셔너리는 값을 추가, 수정, 삭제할 수 있는 가변 자료형
4. **다양한 자료형 지원**: 키로는 주로 불변형 자료형(예: 문자열, 숫자, 튜플)을 사용하며, 값으로는 어떤 자료형도 올 수 있다.
5. **순서 보장**: 파이썬 3.7부터 딕셔너리는 삽입 순서를 유지한다.
    - 파이썬 3.7 이전에는 딕셔너리가 삽입 순서를 유지하지 않았습니다. 딕셔너리는 내부적으로 해시 테이블을 사용하여 키-값 쌍을 저장하기 때문에, 삽입 순서와 관계없이 키를 해시 값에 따라 저장했습니다. 따라서 딕셔너리의 항목을 순회할 때, 삽입된 순서와 다르게 반환되었습니다. 하지만 파이썬 3.7부터는 딕셔너리가 삽입 순서를 유지하도록 변경되었습니다.
    **(그러나 인덱스로 조회하지는 못함)**
6. 키와 값을 별도로 뽑아내기 위한 메서드를 지원
    - 키 데이터만 뽑아서 리스트로 이용할 때는 `keys()`함수
    - 값 데이터만 뽑아서 리스트로 이용할 때는 `valuse()`함수

```python
# 딕셔너리 생성 및 사용 예시
student = {
    "name": "John",
    "age": 25,
    "courses": ["Math", "Science"]
}

# 값 조회
print(student["name"])  # John

# 값 추가
student["grade"] = "A"

# 값 수정
student["age"] = 26

# 값 삭제
del student["courses"]

# 키와 값만 출력
print(student.keys())  # dict_keys(['name', 'age', 'grade'])
print(list(student.keys())) # ['name', 'age', 'grade']
print(student.values())  # dict_values(['John', 26, 'A'])

# 키-값 쌍 출력
print(student.items())  # dict_items([('name', 'John'), ('age', 26), ('grade', 'A')])
```

## 5-2. 집합 자료형

- **집합 자료형(Set)**은 **중복을 허용하지 않고, 순서가 없는 자료형**이다.
- **초기화 방법**:
    - 리스트나 문자열을 이용하여 초기화할 수 있다.
    - `set()` 함수를 사용하거나 중괄호 `{}` 안에 원소를 콤마 `,`로 구분하여 삽입할 수 있다.
    
    ```python
    # 리스트를 이용한 초기화
    my_set = set([1, 2, 3, 4])
    print(my_set)  # {1, 2, 3, 4}
    
    # 중괄호를 이용한 초기화
    my_set = {1, 2, 3, 4}
    print(my_set)  # {1, 2, 3, 4}
    ```
    
- 중괄호(`{}` )안에 각 원소를 콤마(`,`)를 기준으로 구분하여 삽입함으로써 초기화 할 수 있음
- 데이터의 조회 및 수정에 있어서 O(1)의 시간에 처리할 수 있다. (빠름)
- 

## **5-3. 집합의 주요 연산**

- **합집합**: 두 집합의 모든 원소를 포함하는 집합 (`|` 연산자 또는 `union()` 메서드를 사용)
- **교집합**: 두 집합에 공통으로 포함된 원소들의 집합 (`&` 연산자 또는 `intersection()` 메서드를 사용)
- **차집합**: 첫 번째 집합에는 포함되지만 두 번째 집합에는 포함되지 않은 원소들의 집합 (`` 연산자 또는 `difference()` 메서드를 사용)
- **대칭차집합**: 두 집합 중 하나에만 포함된 원소들의 집합 (`^` 연산자 또는 `symmetric_difference()` 메서드를 사용)

```python
set1 = {1, 2, 3}
set2 = {3, 4, 5}

# 합집합
union_set = set1 | set2
print(union_set)  # {1, 2, 3, 4, 5}

# 교집합
intersection_set = set1 & set2
print(intersection_set)  # {3}

# 차집합
difference_set = set1 - set2
print(difference_set)  # {1, 2}

# 대칭차집합
symmetric_difference_set = set1 ^ set2
print(symmetric_difference_set)  # {1, 2, 4, 5}

```

## **5-4. 집합 메서드**

- **add(x)**: 원소 x를 추가한다.
- **remove(x)**: 원소 x를 제거한다. x가 집합에 없으면 오류가 발생한다.
- **discard(x)**: 원소 x를 제거한다. x가 집합에 없어도 오류가 발생하지 않는다.
- **clear()**: 집합의 모든 원소를 제거한다.

```python
my_set = {1, 2, 3}
my_set.add(4)
print(my_set)  # {1, 2, 3, 4}

my_set.remove(2)
print(my_set)  # {1, 3, 4}

my_set.discard(5)  # 집합에 5가 없지만 오류 발생하지 않음
print(my_set)  # {1, 3, 4}

my_set.clear()
print(my_set)  # set()

```

## 5-5. 사전 자료형과 집합 자료형의 특징

- 리스트나 튜플은 순서가 있기 때문에 인덱싱을 통해 자료형의 값을 얻을 수 있다.
- 사전 자료형과 집합 자료형은 순서가 없기때문에 인덱싱으로 값을 얻을 수 없다.
    - 사전의 key혹은 집합의 원소를 이용해 O(1)의 시간복잡도로 조회
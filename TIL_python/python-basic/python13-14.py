import random

class Tic_Tac_Toe:

    # 게임판 생성
    def __init__(self) :
        self.board = []

    # 게임판 초기화: 2차원 리스트 생성
    def create_board(self) :
        for i in range(3) :
            row = []
            for j in range(3) :
                row.append('*')
            self.board.append(row)

    # 첫 플레이어 선택
    # 무작위로 둘 중에 하나 선택(0: 컴퓨터 / 1: 사용자)
    def select_first_player(self) : 
        if random.randint(0, 1) == 0 : # randint(0, n): 0부터 n까지 랜덤정수
            return 'X'
        else :
            return 'O'
        
    # 기호 표시
    def mark_spot(self, row, col, player) : 
        self.board[row - 1][col - 1] = player # 

    # 승리 상태 확인
    # is~ 메서드: return boolean 
    def is_win(self, player) : 
        n = len(self.board) # board가 가리키는 리스트의 원소 개수 추출

        # 행 확인
        for i in range(n) :
            win = True
            for j in range(n) :
                if self.board[i][j] != player :# 다른게 나오면 승리X
                    win = False
                    break
            if win == True :
                return win
            
        # 열 확인 
        for i in range(n) :
            win = True
            for j in range(n) :
                if self.board[j][i] != player : # 다른게 나오면 승리X
                    win = False
                    break
            if win == True :
                return win

        # 오른쪽 대각선 확인: 중첩반복 필요 없음
        win = True
        for i in range(n) :
            if self.board[i][i] != player:
                win = False
                break
        if win == True:
            return win
        
        # 왼쪽 대각선 확인: 1,3 / 2,2 / 3,1
        win = True
        for i in range(n) :
            if self.board[i][n - i - 1] != player:
                win = False
                break
        if win == True:
            return win
        
        return False

    # 잔여 빈칸 여부 확인: 한칸씩 확인한 후 *가 있으면 false 리턴
    def is_board_full(self) :
        for row in self.board:
            for item in row:
                if item == '*':
                    return False
        return True

    # 플레이어 변경
    def next_player(self, player) :
        if player == 'O' :
            return 'X'
        else :
            return 'O'

        # 이렇게 간소화해서 작성가능 return 'X' if player == '0' else '0' 

    # 현재 게임판 상태 츌력
    def show_board(self) :
        for row in self.board:
            for item in row :
                print(item, end = " ") # 줄바꿈 X
            print()


    # 게임 시작
    def start(self) :

        # 새 게임판 생성
        self.create_board()
        self.show_board()

        # 첫 플레이어 선택
        player = self.select_first_player()

        # 게임 루프 시작
        while True :

            # 다음 플레이어 안내
            if player == 'X' :
                print("컴퓨터 차례입니다.")
            else :
                print("사용자 차례입니다.")
            
            # 현재 게임판 상태 출력
            self.show_board()

            # 사용자 입력 대기, 컴퓨터일 경우 랜덤 위치 반환
            

            if player == 'X' : # 컴퓨터이면
                while True : 
                    row, col = random.randint(1, 3), random.randint(1,3) # 이미 마킹된부분이라면 둘수 없게
                    if self.board[row - 1][col - 1] == '*' : 
                        break

                print("컴퓨터가 행 "+ str(row)+", 열 "+str(col)+"을 선택했습니다. ")
                print()
            else :
                # 한번에 입력받기: 예) 1 3
                # 두개의 값은 map으로 받고 list 변환 -> 각각 할당됨
                row, col = list(map(int, input("선택한 빈칸의 위치를 입력하세요: ").split())) 
                print("사용자가 행 "+ str(row)+", 열 "+str(col)+"을 선택했습니다. ")
                print()

            # row, col 입력값이 0, 0인 경우 게임 종료
            if row == 0 and col == 0 :
                break

            # 입력된 위치 표시
            self.mark_spot(row, col, player)
            self.show_board()

            # 현재 플레이어가 이겼는지 확인
            if self.is_win(player) == True :
                if player == 'X' :
                    print("컴퓨터가 이겼습니다. 다시 도전하세요. ")
                else :
                    print("사용자가 이겼습니다. 축하합니다. ")
                break

            # 게임판 가득참 확인, 빈칸여부
            if self.is_board_full() == True :
                print("무승부입니다. 다시 도전하세요. ")
                break

            # 플레이어 변경
            print(player+"플레이어")
            player = self.next_player(player)
            print(player+"플레이어2")
            

        # 최종 게임판 출력
        print()
        self.show_board()


# 게임 생성
TTT = Tic_Tac_Toe()
# 게임 시작
TTT.start()
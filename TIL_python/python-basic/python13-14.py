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
        
    # 기호 표시
    def mark_spot(self, row, col, player) : 

    # 승리 상태 확인
    # is~ 메서드: return boolean 
    def is_win(self, player) : 

       # 행 확인
       # 열 확인 
       # 대각선 확인

    # 잔여 빈칸 여부 확인
    def is_board_full(self) :

    # 플레이어 변경
    def next_player(self, player) :


    # 현재 게임판 상태 츌력
    def show_board(self) :

    # 게임 시작
    def start(self) :

        # 새 게임판 생성

        # 첫 플레이어 선택

        # 게임 루프 시작

            # 다음 플레이어 안내

            # 현재 게임판 상태 출력

            # 사용자 입력 대기, 컴퓨터일 경우 랜덤 위치 반환

            # row, col 입력값이 0, 0인 경우 게임 종료

            # 입력된 위치 표시

            # 현재 플레이어가 이겼는지 확인

            # 게임판 가득참 확인

            # 플레이어 변경

        # 최종 게임판 출력


# 게임 생성
TTT = Tic_Tac_Toe():
# 게임 시작
TTT.start() :
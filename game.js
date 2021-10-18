class State {
  constructor(pieces, enemyPieces, depth = 0) {
    // 방향 정수
    this.dxy = [
      [1, 0],
      [1, 1],
      [0, 1],
      [-1, 1],
      [-1, 0],
      [-1, -1],
      [0, -1],
      [1, -1],
    ];

    // 연속 패스에 따른 종료
    this.passEnd = false;

    // 돌의 배치
    this.pieces = pieces;
    this.enemyPieces = enemyPieces;
    this.depth = depth;

    // 돌의 초기 배치
    if (!pieces || !enemyPieces) {
      this.pieces = Array.from({ length: 64 }, () => 0);
      this.pieces[27] = this.pieces[36] = 1;
      this.enemyPieces = Array.from({ length: 64 }, () => 0);
      this.enemyPieces[28] = this.enemyPieces[35] = 1;
    }
  }

  // 돌의 수 얻기
  pieceCount(pieces) {
    return pieces.filter((v) => v === 1).length;
  }

  // 패배 여부 판정
  isLose() {
    return (
      this.isDone() &&
      this.pieceCount(this.pieces) < this.pieceCount(this.enemyPieces)
    );
  }

  // 무승부 여부 판정
  isDraw() {
    return (
      this.isDone() &&
      this.pieceCount(this.pieces) === this.pieceCount(this.enemyPieces)
    );
  }

  // 게임 종료 여부 판정
  isDone() {
    return (
      this.pieceCount(this.pieces) + this.pieceCount(this.enemyPieces) === 64 ||
      this.passEnd
    );
  }

  // 다음 상태 얻기
  next(action) {
    const state = new State(this.pieces, this.enemyPieces, this.depth + 1);
    if (action != 64) {
      state.isLegalActionXy(action % 8, Math.floor(action / 8), true);
      const w = state.pieces;
      state.pieces = state.enemyPieces;
      state.enemyPieces = w;
    }

    // 2회 연속 패스 판정
    if (action === 64 && state.legalActions()[0] === 64) {
      state.passEnd = true;
    }
    return state;
  }

  // 합법적인 수 리스트 얻기
  legalActions() {
    const actions = [];

    for (let j = 0; j < 8; j++) {
      for (let i = 0; i < 8; i++) {
        if (this.isLegalActionXy(i, j)) {
          actions.push(i + j * 8);
        }
      }
    }

    if (!actions) {
      actions.push(64); // 패스
    }

    return actions;
  }

  // 임의의 매스가 합법적인 수인지 판정
  isLegalActionXy(x, y, flip = false) {
    const that = this;
    // 임의의 매스에서 임의의 방향이 합법적인 수인지 판정
    function isLegalActionXyDxy(x, y, dx, dy) {
      // １번째 상대의 돌
      x = x + dx;
      y = y + dy;
      if (
        y < 0 ||
        7 < y ||
        x < 0 ||
        7 < x ||
        that.enemyPieces[x + y * 8] !== 1
      ) {
        return false;
      }

      // 2번째 이후
      for (let j = 0; j < 8; j++) {
        // 빈 칸
        if (
          y < 0 ||
          7 < y ||
          x < 0 ||
          7 < x ||
          (that.enemyPieces[x + y * 8] == 0 && that.pieces[x + y * 8] == 0)
        ) {
          return false;
        }

        // 자신의 돌
        if (that.pieces[x + y * 8] == 1) {
          // 반전
          if (flip) {
            for (let i = 0; i < 8; i++) {
              x = x - dx;
              y = y - dy;
              if (that.pieces[x + y * 8] == 1) {
                return true;
              }
              that.pieces[x + y * 8] = 1;
              that.enemyPieces[x + y * 8] = 0;
            }
          }
          return true;
        }
        // 상대의 돌
        x = x + dx;
        y = y + dy;
      }
      return false;
    }

    // 빈칸 없음
    if (this.enemyPieces[x + y * 8] === 1 || this.pieces[x + y * 8] === 1) {
      return false;
    }

    // 돌을 놓음
    if (flip) {
      this.pieces[x + y * 8] = 1;
    }

    // 임의의 위치의 합법적인 수 여부 확인
    let flag = false;
    for (const [dx, dy] of this.dxy) {
      if (isLegalActionXyDxy(x, y, dx, dy)) {
        flag = true;
      }
    }
    return flag;
  }

  // 선 수 여부 확인
  isFirstPlayer() {
    return this.depth % 2 === 0;
  }

  // 문자열 표시
  print() {
    const ox = this.isFirstPlayer() ? ["o", "x"] : ["x", "o"];
    let str = "";
    for (let i = 0; i < 64; i++) {
      if (this.pieces[i] === 1) {
        str += ox[0];
      } else if (this.enemyPieces[i] === 1) {
        str += ox[1];
      } else {
        str += "-";
      }
      if (i % 8 == 7) {
        str += "\n";
      }
    }
    return str;
  }
}

// 랜덤으로 행동 선택
function randomAction(state) {
  const legalActions = state.legalActions();
  return legalActions[getRandomIntInclusive(0, legalActions.length - 1)];
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //최댓값도 포함, 최솟값도 포함
}

// 동작 확인
function main() {
  // 상태 생성
  let state = new State();

  // 게임 종료 시까지 반복
  while (true) {
    // 게임 종료 시
    if (state.isDone()) break;

    // 다음 상태 얻기
    state = state.next(randomAction(state));

    // 문자열 출력
    console.log(state.print());
  }
}

main();

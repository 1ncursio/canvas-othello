import { CELL_COUNT } from "./config.js";

export default class State {
  constructor(blackPieces = undefined, whitePieces = undefined, depth = 0) {
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
    this.depth = depth;

    // 돌의 초기 배치
    if (blackPieces && whitePieces) {
      // 돌의 배치
      this.blackPieces = blackPieces;
      this.whitePieces = whitePieces;
    } else {
      this.blackPieces = Array.from({ length: CELL_COUNT ** 2 }, () => 0);
      this.blackPieces[27] = this.blackPieces[36] = 1;
      this.whitePieces = Array.from({ length: CELL_COUNT ** 2 }, () => 0);
      this.whitePieces[28] = this.whitePieces[35] = 1;
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
      this.pieceCount(this.blackPieces) < this.pieceCount(this.whitePieces)
    );
  }

  // 무승부 여부 판정
  isDraw() {
    return (
      this.isDone() &&
      this.pieceCount(this.blackPieces) === this.pieceCount(this.whitePieces)
    );
  }

  // 게임 종료 여부 판정
  isDone() {
    return (
      this.pieceCount(this.blackPieces) + this.pieceCount(this.whitePieces) ===
        CELL_COUNT ** 2 || this.passEnd
    );
  }

  // 다음 상태 얻기
  next(action) {
    const state = new State(this.blackPieces, this.whitePieces, this.depth + 1);
    if (action != CELL_COUNT ** 2) {
      state.isLegalActionXy(
        action % CELL_COUNT,
        parseInt(action / CELL_COUNT),
        true
      );
    } else {
      console.log("스킵");
    }

    [state.blackPieces, state.whitePieces] = [
      state.whitePieces,
      state.blackPieces,
    ];

    // 2회 연속 패스 판정
    if (
      action === CELL_COUNT ** 2 &&
      state.legalActions()[0] === CELL_COUNT ** 2
    ) {
      state.passEnd = true;
    }
    return state;
  }

  // 합법적인 수 리스트 얻기
  legalActions() {
    const actions = [];

    for (let j = 0; j < CELL_COUNT; j++) {
      for (let i = 0; i < CELL_COUNT; i++) {
        if (this.isLegalActionXy(i, j)) {
          actions.push(i + j * CELL_COUNT);
        }
      }
    }

    if (actions.length === 0) {
      actions.push(CELL_COUNT ** 2); // 패스
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
        that.whitePieces[x + y * CELL_COUNT] !== 1
      ) {
        return false;
      }

      // 2번째 이후
      for (let j = 0; j < CELL_COUNT; j++) {
        // 빈 칸
        if (
          y < 0 ||
          7 < y ||
          x < 0 ||
          7 < x ||
          (that.whitePieces[x + y * CELL_COUNT] == 0 &&
            that.blackPieces[x + y * CELL_COUNT] == 0)
        ) {
          return false;
        }

        // 자신의 돌
        if (that.blackPieces[x + y * CELL_COUNT] == 1) {
          // 반전
          if (flip) {
            for (let i = 0; i < CELL_COUNT; i++) {
              x = x - dx;
              y = y - dy;
              if (that.blackPieces[x + y * CELL_COUNT] == 1) {
                return true;
              }
              that.blackPieces[x + y * CELL_COUNT] = 1;
              that.whitePieces[x + y * CELL_COUNT] = 0;
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
    if (
      this.whitePieces[x + y * CELL_COUNT] === 1 ||
      this.blackPieces[x + y * CELL_COUNT] === 1
    ) {
      return false;
    }

    // 돌을 놓음
    if (flip) {
      this.blackPieces[x + y * CELL_COUNT] = 1;
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

// main();

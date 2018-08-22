var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.state = {
      board: null,
      score: 0,
      gameOver: false,
      message: null
    };
    return _this;
  }

  // Create board with two random coordinate numbers


  _createClass(App, [{
    key: 'initBoard',
    value: function initBoard() {
      var board = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
      // let board = [];
      // for (let i = 0; i < n; i++) {
      //   const row = [];
      //   for (let j = 0; j < n; j++) {
      //     row.push(0);
      //   }
      //   board.push(row);
      // }
      board = this.placeRandom(this.placeRandom(board));
      this.setState({ board: board, score: 0, gameOver: false, message: null });
    }

    // Get all blank coordinates from board

  }, {
    key: 'getBlankCoordinates',
    value: function getBlankCoordinates(board) {
      var blankCoordinates = [];

      for (var r = 0; r < board.length; r++) {
        for (var c = 0; c < board[r].length; c++) {
          if (board[r][c] === 0) {
            blankCoordinates.push([r, c]);
          }
        }
      }

      return blankCoordinates;
    }

    // Grab random start number

  }, {
    key: 'randomStartingNumber',
    value: function randomStartingNumber() {
      var startingNumbers = [2, 4];
      var randomNumber = startingNumbers[Math.floor(Math.random() * startingNumbers.length)];
      return randomNumber;
    }

    // Place random starting number on an empty coordinate

  }, {
    key: 'placeRandom',
    value: function placeRandom(board) {
      var blankCoordinates = this.getBlankCoordinates(board);
      var randomCoordinate = blankCoordinates[Math.floor(Math.random() * blankCoordinates.length)];
      var randomNumber = this.randomStartingNumber();
      board[randomCoordinate[0]][randomCoordinate[1]] = randomNumber;
      return board;
    }

    // Compares two boards to check for movement

  }, {
    key: 'boardMoved',
    value: function boardMoved(original, updated) {
      return JSON.stringify(updated) !== JSON.stringify(original) ? true : false;
    }

    // Moves board depending on direction and checks for game over

  }, {
    key: 'move',
    value: function move(direction) {
      if (!this.state.gameOver) {
        if (direction === 'up') {
          var movedUp = this.moveUp(this.state.board);
          if (this.boardMoved(this.state.board, movedUp.board)) {
            var upWithRandom = this.placeRandom(movedUp.board);

            if (this.checkForGameOver(upWithRandom)) {
              this.setState({ board: upWithRandom, gameOver: true, message: 'Game over!' });
            } else {
              this.setState({ board: upWithRandom, score: this.state.score += movedUp.score });
            }
          }
        } else if (direction === 'right') {
          var movedRight = this.moveRight(this.state.board);
          if (this.boardMoved(this.state.board, movedRight.board)) {
            var rightWithRandom = this.placeRandom(movedRight.board);

            if (this.checkForGameOver(rightWithRandom)) {
              this.setState({ board: rightWithRandom, gameOver: true, message: 'Game over!' });
            } else {
              this.setState({ board: rightWithRandom, score: this.state.score += movedRight.score });
            }
          }
        } else if (direction === 'down') {
          var movedDown = this.moveDown(this.state.board);
          if (this.boardMoved(this.state.board, movedDown.board)) {
            var downWithRandom = this.placeRandom(movedDown.board);

            if (this.checkForGameOver(downWithRandom)) {
              this.setState({ board: downWithRandom, gameOver: true, message: 'Game over!' });
            } else {
              this.setState({ board: downWithRandom, score: this.state.score += movedDown.score });
            }
          }
        } else if (direction === 'left') {
          var movedLeft = this.moveLeft(this.state.board);
          if (this.boardMoved(this.state.board, movedLeft.board)) {
            var leftWithRandom = this.placeRandom(movedLeft.board);

            if (this.checkForGameOver(leftWithRandom)) {
              this.setState({ board: leftWithRandom, gameOver: true, message: 'Game over!' });
            } else {
              this.setState({ board: leftWithRandom, score: this.state.score += movedLeft.score });
            }
          }
        }
      } else {
        this.setState({ message: 'Game over!' });
      }
    }
  }, {
    key: 'moveUp',
    value: function moveUp(inputBoard) {
      var rotatedRight = this.rotateRight(inputBoard);
      var board = [];
      var score = 0;

      // Shift all numbers to the right
      for (var r = 0; r < rotatedRight.length; r++) {
        var row = [];
        for (var c = 0; c < rotatedRight[r].length; c++) {
          var current = rotatedRight[r][c];
          current === 0 ? row.unshift(current) : row.push(current);
        }
        board.push(row);
      }

      // Combine numbers and shift to right
      for (var _r = 0; _r < board.length; _r++) {
        for (var _c = board[_r].length - 1; _c >= 0; _c--) {
          if (board[_r][_c] > 0 && board[_r][_c] === board[_r][_c - 1]) {
            board[_r][_c] = board[_r][_c] * 2;
            board[_r][_c - 1] = 0;
            score += board[_r][_c];
          } else if (board[_r][_c] === 0 && board[_r][_c - 1] > 0) {
            board[_r][_c] = board[_r][_c - 1];
            board[_r][_c - 1] = 0;
          }
        }
      }

      // Rotate board back upright
      board = this.rotateLeft(board);

      return { board: board, score: score };
    }
  }, {
    key: 'moveRight',
    value: function moveRight(inputBoard) {
      var board = [];
      var score = 0;

      // Shift all numbers to the right
      for (var r = 0; r < inputBoard.length; r++) {
        var row = [];
        for (var c = 0; c < inputBoard[r].length; c++) {
          var current = inputBoard[r][c];
          current === 0 ? row.unshift(current) : row.push(current);
        }
        board.push(row);
      }

      // Combine numbers and shift to right
      for (var _r2 = 0; _r2 < board.length; _r2++) {
        for (var _c2 = board[_r2].length - 1; _c2 >= 0; _c2--) {
          if (board[_r2][_c2] > 0 && board[_r2][_c2] === board[_r2][_c2 - 1]) {
            board[_r2][_c2] = board[_r2][_c2] * 2;
            board[_r2][_c2 - 1] = 0;
            score += board[_r2][_c2];
          } else if (board[_r2][_c2] === 0 && board[_r2][_c2 - 1] > 0) {
            board[_r2][_c2] = board[_r2][_c2 - 1];
            board[_r2][_c2 - 1] = 0;
          }
        }
      }

      return { board: board, score: score };
    }
  }, {
    key: 'moveDown',
    value: function moveDown(inputBoard) {
      var rotatedRight = this.rotateRight(inputBoard);
      var board = [];
      var score = 0;

      // Shift all numbers to the left
      for (var r = 0; r < rotatedRight.length; r++) {
        var row = [];
        for (var c = rotatedRight[r].length - 1; c >= 0; c--) {
          var current = rotatedRight[r][c];
          current === 0 ? row.push(current) : row.unshift(current);
        }
        board.push(row);
      }

      // Combine numbers and shift to left
      for (var _r3 = 0; _r3 < board.length; _r3++) {
        for (var _c3 = 0; _c3 < board.length; _c3++) {
          if (board[_r3][_c3] > 0 && board[_r3][_c3] === board[_r3][_c3 + 1]) {
            board[_r3][_c3] = board[_r3][_c3] * 2;
            board[_r3][_c3 + 1] = 0;
            score += board[_r3][_c3];
          } else if (board[_r3][_c3] === 0 && board[_r3][_c3 + 1] > 0) {
            board[_r3][_c3] = board[_r3][_c3 + 1];
            board[_r3][_c3 + 1] = 0;
          }
        }
      }

      // Rotate board back upright
      board = this.rotateLeft(board);

      return { board: board, score: score };
    }
  }, {
    key: 'moveLeft',
    value: function moveLeft(inputBoard) {
      var board = [];
      var score = 0;

      // Shift all numbers to the left
      for (var r = 0; r < inputBoard.length; r++) {
        var row = [];
        for (var c = inputBoard[r].length - 1; c >= 0; c--) {
          var current = inputBoard[r][c];
          current === 0 ? row.push(current) : row.unshift(current);
        }
        board.push(row);
      }

      // Combine numbers and shift to left
      for (var _r4 = 0; _r4 < board.length; _r4++) {
        for (var _c4 = 0; _c4 < board.length; _c4++) {
          if (board[_r4][_c4] > 0 && board[_r4][_c4] === board[_r4][_c4 + 1]) {
            board[_r4][_c4] = board[_r4][_c4] * 2;
            board[_r4][_c4 + 1] = 0;
            score += board[_r4][_c4];
          } else if (board[_r4][_c4] === 0 && board[_r4][_c4 + 1] > 0) {
            board[_r4][_c4] = board[_r4][_c4 + 1];
            board[_r4][_c4 + 1] = 0;
          }
        }
      }

      return { board: board, score: score };
    }
  }, {
    key: 'rotateRight',
    value: function rotateRight(matrix) {
      var result = [];

      for (var c = 0; c < matrix.length; c++) {
        var row = [];
        for (var r = matrix.length - 1; r >= 0; r--) {
          row.push(matrix[r][c]);
        }
        result.push(row);
      }

      return result;
    }
  }, {
    key: 'rotateLeft',
    value: function rotateLeft(matrix) {
      var result = [];

      for (var c = matrix.length - 1; c >= 0; c--) {
        var row = [];
        for (var r = matrix.length - 1; r >= 0; r--) {
          row.unshift(matrix[r][c]);
        }
        result.push(row);
      }

      return result;
    }

    // Check to see if there are any moves left

  }, {
    key: 'checkForGameOver',
    value: function checkForGameOver(board) {
      var moves = [this.boardMoved(board, this.moveUp(board).board), this.boardMoved(board, this.moveRight(board).board), this.boardMoved(board, this.moveDown(board).board), this.boardMoved(board, this.moveLeft(board).board)];

      return moves.includes(true) ? false : true;
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.initBoard();
      var body = document.querySelector('body');
      body.addEventListener('keydown', this.handleKeyDown.bind(this));
    }
  }, {
    key: 'handleKeyDown',
    value: function handleKeyDown(e) {
      var up = 38;
      var right = 39;
      var down = 40;
      var left = 37;
      var n = 78;

      if (e.keyCode === up) {
        this.move('up');
      } else if (e.keyCode === right) {
        this.move('right');
      } else if (e.keyCode === down) {
        this.move('down');
      } else if (e.keyCode === left) {
        this.move('left');
      } else if (e.keyCode === n) {
        this.initBoard();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return React.createElement(
        'div',
        null,
        React.createElement(
          'button',
          { onClick: function onClick() {
              _this2.initBoard();
            } },
          'New Game'
        ),
        React.createElement(
          'div',
          { className: 'score' },
          'Score: ',
          this.state.score
        ),
        React.createElement(
          'table',
          null,
          this.state.board.map(function (row, i) {
            return React.createElement(Row, { key: i, row: row });
          })
        ),
        React.createElement(
          'p',
          null,
          this.state.message
        )
      );
    }
  }]);

  return App;
}(React.Component);

;

var Row = function Row(_ref) {
  var row = _ref.row;

  return React.createElement(
    'tr',
    null,
    row.map(function (cell, i) {
      return React.createElement(Cell, { key: i, cellValue: cell });
    })
  );
};

var Cell = function Cell(_ref2) {
  var cellValue = _ref2.cellValue;

  var color = 'cell';
  var value = cellValue === 0 ? '' : cellValue;
  if (value) {
    color += ' color-' + value;
  }

  return React.createElement(
    'td',
    null,
    React.createElement(
      'div',
      { className: color },
      React.createElement(
        'div',
        { className: 'number' },
        value
      )
    )
  );
};

ReactDOM.render(React.createElement(App, null), document.getElementById('main'));
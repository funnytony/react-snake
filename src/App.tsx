import React, { Component } from "react";
import "./App.css";
import Snake from "./components/snake/Snake";
import Food from "./components/food/Food";

interface MainState {
  food: number[];
  direction: 'RIGHT' | 'LEFT' | 'UP' | 'DOWN';
  spead: number;
  snakeDots: number[][];

}

const getRandomCoordinates = (): number[] => {
  const min = 1;
  const max = 99;
  const x = Math.floor((Math.random() * (max - min + 1)) / 2) * 2;
  const y = Math.floor((Math.random() * (max - min + 1)) / 2) * 2;
  console.log([x, y]);
  return [x, y];
};

const defaultState: MainState = {
  food: getRandomCoordinates(),
  direction: 'RIGHT',
  spead: 200,
  snakeDots: [
    [0, 0],
    [2, 0],
  ],

}


class App extends Component {

  state: MainState = defaultState;

  componentDidMount() {
    //setInterval(this.moveSnake, this.state.spead);
    this.beginGame();
    document.onkeydown = this.onKeyDown;

  }

  componentDidUpdate() {
    this.checkCrossBorders();
    this.checkCollapsed();
    this.checkEat();
  }

  onKeyDown = (e: any): void => {
    const newState = { ...this.state };
    e = e || window.event;
    switch (e.keyCode) {
      case 38:
        newState.direction = 'UP';
        break;
      case 40:
        newState.direction = 'DOWN';
        break;
      case 37:
        newState.direction = 'LEFT';
        break;
      case 39:
        newState.direction = 'RIGHT';
        break;
      default:
        break;
    }
    this.setState(newState);
  };

  beginGame = (): void => {
    setTimeout(this.moveSnake, this.state.spead);
  }

  moveSnake = (): void => {
    const newState = { ...this.state };
    let dots = [...newState.snakeDots];
    let head = dots[dots.length - 1];
    switch (newState.direction) {
      case 'RIGHT':
        head = [head[0] + 2, head[1]];
        break;
      case 'LEFT':
        head = [head[0] - 2, head[1]];
        break;
      case 'UP':
        head = [head[0], head[1] - 2];
        break;
      case 'DOWN':
        head = [head[0], head[1] + 2];
        break;
      default:
        break;
    }
    dots.push(head);
    dots.shift();
    newState.snakeDots = dots;
    this.setState(newState);
    this.beginGame();
  }

  checkCrossBorders(): void {
    let snake = this.state.snakeDots;
    let head = snake[snake.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.onGameOver();
    }
  }

  checkCollapsed(): void {
    let snake: number[][] = [...this.state.snakeDots];
    let head: number[] = snake[snake.length - 1];
    snake.pop();
    snake.forEach((dot: number[]) => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        this.onGameOver();
      }
    })
  }

  checkEat() {
    const { snakeDots, food, spead } = this.state;
    const head = snakeDots[snakeDots.length - 1];
    if (head[0] === food[0] && head[1] === food[1]) {
      this.setState({ food: getRandomCoordinates(), spead: spead === 10 ? 10 : spead - 10 });
      this.snakeGrow();
    }

  }

  snakeGrow() {
    const newSnkae = [...this.state.snakeDots];
    newSnkae.unshift([]);
    this.setState({ snakeDots: newSnkae });

  }

  onGameOver = (): void => {
    alert(`Game Over! Length of the snake ${this.state.snakeDots.length}`);
    this.setState(defaultState);
  }

  render() {
    return (
      <div className="game-area">
        <Snake snakeDots={this.state.snakeDots}></Snake>
        <Food dots={this.state.food}></Food>
      </div>
    );

  }
}

export default App;

import Component from "@glimmer/component";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";

const OPS = ["+", "-", "*"]; //, "/"];

function between(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function makeProblem() {
  let first, second, op, solution;
  op = OPS[Math.floor(Math.random() * OPS.length)];
  if (op === "+") {
    first = between(10, 1000);
    second = between(10, 1000);
    solution = first + second;
  }
  if (op === "-") {
    first = between(10, 1000);
    second = between(10, 1000);
    [first, second] = [Math.max(first, second), Math.min(first, second)];
    solution = first - second;
  }
  if (op === "*") {
    first = between(10, 100);
    second = between(10, 100);
    solution = first * second;
  }

  return { first, second, op, solution };
}

export default class ProblemComponent extends Component {
  constructor() {
    super(...arguments);

    this.setProblem();
  }

  @tracked optionsMult = true;
  @tracked optionsAdd = true;
  @tracked optionsSubtract = true;
  @tracked first;
  @tracked second;
  @tracked op;
  @tracked solution;
  @tracked isRevealed;
  @tracked startTime;
  @tracked currentTime;

  get elapsed() {
    if (!this.startTime) {
      return 0;
    }
    let ms = this.currentTime - this.startTime;
    let s = ms / 1000;
    return s.toFixed(2);
  }

  setProblem() {
    this.isRevealed = false;
    this.startTime = new Date();
    this.currentTime = new Date();
    if (this.timerInterval) {
      window.clearInterval(this.timerInterval);
    }
    this.timerInterval = window.setInterval(() => {
      this.currentTime = new Date();
    }, 67);

    let { first, second, op, solution } = makeProblem();
    this.first = first;
    this.second = second;
    this.op = op;
    this.solution = solution;
  }

  @action reveal() {
    if (!this.isRevealed) {
      this.isRevealed = true;
      window.clearInterval(this.timerInterval);
    }
  }

  @action evaluate(correct) {
    this.setProblem();
  }

  @action toggleOption(optionName) {
    if (optionName === "mult") {
      this.optionsMult = !this.optionsMult;
    } else if (optionName === "add") {
      this.optionsAdd = !this.optionsAdd;
    } else if (optionName === "subtract") {
      this.optionsSubtract = !this.optionsSubtract;
    }
  }
}

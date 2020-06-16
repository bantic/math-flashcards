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

  setProblem() {
    this.isRevealed = false;

    let { first, second, op, solution } = makeProblem();
    this.first = first;
    this.second = second;
    this.op = op;
    this.solution = solution;
  }

  @tracked first;
  @tracked second;
  @tracked op;
  @tracked solution;
  @tracked isRevealed;

  @action reveal() {
    if (!this.isRevealed) {
      this.isRevealed = true;
    }
  }

  @action evaluate(correct) {
    console.log("correct:", correct);
    this.setProblem();
  }
}

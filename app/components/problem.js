import Component from "@glimmer/component";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";

export default class ProblemComponent extends Component {
  constructor() {
    super(...arguments);

    this.first = Math.floor(Math.random() * 1000);
    this.operator = "+";
    this.second = Math.floor(Math.random() * 1000);
    this.solution = this.first + this.second;
  }

  @tracked isRevealed = false;

  @action reveal() {
    if (!this.isRevealed) {
      this.isRevealed = true;
    }
  }

  @action evaluate(correct) {
    console.log("correct:", correct);
  }
}

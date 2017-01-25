export default class Histogram {
  constructor(size) {
    this.histogram = new Array(size).fill(0);
  }

  inc(index) {
    this.histogram[index] += 1;
  }

  get() {
    return this.histogram;
  }
}



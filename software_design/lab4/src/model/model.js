import sampleData from './sampleData.js';

class Model {
  constructor(view) {
    this.view = view;

    // localStorage.clear();
    
    this.data = JSON.parse(localStorage.getItem('data'));

    if (!this.data) {
      this.commit(() => (this.data = sampleData), false);
    }
  }

  updateData() {
    localStorage.setItem('data', JSON.stringify(this.data));
  }

  commit(callable, needRender = true) {
    callable();
    this.updateData();
    if (needRender) {
      this.render();
    }
  }
}

export default Model;

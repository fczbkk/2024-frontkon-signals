let RUNNING_TASK = null;

function runTask (task) {
  RUNNING_TASK = task;
  task.execute();
  RUNNING_TASK = null;
}

export class Signal {
  constructor (initialValue) {
    this._dependencies = new Set();
    this._value = initialValue;
  }

  get value () {
    if (RUNNING_TASK) {
      this._dependencies.add(RUNNING_TASK);
    }
    return this._value;
  }

  set value (newValue) {
    if (this._value === newValue) {
      return;
    }
    this._value = newValue;
    this.notify();
  }

  notify () {
    for (let dependency of this._dependencies) {
      dependency.update();
    }
  }
}

export class Computed {
  constructor (fn) {
    this._compute = fn;
    this._isStale = true;
    runTask(this);
  }

  get value () {
    if (this._isStale) {
      this._value = this._compute();
      this._isStale = false;
    }
    return this._value;
  }

  execute () {
    this._compute()
  }

  update () {
    this._isStale = true
  }
}

export class Effect {
  constructor (fn) {
    this._fn = fn;
    runTask(this);
  }

  execute () {
    this._fn();
  }

  update () {
    this.execute()
  }
}
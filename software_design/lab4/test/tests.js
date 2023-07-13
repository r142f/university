import chai from 'chai';

import Model from '../src/model/model.js';
import Controller from '../src/controller/controller.js';

describe('lab4', function (model, controller) {
  beforeEach(() => {
    global.localStorage = {
      data: JSON.stringify({
        name: 'to-do lists',
        lists: [],
      }),

      getItem(key) {
        return this[key] || null;
      },

      setItem(key, value) {
        this[key] = value;
      },
    };

    model = new Model();

    const _commit = model.commit.bind(model);
    model.commit = callable => _commit(callable, false);

    controller = new Controller(model);
  });

  it('can add to-do list', function () {
    const initLength = model.data.lists.length;
    controller.pushList('new list');
    chai.assert.equal(initLength + 1, model.data.lists.length);
  });

  it('can remove to-do list', function () {
    const initLength = model.data.lists.length;
    controller.pushList('new list');
    chai.assert.equal(initLength + 1, model.data.lists.length);

    controller.deleteList(model.data.lists.length - 1);
    chai.assert.equal(initLength, model.data.lists.length);
  });

  it('can add item to to-do list', function () {
    const initLength = model.data.lists.length;
    controller.pushList('new list');
    chai.assert.equal(initLength + 1, model.data.lists.length);

    const initNumberOfItems =
      model.data.lists[model.data.lists.length - 1].items.length;
    controller.pushItem(model.data.lists.length - 1, 'new item');
    chai.assert.equal(
      initNumberOfItems + 1,
      model.data.lists[model.data.lists.length - 1].items.length
    );
  });

  it('can complete items in to-do list', function () {
    const initLength = model.data.lists.length;
    controller.pushList('new list');
    chai.assert.equal(initLength + 1, model.data.lists.length);

    const initNumberOfItems =
      model.data.lists[model.data.lists.length - 1].items.length;
    controller.pushItem(model.data.lists.length - 1, 'new item');
    chai.assert.equal(
      initNumberOfItems + 1,
      model.data.lists[model.data.lists.length - 1].items.length
    );

    controller.completeItem(initLength, initNumberOfItems);
    chai.assert.equal(
      model.data.lists[model.data.lists.length - 1].items[
        model.data.lists[model.data.lists.length - 1].items.length - 1
      ].completed,
      true
    );
  });
});

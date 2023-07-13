class Controller {
  constructor(model) {
    this.model = model;
  }

  pushList(listName) {
    if (!listName) return;

    this.model.commit(() =>
      this.model.data.lists.push({ name: listName, items: [] })
    );
  }

  deleteList(listId) {
    this.model.commit(() => this.model.data.lists.splice(listId, 1));
  }

  pushItem(listId, itemName) {
    if (!itemName) return;

    this.model.commit(() =>
      this.model.data.lists[listId].items.push({
        name: itemName,
        completed: false,
      })
    );
  }

  deleteItem(listId, itemId) {
    this.model.commit(() =>
      this.model.data.lists[listId].items.splice(itemId, 1)
    );
  }

  completeItem(listId, itemId) {
    this.model.commit(
      () => (this.model.data.lists[listId].items[itemId].completed = true)
    );
  }
}

export default Controller;

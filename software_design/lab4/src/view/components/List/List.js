import AddButton from '../AddButton/AddButton.js';
import DeleteButton from '../DeleteButton/DeleteButton.js';
import Item from '../Item/Item.js';

function List({ listId, name, items, controller }) {
  const listItems = items.map(({ name, completed }, itemId) => {
    return (
      <Item
        key={`list-${listId}__item-${itemId}`}
        content={name}
        completed={completed}
        listId={listId}
        itemId={itemId}
        controller={controller}
      />
    );
  });

  const onClickAddButton = () => {
    const listItem = document.querySelectorAll('input')[listId + 1].value;
    controller.pushItem(listId, listItem);
  };

  const onClickDeleteButton = () => controller.deleteList(listId);

  return (
    <details className="container">
      <summary>
        <span className="h3">
          <span className="pe-3">{name} </span>
            <AddButton onClick={onClickAddButton} />
            <DeleteButton
              className={'ms-3 align-text-bottom'}
              onClick={onClickDeleteButton}
            />
        </span>
      </summary>
      <ul className="list-group mt-2">{listItems}</ul>
    </details>
  );
}

export default List;

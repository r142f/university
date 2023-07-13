import List from '../List/List.js';
import Item from '../Item/Item.js';
import AddButton from '../AddButton/AddButton.js';

function App({ model: { data }, controller }) {
  const id = 'rootList';
  const lists = data.lists.map(({ name, items }, listId) => {
    const list = (
      <List listId={listId} name={name} items={items} controller={controller} />
    );

    return <Item key={`list-${listId}`} content={list} />;
  });

  const onClick = () => {
    const listName = document.querySelector('input').value;
    controller.pushList(listName);
  };

  return (
    <div className="mt-5 container">
      <h2>
        <span className="d-flex">
          <span className="me-4">{data.name}</span>
          <AddButton placeholder="List name" onClick={onClick} />
        </span>
      </h2>
      <ul id={id} className="list-group list-group-flush">
        {lists}
      </ul>
    </div>
  );
}

export default App;

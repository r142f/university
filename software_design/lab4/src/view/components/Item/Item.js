import CompleteButton from '../CompleteButton/CompleteButton.js';
import DeleteButton from '../DeleteButton/DeleteButton.js';

function Item({ content, className, completed, listId, itemId, controller }) {
  className ||= '';

  const onClickDeleteButton = () => controller.deleteItem(listId, itemId);
  const onClickPrepareButton = () => controller.completeItem(listId, itemId);

  switch (completed) {
    case true:
      return (
        <li className={`list-group-item ${className} list-group-item-success`}>
          <del>{content}</del>
          <DeleteButton onClick={onClickDeleteButton} />
        </li>
      );
    case false:
      return (
        <li className={`list-group-item list-group-item-primary ${className}`}>
          {content}
          <DeleteButton onClick={onClickDeleteButton} />
          <CompleteButton onClick={onClickPrepareButton} />
        </li>
      );

    default:
      return <li className={`list-group-item ${className}`}>{content}</li>;
  }
}

export default Item;

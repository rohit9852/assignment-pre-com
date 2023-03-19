const UserCard = ({
  user,
  index,
  query,
  handleMouseOver,
  selected,
  valueRef
}) => {
  let p = user.items.map((item) => {
    return item.includes(query) ? `${query}'s found in items` : "";
  });

  return (
    <div
      ref={(element) => {
        valueRef[index] = element;
      }}
      className={selected === index ? "backGround" : "card"}
      onMouseOver={() => handleMouseOver(index)}
    >
      <h2 dangerouslySetInnerHTML={{ __html: user.name }}></h2>
      <p dangerouslySetInnerHTML={{ __html: user.id }}></p>
      <p dangerouslySetInnerHTML={{ __html: user.address }}></p>
      <p dangerouslySetInnerHTML={{ __html: user.pincode }}></p>
      {query && (
        <ul>
          {" "}
          <li>{p}</li>
        </ul>
      )}
    </div>
  );
};

export default UserCard;

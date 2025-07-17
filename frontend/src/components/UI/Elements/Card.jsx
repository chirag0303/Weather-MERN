
const Card = props => {
  return (
    <div className="h-auto w-3/5 relative mx-16 my-2 p-1 rounded-md overflow-hidden" >
      { props.children }
    </div>
  );
};

export default Card;
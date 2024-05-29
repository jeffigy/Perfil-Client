const Card = () => {
  return (
    <div className="card w-full bg-primary text-primary-content transition-all hover:scale-[1.02]">
      <div className="card-body">
        <h2 className="card-title">Card title</h2>
        <p>If a dog chews shoes whose shows doe he choose?</p>
        <div className="card-actions justify-end">
          <button className="btn">Button</button>
        </div>
      </div>
    </div>
  );
};

export default Card;

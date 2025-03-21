
export default function SandITime({time}) {
  const {suhoor,maghrib}=time;
  return (
    <div className="suhoorIfterDisplay">
      <div className="suhoorIfterContainer">
        <div className="Suhoor">
          {" "}
          Suhoor :<div className="suhoorTime">
            {suhoor}
          </div>
        </div>
        <div className="ifter">
          {" "}
          Ifter :<div className="ifterTime">
            {maghrib}
          </div>
        </div>
      </div>
    </div>
  );
}

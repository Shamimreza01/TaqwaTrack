
export default function SandITime({time}) {
  const {first_light,sunset}=time;
  return (
    <div className="suhoorIfterDisplay">
      <div className="suhoorIfterContainer">
        <div className="Suhoor">
          {" "}
          Suhoor :<div className="suhoorTime">
            {first_light}
          </div>
        </div>
        <div className="ifter">
          {" "}
          Ifter :<div className="ifterTime">
            {sunset}
          </div>
        </div>
      </div>
    </div>
  );
}

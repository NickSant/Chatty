import { Circle } from "better-react-spinkit";

const Loading = () => {
  return (
    <div style={{ display: "grid", placeItems: "center", height: '50vh'}}>
      <div style={{display: 'grid', placeItems: 'center', alignItems: "center"}}>
        <h1 style={{fontSize: '3rem', color: '#123151' }}>Chatty</h1>
        <Circle color="#123151" size={60}/>
      </div>
    </div>
  );
};

export default Loading;

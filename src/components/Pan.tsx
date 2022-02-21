import {
  Ref,
  useImperativeHandle,
  useState,
  useEffect,
  forwardRef,
  useRef,
} from "react";
import { Button, Stack } from "@chakra-ui/react";
function Pan(props: { foods: string[]; [otherProps: string]: any }) {
  let timer: NodeJS.Timeout | null = null;
  let stopAnima: NodeJS.Timeout | null = null;

  const foodList: string[] = props.foods;
  let foodDom = null;

  const [foodname, setFoodname] = useState("");
  function getrgba() {
    return `rgba(${Math.random() * 255},${Math.random() * 255},${
      Math.random() * 255
    },1)`;
  }

  const [rotate, setRotate] = useState(0);
  const [coc, setCoc] = useState(1);
  function handleAnima() {
    setRotate((rotate) => rotate + coc);
    stopAnima = setTimeout(() => {
      handleAnima();
    });
  }

  const [timeout, setT] = useState(5000);
  function start(): void {
    if (timer) {
      clearTimeout(timer);
      // 重置
      if (stopAnima) clearTimeout(stopAnima);
      handleAnima();
    } else {
      handleAnima();
    }
    timer = setTimeout(() => {
      stop();
    }, timeout);
  }
  useEffect(() => {
    const len = foodList.length;
    let a = 360 - (rotate % 360);
    let jiao = a > 90 ? a - 90 - 180 / len : 270 + a - 180 / len;
    let index = Math.ceil(jiao / (360 / len));

    index = index === 8 ? 0 : index;
    let res = foodList[index]
      ? foodList[index]
      : foodList[0]
      ? foodList[0]
      : "吃屁";
    setFoodname(res);
    console.log(res, index, foodList[index]);
    // console.log(rotate%360,((360-a)/360)*foodList.length);
  }, [rotate]);
  function stop(): void {
    if (stopAnima) clearTimeout(stopAnima);
    if (timer) clearTimeout(timer);
  }
  function GetPan() {
    const jd = foodList.length ? (360 / foodList.length) * 0.5 : 360;
    const boderPx = jd >= 90 ? 100 : Math.tan((jd * Math.PI) / 180) * 100;
    const coc = Math.ceil(Math.random() * 5);

    console.log(jd);
    
    foodDom = foodList.map((e, index) => {
      const transformDeg = index * jd * 2;
      const color = getrgba();

      return (
        <div
          className="item"
          style={{
            borderTop:
              jd >= 90
                ? `${boderPx}px solid ${color}`
                : `${boderPx}px solid transparent`,

            borderLeft:
              jd === 180 ? `100px solid ${color}` : `0 solid transparent`,
            borderRight: `100px solid ${color}`,
            borderBottom:
              jd >= 90
                ? `${boderPx}px solid ${color}`
                : `${boderPx}px solid transparent`,
            transformOrigin: "-50% 0%",
            transform: `rotate(${transformDeg}deg) translate(-50%, -50%)`,
          }}
          key={index}
        >
          <div className="item-text"> {e}</div>
        </div>
      );
    });
    return (
      <div
        className="ctx"
        style={{
          transformOrigin: "center",
          transform: `rotate(${rotate}deg) translate(-50%, -50%)`,
        }}
      >
        {foodDom}
      </div>
    );
  }

  const [t1, setT1] = useState(0);
  function onMouseDown() {
    setT1(Date.now());
  }
  function onMouseUp() {
    let res = Date.now() - t1;
    if (res > 5000) {
      setCoc(res / 5000 + 3);
      setT(res);
    } else {
      setCoc((Math.random() + 1) * 2);
    }
  }
  return (
    <div>
      <div className="pan">
        <div className="zhen">
          <div className="zhentou1"></div>
          <div className="zhentou2"></div>
        </div>
        <GetPan />
      </div>
      <Button onClick={start} onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
        点击
      </Button>

      <div className="food-name">{foodname}</div>
    </div>
  );
}

export default Pan;

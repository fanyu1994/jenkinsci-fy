import "./App.css";
import Pan from "./components/Pan";
import Food from "./components/food";
import {
  createRef,
  forwardRef,
  MutableRefObject,
  useRef,
  useState,
} from "react";
import { useToast, Stack } from "@chakra-ui/react";

function App() {
  // let arr: { [p: string]: any } = [
  //   { id: 3, name: "部门3", pid: 1 },
  //   { id: 1, name: "部门1", pid: 0 },
  //   { id: 5, name: "部门5", pid: 4 },
  //   { id: 2, name: "部门2", pid: 1 },
  //   { id: 4, name: "部门4", pid: 3 },
  // ];
  // toTree(arr);
  // function toTree(arr: { [p: string]: any }) {
  //   let map = new Map();
  //   const res: unknown[] = [];
  //   arr.forEach((e: { id: number; [p: string]: any }) =>
  //     map.set(e.id, { ...e, children: [] })
  //   );
  //   arr.forEach((e: { pid: number; id: number }) => {
  //     if (!e.pid) res.push(map.get(e.id));
  //     else {
  //       map.get(e.pid).children.push(map.get(e.id));
  //     }
  //   });
  //   console.log(res);
  //   return res;
  // }
  const toast = useToast();
  const [Foods, useFoods] = useState([
    "KFC",
    "沙县小吃",
    "兰州拉面",
    "饺子",
    "大肠",
    "包",
    "小肠",
    "牛粪",
  ]);
  const [FoodsCopy, useFoodsCopy] = useState([...Foods]);

  const changeFood = (p: any, e: any): void => {
    if (e.target.checked && !FoodsCopy.includes(p)) {
      useFoodsCopy([...FoodsCopy, p]);
    }
    if (!e.target.checked && FoodsCopy.includes(p)) {
      FoodsCopy.splice(
        FoodsCopy.findIndex((e) => e === p),
        1
      );
      useFoodsCopy([...FoodsCopy]);
    }
  };
  const handleAddFood = (p: string) => {
    if (Foods.includes(p)) {
      ToastExample(p);
      return;
    }
    useFoodsCopy([...FoodsCopy, p]);
    useFoods([...Foods, p]);
  };

  function ToastExample(p: string) {
    toast({
      position: 'top',
      title: "信息",
      description: `${p}已存在,不要重复添加!`,
      status: "error",
      duration: 2000,
      isClosable: true,
    })
  }
  return (
    <Stack className="App">
      <Food
        foods={Foods}
        changeFood={changeFood}
        handleAddFood={handleAddFood}
      />
      <Pan foods={FoodsCopy} />
    </Stack>
  );
}

export default App;

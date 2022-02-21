import {
  Checkbox,
  Stack,
  Input,
  Flex,
  Button,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import {
  ReactChild,
  ReactFragment,
  ReactPortal,
  SetStateAction,
  useState,
} from "react";
function Food(props: {
  foods: any;
  changeFood: (
    p: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined,
    e: any
  ) => void;
  handleAddFood: (p: string) => void;
}) {
  const foods = props.foods;
  const handleChange = (
    p: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined,
    e: any
  ) => {
    props.changeFood(p, e);
  };

  const [value, setValue] = useState("");
  const handleInpChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setValue(e.target.value);
  };

  const handleAdd = () => {
    if (value === "") return;
    props.handleAddFood(value);
    setValue("")
  };
  return (
    <Flex>
      <Stack  margin={15}>
        <InputGroup>
          <Input
            placeholder="Basic usage"
            value={value}
            onChange={handleInpChange}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleAdd}>
              ADD
            </Button>
          </InputRightElement>
        </InputGroup>
      </Stack>
      <Stack margin={15} spacing={[1, 5]} direction={["column", "row"]}>
        {foods.map(
          (
            item:
              | boolean
              | ReactChild
              | ReactFragment
              | ReactPortal
              | null
              | undefined,
            index: any
          ) => {
            return (
              <Checkbox
                key={index + item}
                size="lg"
                colorScheme="orange"
                defaultIsChecked
                onChange={(e) => handleChange(item, e)}
              >
                {item}
              </Checkbox>
            );
          }
        )}
      </Stack>
    </Flex>
  );
}

export default Food;

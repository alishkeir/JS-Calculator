import React, { useState } from "react";
import { Container, Current, Previous, Screen, Button } from "../styled";
const Calculator = () => {
  const [current, setCurrent] = useState("");
  const [previous, setPrevious] = useState("");
  const [operation, setOperation] = useState("");

  const appendValue = (e) => {
    if ((e === "." && current.includes(".")) || (e === "." && current === "")) {
      return;
    }
    setCurrent(current + e);
  };

  const removeValue = () => {
    if (current !== "" && current !== undefined && current !== null) {
      setCurrent(current.slice(0, -1));
    }
  };

  const clearValue = () => {
    setCurrent("");
    setPrevious("");
    setOperation("");
  };

  const chooseOperation = (e) => {
    if (current === "") {
      return;
    }
    if (previous !== "") {
      let value = compute();
      setPrevious(value);
    } else {
      setPrevious(current);
    }

    setCurrent("");
    setOperation(e);
  };

  const compute = () => {
    // eslint-disable-next-line
    let result;
    let previousNum = parseFloat(previous);
    let currentNum = parseFloat(current);

    if (isNaN(previousNum) || isNaN(currentNum)) {
      return;
    }

    switch (operation) {
      case "÷":
        result = previousNum / currentNum;
        break;

      case "×":
        result = previousNum * currentNum;
        break;

      case "+":
        result = previousNum + currentNum;
        break;

      case "-":
        result = previousNum - currentNum;
        break;

      default:
        break;
    }

    return result;
  };

  const equals = () => {
    let value = compute();
    if (value === undefined || value === null) {
      return;
    }
    setCurrent(value);
    setPrevious("");
    setOperation("");
  };

  return (
    <Container>
      <Screen>
        <Previous>
          {previous} {operation}
        </Previous>
        <Current>{current}</Current>
      </Screen>
      <Button control gridSpan={2} onClick={() => clearValue()}>
        AC
      </Button>
      <Button control onClick={() => removeValue()}>
        DEL
      </Button>
      <Button onClick={() => chooseOperation("÷")} operation>
        ÷
      </Button>
      <Button onClick={() => appendValue("7")}>7</Button>
      <Button onClick={() => appendValue("8")}>8</Button>
      <Button onClick={() => appendValue("9")}>9</Button>
      <Button onClick={() => chooseOperation("×")} operation>
        ×
      </Button>
      <Button onClick={() => appendValue("4")}>4</Button>
      <Button onClick={() => appendValue("5")}>5</Button>
      <Button onClick={() => appendValue("6")}>6</Button>
      <Button onClick={() => chooseOperation("+")} operation>
        +
      </Button>
      <Button onClick={() => appendValue("1")}>1</Button>
      <Button onClick={() => appendValue("2")}>2</Button>
      <Button onClick={() => appendValue("3")}>3</Button>
      <Button onClick={() => chooseOperation("-")} operation>
        -
      </Button>
      <Button control onClick={() => appendValue(".")}>
        .
      </Button>
      <Button onClick={() => appendValue("0")}>0</Button>
      <Button onClick={() => equals()} gridSpan={2} operation>
        =
      </Button>
    </Container>
  );
};

export default Calculator;

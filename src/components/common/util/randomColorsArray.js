export const randomColor = () => {
  //pick a "red" from 0 -255
  let r = Math.floor(Math.random() * 256);
  //pick a "green" from 0 -255
  let g = Math.floor(Math.random() * 256);
  //pick a "blue" from 0 -255
  let b = Math.floor(Math.random() * 256);
  return "rgba(" + r + ", " + g + ", " + b + "," + 1 + ")";
};

export const createRandomColors = (sizeArray) => {
  let colorsArray = [];
  for (let item = 0; item < sizeArray.length; item++) {
    let color = randomColor();
    colorsArray[item] = color;
  }
  return colorsArray;
};

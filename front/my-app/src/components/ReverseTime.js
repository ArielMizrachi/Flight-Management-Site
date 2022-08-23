const ReverseTime = (date) => {

let array = date.split("-");
array[0] = array[0].slice(2)

let newDate = `${array[2]}/${array[1]}/${array[0]}`;
  return (newDate)
}

export default ReverseTime
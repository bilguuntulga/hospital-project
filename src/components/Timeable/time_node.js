import { useTimeableHook } from "."

export default function TimeNode({
  item,
  time,
  day
}){
  const hoovalies = useTimeableHook();

  return (<div onClick={(e) => {
    e.stopPropagation();

    hoovalies.click && hoovalies.click(item);
  }}>
    {
      hoovalies?.render(item)
    }
    {/* {
      item?.start_date
    } */}
  </div>)
}
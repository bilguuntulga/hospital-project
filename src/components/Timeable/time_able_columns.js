import { useTimeableHook } from "."
import TimeNode from "./time_node";

export default function TimeableColumns() {

  const timeValues = useTimeableHook();

  let start_time = timeValues.workingTime.start.split(":");
  let end_time = timeValues.workingTime.end.split(":");

  let start_minute = parseInt(start_time[1]);
  let end_minute = parseInt(end_time[1]);

   start_time = parseInt(start_time[0]);
   end_time = parseInt(end_time[0]);

  return (
    // div flex row
    <tbody>
        {
          (() => {
            const tds = [];
            for(let i = start_time; i < end_time; i++) {
              tds.push(
                <tr>
                  <Columns time={i} key={`${start_time}$${i}`} minute={i === start_time? start_minute : i === end_time ? end_minute : null}/>
                </tr>
              )
            }
            return (
              tds
            )
          })()
        }
    </tbody>
  )
}

const Columns = ({
  time,
  minute
}) => {

  const timeValues = useTimeableHook();


  const renderTimeNode = () => {
    
      const getDayofWeek = (date) => {
        const newDate = new Date(date);
        let week = newDate.getDay()

        if(week ===0) {
          week = 6;
        } else {
          week = week - 1;
        }

        return week;
      }

      const hashMaps = [
        [],[],[],[],[],[],[],
      ];
      const dates = [
        null,null,null,null,null,null,null,
      ];

      timeValues.items.forEach((e) => {
        if(e?.start_date && e?.end_date) {
          const date = new Date(timeValues.start_date);
          let item_start_date = new Date(e.start_date);
          let item_end_date = new Date(e.end_date);

          let check_start_date = new Date(e.start_date);
          check_start_date.setHours(time);
          if(minute && typeof minute === "number") {
            check_start_date.setMinutes(minute);
          }

          if(item_start_date <= check_start_date && check_start_date <= item_end_date && time === item_start_date.getHours() )  {
            date.setDate((new Date(e.start_date)).getDate());
            date.setHours(time,minute);
            dates[getDayofWeek(e.start_date)] = date;
            hashMaps[getDayofWeek(e.start_date)].push({...e});
            
          }
        }
      });
      console.log(dates);
      return (
        hashMaps.reduce((pre,curr,index) => {
          return [
            ...pre,
            <td className={curr.length > 0 ? "" : "td-hover"} style={{cursor:"pointer"}} onClick={e => {
              let date = new Date(timeValues.start_date);
              date.setDate(date.getDate() + index);
              date.setHours(time,minute,0,0);
              timeValues.nodeClick(date);
            }}>
              {
                curr.map(e => <TimeNode key={`${index}%${e?.id}`} time={time} minute={minute} item={e}/>)
              }
            </td>
          ]
        },[])
      )
  }

  return (
    [
      <td className="time-td">{`${time}:${minute ? minute : "00"}`}</td>,
      ...renderTimeNode()
    ]
  )
}
import { useTimeableHook } from "."
import * as moment from "moment";
export default function TimeableHeader() {

  const timeValues = useTimeableHook();
  const date = new Date(timeValues.start_date);
  return (
    <thead >
      <tr>
        <td className="time-td">
          Цаг
        </td>
        <td>
        Даваа гараг ({`${date.getMonth()}/${date.getDate()}`})
        </td>
        <td>
        Мягмар гараг ({`${date.getMonth()}/${date.getDate() + 1}`})
        </td>
        <td>
        Лхагва гараг ({`${date.getMonth()}/${date.getDate() + 2}`})
        </td>
        <td>
        Пүрэв гараг ({`${date.getMonth()}/${date.getDate() + 3}`})
        </td>
        <td>
        Баасан гараг ({`${date.getMonth()}/${date.getDate() + 4}`})
        </td>
        <td>
        Бямба гараг ({`${date.getMonth()}/${date.getDate() + 5}`})
        </td>
        <td>
        Ням гараг	({`${date.getMonth()}/${date.getDate() + 6}`})
        </td>
      </tr>
    </thead>
  )
}
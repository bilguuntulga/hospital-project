import { Skeleton } from "antd";
import React from "react";
import TimeableColumns from "./time_able_columns";
import TimeableHeader from "./time_able_header";
import "./_timeable.scss"
export  default function Timeable({
  items:items,
  viewType,
  render=(val) => <div>time render</div>,
  workingTime={start:"08:00",end:"18:00"},
  click=(item) => {},
  loading=false,
  nodeClick=(e=new Date()) => {},
  start_date= new Date()
}){


  return (
    <TimeableContext.Provider value={{
      items,
      workingTime,
      render,
      click,
      nodeClick,
      start_date
    }}>
    <div className="time-able">
      {loading ? <Skeleton active/> :<table >
        <TimeableHeader/>
        <TimeableColumns/>
      </table>}
      {/* content times */}

    </div>
    </TimeableContext.Provider>
  )
}

export const useTimeableHook = () => {
  return React.useContext(TimeableContext);
}

const TimeableContext = React.createContext({
  workingTime:{start:"08:00",end:"18:00"},
  items:[],
  click:(item) => {},
  nodeClick:(e=new Date()) => {},
  start_date: new Date()
});
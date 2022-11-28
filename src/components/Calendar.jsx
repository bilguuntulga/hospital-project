import React, { Component } from 'react';
import { DayPilot, DayPilotCalendar, DayPilotNavigator } from "@daypilot/daypilot-lite-react";
import { treatmentTimesAPI } from '../apis';

const styles = {
  wrap: {
    display: "flex"
  },
  left: {
    marginRight: "10px"
  },
  main: {
    flexGrow: "1"
  }
};

class Event {
  constructor(id, start, end, text, backColor = "#6aa84f") {
    this.id = id;
    this.start = start;
    this.end = end;
    this.text = text;
    this.backColor = backColor;

  }
}

class Calendar extends Component {

  constructor(props) {
    super(props);
    this.calendarRef = React.createRef();
    this.state = {
      viewType: "Week",
      durationBarVisible: false,
      timeRangeSelectedHandling: "Enabled",
      timeFormat: "en-us",
      onTimeRangeSelected: async args => {
        console.log(args);
        const dp = this.calendar;
        const modal = await DayPilot.Modal.prompt("New", "");
        dp.clearSelection();
        if (!modal.result) { return; }
        dp.events.add({
          start: args.start,
          end: args.end,
          id: DayPilot.guid(),
          text: modal.result
        });
      },
      eventDeleteHandling: "Update",
      onEventClick: async args => {
        const dp = this.calendar;
        const modal = await DayPilot.Modal.prompt("Update event text:", args.e.text());
        if (!modal.result) { return; }
        const e = args.e;
        e.data.text = modal.result;
        dp.events.update(e);
      },
      onEventDelete: (args) => {
        console.log("Delete this event: ", args?.e?.data?.id);
      },
      onEventResize: (args) => {
        console.log("onEventResize", args);
      }
    };
  }

  get calendar() {
    return this.calendarRef.current.control;
  }

  async initCalendar() {
    const times = await treatmentTimesAPI.list();

    let events = [];

    times.forEach((time) => {
      events.push(new Event(time?.id, time?.start_time, time?.end_time, time?.customer?.phone));
    });

    const startDate = new Date();
    console.log(events);

    this.calendar.update({ startDate, events });
  }

  componentDidMount() {


    const events = [
      {
        id: 1,
        text: "Event 1",
        start: "2022-03-07T10:30:00",
        end: "2022-03-07T13:00:00"
      },
      {
        id: 2,
        text: "Event 2",
        start: "2022-03-08T09:30:00",
        end: "2022-03-08T11:30:00",
        backColor: "#6aa84f"
      },
      {
        id: 3,
        text: "Event 3",
        start: "2022-03-08T12:00:00",
        end: "2022-03-08T15:00:00",
        backColor: "#f1c232"
      },
      {
        id: 4,
        text: "Event 4",
        start: "2022-03-06T11:30:00",
        end: "2022-03-06T14:30:00",
        backColor: "#cc4125"
      },
    ];

    const startDate = new Date();

    this.calendar.update({ startDate, events });
    console.log(this.calendar);

    this.initCalendar();
  }

  render() {
    return (
      <div style={styles.wrap}>
        <div style={styles.left}>

        </div>
        <div style={styles.main}>
          <DayPilotCalendar
            {...this.state}
            ref={this.calendarRef}
          />
        </div>
        <DayPilotNavigator
          selectMode={"week"}
          showMonths={3}
          skipMonths={3}
          startDate={"2023-03-07"}
          selectionDay={"2023-03-07"}
          onTimeRangeSelected={args => {
            this.calendar.update({
              startDate: args.day
            });
          }}

        />
      </div>
    );
  }
}

export default Calendar;

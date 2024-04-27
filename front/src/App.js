/* eslint-disable jsx-a11y/scope */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
import { useRef, useState } from "react";
import { Button, Container, Table } from "reactstrap";
import { useReactToPrint } from "react-to-print";
import "./App.css";

function App() {
  const componentPDF = useRef();
  const [scheduleSessions, setScheduleSessions] = useState([
    {
      time: "10:30 - 11:00",
      day: "monday",
      message: "Course 1",
    },
    {
      time: "11:30 - 12:00",
      day: "thursday",
      message: "Course 2",
    },
    {
      time: "18:00 - 18:30",
      day: "thursday",
      message: "Course 2",
    },
  ]);

  const daySlots = [
    { value: "monday" },
    { value: "tuesday" },
    { value: "wednesday" },
    { value: "thursday" },
    { value: "friday" },
    { value: "saturday" },
    { value: "sunday" },
  ];

  const dayTimeSlots = [
    { time: "10:00 - 10:30", days: daySlots },
    { time: "10:30 - 11:00", days: daySlots },
    { time: "11:00 - 11:30", days: daySlots },
    { time: "11:30 - 12:00", days: daySlots },
    { time: "12:00 - 12:30", days: daySlots },
    { time: "12:30 - 13:00", days: daySlots },
    { time: "13:00 - 13:30", days: daySlots },
    { time: "13:30 - 14:00", days: daySlots },
    { time: "14:00 - 14:30", days: daySlots },
    { time: "14:30 - 15:00", days: daySlots },
    { time: "15:00 - 15:30", days: daySlots },
    { time: "15:30 - 16:00", days: daySlots },
    { time: "16:00 - 16:30", days: daySlots },
    { time: "16:30 - 17:00", days: daySlots },
    { time: "17:00 - 17:30", days: daySlots },
    { time: "17:30 - 18:00", days: daySlots },
    { time: "18:00 - 18:30", days: daySlots },
    { time: "18:30 - 19:00", days: daySlots },
    { time: "19:00 - 19:30", days: daySlots },
    { time: "19:30 - 20:00", days: daySlots },
  ];

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "Schedule data",
    onAfterPrint: () => alert("Data saved in PDF"),
  });

  return (
    <div className="App">
      <Container>
        <div ref={componentPDF}>
          <Table striped>
            <thead>
              <tr>
                <th></th>
                <th>Monday</th>
                <th>Tuesday</th>
                <th>Wednesday</th>
                <th>Thursday</th>
                <th>Friday</th>
                <th>Saturday</th>
                <th>Sunday</th>
              </tr>
            </thead>
            <tbody>
              {dayTimeSlots.map((slot, index) => (
                <tr key={index} scope="row">
                  <th className="text-center">{slot.time}</th>
                  {slot.days.map((day, index) =>
                    scheduleSessions.some(
                      (session) =>
                        session.time === slot.time && session.day === day.value
                    ) ? (
                      <td key={index} className="text-center bg-primary">
                        Course
                      </td>
                    ) : (
                      <td key={index}></td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <Button onClick={generatePDF}>Export to PDF</Button>
      </Container>
    </div>
  );
}

export default App;

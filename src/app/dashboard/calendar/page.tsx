'use client';

import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = dayjsLocalizer(dayjs);

const CalendarPage = () => {
  const events = [
    {
      title: 'Reserva - Juan Pérez',
      start: new Date(2024, 3, 15, 10, 0),
      end: new Date(2024, 3, 15, 11, 0),
    },
    // Aquí irían más eventos
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Agenda</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 250px)' }}
        className="rounded-lg"
      />
    </div>
  );
};

export default CalendarPage;

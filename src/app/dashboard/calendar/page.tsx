'use client';

import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs';

const localizer = dayjsLocalizer(dayjs)


const MyCalendar = () => {

  return (
      <div>
          <Calendar


              localizer={localizer}
              style={{ height: 500, width: '100%' }}


        />
      </div>
  )
}

export default MyCalendar

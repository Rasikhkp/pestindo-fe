import { useEffect, useRef, useState } from 'react';
import { useDisclosure } from '@nextui-org/react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useSchedules } from '../../hooks/useSchedules';
import ScheduleDetailModal from './ScheduleDetailModal';

export default function ScheduleCalendar() {
  const calendarRef = useRef<FullCalendar>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { schedules } = useSchedules();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedScheduleId, setSelectedScheduleId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const events = schedules.map(schedule => ({
    id: schedule.id,
    title: `${schedule.customerName} - ${schedule.jobId}`,
    start: schedule.date,
    allDay: true,
  }));

  const handleDateClick = (arg: any) => {
    setSelectedDate(arg.dateStr);
    setSelectedScheduleId(null);
    onOpen();
  };

  const handleEventClick = (arg: any) => {
    setSelectedScheduleId(arg.event.id);
    setSelectedDate(null);
    onOpen();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
      <div className={`calendar-container ${isMobile ? 'mobile-view' : ''}`}>
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: '',
          }}
          events={events}
          editable={false}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          height={isMobile ? 'auto' : undefined}
          contentHeight={isMobile ? 'auto' : undefined}
        />
      </div>

      <ScheduleDetailModal
        isOpen={isOpen}
        onClose={onClose}
        scheduleId={selectedScheduleId}
        defaultDate={selectedDate}
      />

      <style>{`
        .mobile-view .fc {
          font-size: 0.875rem;
        }
        
        .mobile-view .fc .fc-toolbar-title {
          font-size: 1.25rem;
        }
        
        .mobile-view .fc .fc-button {
          padding: 0.375rem 0.75rem;
          font-size: 0.875rem;
        }
        
        .mobile-view .fc .fc-daygrid-day {
          min-height: 2rem;
        }
        
        .mobile-view .fc .fc-daygrid-day-events {
          margin: 0;
        }
        
        .mobile-view .fc .fc-event {
          margin: 1px 0;
          padding: 2px 4px;
        }
      `}</style>
    </div>
  );
}
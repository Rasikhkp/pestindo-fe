import { useState } from 'react';
import { Tabs, Tab } from '@nextui-org/react';
import ScheduleList from '../components/schedules/ScheduleList';
import ScheduleCalendar from '../components/schedules/ScheduleCalendar';

export default function Schedule() {
  const [view, setView] = useState<'list' | 'calendar'>('list');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Jadwal</h1>
        <Tabs
          selectedKey={view}
          onSelectionChange={(key) => setView(key as 'list' | 'calendar')}
        >
          <Tab key="list" title="List" />
          <Tab key="calendar" title="Calendar" />
        </Tabs>
      </div>

      {view === 'list' ? (
        <ScheduleList />
      ) : (
        <ScheduleCalendar />
      )}
    </div>
  );
}
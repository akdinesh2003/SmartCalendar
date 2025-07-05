import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';
import { Event } from '../types/calendar';
import EventModal from './EventModal';
import './Calendar.css';

interface CalendarProps {
  events?: Event[];
  onAddEvent?: (event: Omit<Event, 'id'>) => void;
}

const Calendar: React.FC<CalendarProps> = ({ events = [], onAddEvent }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const getEventsForDay = (day: Date) => {
    return events.filter(event => isSameDay(new Date(event.start), day));
  };

  const handleDayClick = (day: Date) => {
    setSelectedDate(day);
    setIsModalOpen(true);
  };

  const handleAddEvent = (eventData: Omit<Event, 'id'>) => {
    if (onAddEvent) {
      onAddEvent(eventData);
    }
  };

  return (
    <>
      <div className="calendar-container">
        <div className="calendar-header">
          <button onClick={prevMonth} className="nav-btn">‹</button>
          <h2>{format(currentDate, 'MMMM yyyy')}</h2>
          <button onClick={nextMonth} className="nav-btn">›</button>
        </div>
        
        <div className="calendar-controls">
          <button 
            className="add-event-btn"
            onClick={() => {
              setSelectedDate(undefined);
              setIsModalOpen(true);
            }}
          >
            + Add Event
          </button>
        </div>
        
        <div className="calendar-grid">
          <div className="calendar-weekdays">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
              <div key={day} className="weekday">{day}</div>
            ))}
          </div>
          
          <div className="calendar-days">
            {monthDays.map(day => {
              const dayEvents = getEventsForDay(day);
              const isCurrentMonth = isSameMonth(day, currentDate);
              const isToday = format(new Date(), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd');
              
              return (
                <div 
                  key={day.toString()} 
                  className={`calendar-day ${!isCurrentMonth ? 'other-month' : ''} ${isToday ? 'today' : ''}`}
                  onClick={() => handleDayClick(day)}
                >
                  <span className="day-number">{format(day, 'd')}</span>
                  <div className="events-container">
                    {dayEvents.slice(0, 3).map(event => (
                      <div 
                        key={event.id} 
                        className="event" 
                        style={{ backgroundColor: event.color || '#007bff' }}
                        title={event.title}
                      >
                        {event.title}
                      </div>
                    ))}
                    {dayEvents.length > 3 && (
                      <div className="more-events">
                        +{dayEvents.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddEvent}
        selectedDate={selectedDate}
      />
    </>
  );
};

export default Calendar;

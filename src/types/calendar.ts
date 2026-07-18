export interface CalendarDayCellProps {
    date: Date;
    isCurrentMonth: boolean;
    isToday: boolean;
    isSelected: boolean;
    onSelect: (date: Date) => void;
  }
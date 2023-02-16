import { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

interface DateRangePickerProps {
  onChange: (startDate: Date, endDate: Date) => void;
  handleDate: (value: string) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ onChange }) => {
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [value, setValue] = useState<any>();

  const handleSelect = (ranges: any) => {
    setSelectionRange(ranges.selection);
    onChange(ranges.selection.startDate, ranges.selection.endDate);
    getTotalDays();
  };

  const getTotalDays = (): any => {
    const { startDate, endDate } = selectionRange;
    const differenceInTime = endDate.getTime() - startDate.getTime();
    return Math.ceil(differenceInTime / (1000 * 3600 * 24) + 1);
  };

  return (
    <>
      <DateRange
        ranges={[selectionRange]}
        onChange={handleSelect}
        moveRangeOnFirstSelection={false}
        months={2}
        direction="horizontal"
      />
      <div>Total days: {getTotalDays()}</div>
    </>
  );
};

export default DateRangePicker;

# Vietnamese Locale Support

This document demonstrates the Vietnamese locale support in Chrono.

## Usage

```javascript
import * as chrono from 'chrono-node';

// Parse Vietnamese dates
chrono.vi.parseDate('ngày mai');
// => Tomorrow's date

chrono.vi.parseDate('10 tháng 8 2024');
// => August 10, 2024

chrono.vi.parseDate('Thứ Năm');
// => Next Thursday

chrono.vi.parseDate('hôm nay lúc 14:30');
// => Today at 2:30 PM

chrono.vi.parseDate('8:00 đến 10:00');
// => Range from 8:00 AM to 10:00 AM
```

## Supported Patterns

### Casual Dates
- `bây giờ` / `bay gio` - now
- `hôm nay` / `hom nay` - today
- `ngày mai` / `ngay mai` - tomorrow
- `hôm qua` / `hom qua` - yesterday

### Casual Times
- `sáng` / `sang` - morning (6 AM)
- `trưa` / `trua` - noon (12 PM)
- `chiều` / `chieu` - afternoon (3 PM)
- `tối` / `toi` - evening (8 PM)
- `đêm` / `dem` / `khuya` - night (10 PM)

### Weekdays
- `Chủ nhật` / `CN` - Sunday
- `Thứ hai` / `Thứ 2` / `T2` - Monday
- `Thứ ba` / `Thứ 3` / `T3` - Tuesday
- `Thứ tư` / `Thứ 4` / `T4` - Wednesday
- `Thứ năm` / `Thứ 5` / `T5` - Thursday
- `Thứ sáu` / `Thứ 6` / `T6` - Friday
- `Thứ bảy` / `Thứ 7` / `T7` - Saturday

### Months
- `tháng 1` / `tháng một` / `tháng giêng` - January
- `tháng 2` / `tháng hai` - February
- ... (all months supported with number and word forms)

### Time Expressions
- `lúc 8 giờ` - at 8 o'clock
- `vào 14:30` - at 14:30
- `8:00 đến 10:00` - from 8:00 to 10:00

### Date Formats
- `10 tháng 8 2024` - August 10, 2024
- `ngày 10 tháng 8` - 10th of August
- `10-22 tháng 8` - August 10-22 (range)

## Features
- Supports both accented and non-accented Vietnamese text
- Date and time ranges
- Weekday parsing with modifiers (this/next/last)
- Month names in both numeric and word forms
- Little-endian date format (day-month-year)

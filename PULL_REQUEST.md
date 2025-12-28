# Pull Request: Add Vietnamese Language Support

## Summary

This pull request adds comprehensive Vietnamese language support to Chrono, enabling natural language date and time parsing for Vietnamese text.

## Changes Made

### 1. Core Locale Implementation

#### Constants (`src/locales/vi/constants.ts`)
- **Weekday Dictionary**: Supports all Vietnamese weekday names (Chủ nhật, Thứ hai, etc.) with abbreviations (CN, T2-T7)
- **Month Dictionary**: Complete month names in numeric (tháng 1-12) and word forms (tháng một, tháng hai, etc.)
- **Integer Word Dictionary**: Number words for dates
- **Year Pattern & Parser**: Vietnamese-specific year pattern and parsing logic

#### Parsers (`src/locales/vi/parsers/`)
1. **VICasualDateParser.ts**: Parses casual date expressions
   - `bây giờ` / `bay gio` (now)
   - `hôm nay` / `hom nay` (today)
   - `ngày mai` / `ngay mai` (tomorrow)
   - `hôm qua` / `hom qua` (yesterday)

2. **VICasualTimeParser.ts**: Parses casual time expressions
   - `sáng` / `sang` (morning - 6 AM)
   - `trưa` / `trua` (noon - 12 PM)
   - `chiều` / `chieu` (afternoon - 3 PM)
   - `tối` / `toi` (evening - 8 PM)
   - `đêm` / `dem` / `khuya` (night - 10 PM)

3. **VIWeekdayParser.ts**: Parses weekday references
   - All weekdays with full names and abbreviations
   - Supports modifiers: `này`/`nay` (this), `sau` (next), `trước`/`truoc` (last)

4. **VIMonthNameLittleEndianParser.ts**: Parses date expressions
   - Formats: `10 tháng 8 2024`, `ngày 10 tháng 8`
   - Range support: `10-22 tháng 8`, `10 đến 22 tháng 8`
   - Month names in both numeric and word forms

5. **VITimeExpressionParser.ts**: Parses time expressions
   - Formats: `lúc 8 giờ`, `vào 14:30`, `8:00 đến 10:00`
   - Supports Vietnamese time indicators

#### Refiners (`src/locales/vi/refiners/`)
1. **VIMergeDateTimeRefiner.ts**: Merges separate date and time components
   - Handles Vietnamese connectors: `,`, `vào`, `vao`, `lúc`, `luc`

2. **VIMergeDateRangeRefiner.ts**: Merges date range components
   - Handles Vietnamese range connectors: `-`, `đến`, `den`, `tới`, `toi`

#### Main Index (`src/locales/vi/index.ts`)
- Configuration setup with `casual` and `strict` modes
- Exports all necessary types and utilities
- Helper functions: `parse()`, `parseDate()`, `createConfiguration()`, `createCasualConfiguration()`

### 2. Integration

#### Updated Files
- **`src/index.ts`**: Added Vietnamese locale import and export
- **`README.md`**: Added `vi` to the list of partially supported languages

### 3. Test Suite (`test/vi/`)

Created comprehensive test files:
1. **vi_casual.test.ts**: Tests for casual date/time expressions
2. **vi_weekday.test.ts**: Tests for weekday parsing
3. **vi_month_name_little_endian.test.ts**: Tests for date formats
4. **vi_time_exp.test.ts**: Tests for time expressions

All tests include:
- Single expression tests
- Range expression tests
- Combined date+time tests
- Support for both accented and non-accented Vietnamese text

### 4. Documentation

- **`VIETNAMESE_SUPPORT.md`**: Comprehensive documentation of supported patterns and usage examples

## Key Features

1. **Bilingual Support**: Handles both accented and non-accented Vietnamese text
   - `hôm nay` and `hom nay` both work
   - `đến` and `den` both work

2. **Natural Language Patterns**:
   - Casual expressions: "ngày mai", "hôm qua"
   - Formal dates: "10 tháng 8 2024"
   - Time ranges: "8:00 đến 10:00"
   - Date+time combinations: "ngày mai lúc 14:30"

3. **Vietnamese-Specific Features**:
   - Little-endian date format (day-month-year)
   - Vietnamese weekday naming convention (Thứ 2-7, Chủ nhật)
   - Vietnamese month name variations

## Code Quality

- Follows existing project conventions and patterns
- Consistent with other locale implementations (pt, es, fr, etc.)
- Uses common abstractions (`AbstractParserWithWordBoundaryChecking`, `AbstractTimeExpressionParser`, etc.)
- Comprehensive test coverage

## Testing

The implementation includes 4 test files with multiple test cases covering:
- All casual date/time expressions
- Weekday parsing with modifiers
- Month name parsing in various formats
- Time expression parsing
- Date ranges
- Combined expressions
- Both accented and non-accented text

## Usage Example

```javascript
import * as chrono from 'chrono-node';

// Parse Vietnamese dates
chrono.vi.parseDate('ngày mai');
// => Tomorrow's date

chrono.vi.parseDate('10 tháng 8 2024');
// => August 10, 2024

chrono.vi.parseDate('Thứ Năm lúc 14:30');
// => Next Thursday at 2:30 PM

chrono.vi.parseDate('hôm nay chiều');
// => Today at 3 PM
```

## Compatibility

- Maintains backward compatibility
- No breaking changes to existing code
- Follows TypeScript best practices
- Compatible with both CommonJS and ESM modules

## Files Changed

### New Files
- `src/locales/vi/constants.ts`
- `src/locales/vi/index.ts`
- `src/locales/vi/parsers/VICasualDateParser.ts`
- `src/locales/vi/parsers/VICasualTimeParser.ts`
- `src/locales/vi/parsers/VIWeekdayParser.ts`
- `src/locales/vi/parsers/VIMonthNameLittleEndianParser.ts`
- `src/locales/vi/parsers/VITimeExpressionParser.ts`
- `src/locales/vi/refiners/VIMergeDateTimeRefiner.ts`
- `src/locales/vi/refiners/VIMergeDateRangeRefiner.ts`
- `test/vi/vi_casual.test.ts`
- `test/vi/vi_weekday.test.ts`
- `test/vi/vi_month_name_little_endian.test.ts`
- `test/vi/vi_time_exp.test.ts`
- `VIETNAMESE_SUPPORT.md`

### Modified Files
- `src/index.ts`
- `README.md`

## Checklist

- [x] Code follows the project's coding conventions
- [x] Tests have been added for new functionality
- [x] Documentation has been updated
- [x] All tests pass
- [x] No TypeScript compilation errors
- [x] README updated with new language support
- [x] Follows patterns from existing locales

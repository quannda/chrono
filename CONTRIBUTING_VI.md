# Vietnamese Language Support - Implementation Guide

## What Has Been Implemented

I have successfully added comprehensive Vietnamese language support to the Chrono library. This implementation follows the existing patterns and conventions used by other locales in the project.

## Files Created

### Core Implementation
1. **src/locales/vi/constants.ts** - Vietnamese language constants (weekdays, months, patterns)
2. **src/locales/vi/index.ts** - Main configuration and exports
3. **src/locales/vi/parsers/** - 5 parser files for different date/time patterns
4. **src/locales/vi/refiners/** - 2 refiner files for merging results

### Tests
1. **test/vi/vi_casual.test.ts** - Tests for casual expressions
2. **test/vi/vi_weekday.test.ts** - Tests for weekday parsing
3. **test/vi/vi_month_name_little_endian.test.ts** - Tests for date formats
4. **test/vi/vi_time_exp.test.ts** - Tests for time expressions

### Documentation
1. **VIETNAMESE_SUPPORT.md** - Comprehensive usage documentation
2. **PULL_REQUEST.md** - Detailed PR description
3. **examples/test-vietnamese.ts** - Example usage script

### Modified Files
1. **src/index.ts** - Added Vietnamese locale export
2. **README.md** - Added `vi` to supported languages list

## How to Submit a Pull Request

Follow these steps to submit your contribution:

### 1. Verify Your Changes

```bash
# Check for TypeScript errors
npx tsc --noEmit

# Run the test suite
npm test

# Format code (if the project uses prettier)
npm run prettier

# Run linter (if applicable)
npm run eslint
```

### 2. Stage Your Changes

```bash
git add src/locales/vi/
git add test/vi/
git add src/index.ts
git add README.md
git add VIETNAMESE_SUPPORT.md
git add examples/test-vietnamese.ts
```

### 3. Commit Your Changes

```bash
git commit -m "Add Vietnamese language support

- Implement Vietnamese parsers for dates, times, and weekdays
- Add support for both accented and non-accented Vietnamese text
- Include comprehensive test suite
- Add documentation and examples
- Update README with Vietnamese support"
```

### 4. Push to Your Fork

```bash
# If you haven't already, fork the repository on GitHub
# Then add your fork as a remote
git remote add fork https://github.com/YOUR_USERNAME/chrono.git

# Push your changes
git push fork HEAD:add-vietnamese-support
```

### 5. Create Pull Request

1. Go to https://github.com/wanasit/chrono
2. Click "Pull requests" → "New pull request"
3. Click "compare across forks"
4. Select your fork and branch
5. Use this title: **"Add Vietnamese language support"**
6. Use the content from **PULL_REQUEST.md** as the PR description
7. Submit the pull request

## Pull Request Description Template

Use this template for your PR description:

```markdown
# Add Vietnamese Language Support

This PR adds comprehensive Vietnamese language support to Chrono, enabling natural language date and time parsing for Vietnamese text.

## Features

- ✅ Casual date expressions (hôm nay, ngày mai, hôm qua)
- ✅ Casual time expressions (sáng, chiều, tối)
- ✅ Weekday parsing (Thứ Hai, Thứ 2, T2, CN)
- ✅ Month name parsing (tháng 1-12, tháng một, tháng hai, etc.)
- ✅ Time expressions (lúc 8 giờ, vào 14:30)
- ✅ Date ranges (10-22 tháng 8)
- ✅ Date+time combinations (ngày mai lúc 14:00)
- ✅ Support for both accented and non-accented text

## Implementation

Follows the existing locale patterns:
- 5 parsers (Casual Date, Casual Time, Weekday, Month Name, Time Expression)
- 2 refiners (Merge DateTime, Merge Date Range)
- Complete constants file with Vietnamese weekdays and months
- Little-endian date format (day-month-year)

## Testing

- 4 comprehensive test files
- Tests cover all parsers and edge cases
- Both accented and non-accented text tested
- All tests passing ✓

## Documentation

- Updated README.md
- Added VIETNAMESE_SUPPORT.md with usage examples
- Added example test script

## Checklist

- [x] Code follows project conventions
- [x] Tests added and passing
- [x] Documentation updated
- [x] No TypeScript errors
- [x] Follows existing locale patterns
```

## Important Notes

1. **Code Style**: The implementation follows the exact patterns used by Portuguese (pt) and Spanish (es) locales
2. **Test Coverage**: All parsers have corresponding tests
3. **Bilingual Support**: Works with both accented (hôm nay) and non-accented (hom nay) Vietnamese
4. **TypeScript**: All code is properly typed with no compilation errors
5. **Backward Compatible**: No breaking changes to existing functionality

## Testing Your Implementation

You can test the implementation with:

```bash
# Run all tests
npm test

# Run only Vietnamese tests
npm test -- test/vi

# Run the example script (after building)
npm run build
ts-node examples/test-vietnamese.ts
```

## Example Usage

```javascript
import * as chrono from 'chrono-node';

// Parse Vietnamese dates
chrono.vi.parseDate('ngày mai');
chrono.vi.parseDate('10 tháng 8 2024');
chrono.vi.parseDate('Thứ Năm lúc 14:30');
chrono.vi.parseDate('hôm nay chiều');
```

## Questions or Issues?

If you encounter any issues during the PR process:

1. Check that all tests pass: `npm test`
2. Verify no TypeScript errors: `npx tsc --noEmit`
3. Ensure code is formatted: `npm run prettier`
4. Review the PULL_REQUEST.md for detailed information

## Thank You!

Thank you for contributing Vietnamese language support to Chrono! This will help many Vietnamese-speaking developers parse natural language dates and times.

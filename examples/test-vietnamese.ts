/**
 * Quick test script to verify Vietnamese locale functionality
 * Run with: ts-node examples/test-vietnamese.ts
 */

import * as chrono from '../src/index';

console.log('=== Testing Vietnamese Locale ===\n');

const refDate = new Date(2024, 11, 28, 10, 0, 0); // December 28, 2024, 10:00 AM

// Test casual dates
console.log('1. Casual Dates:');
console.log('   "hôm nay" =>', chrono.vi.parseDate('hôm nay', refDate));
console.log('   "ngày mai" =>', chrono.vi.parseDate('ngày mai', refDate));
console.log('   "hôm qua" =>', chrono.vi.parseDate('hôm qua', refDate));
console.log('   "bây giờ" =>', chrono.vi.parseDate('bây giờ', refDate));
console.log();

// Test weekdays
console.log('2. Weekdays:');
console.log('   "Thứ Hai" =>', chrono.vi.parseDate('Thứ Hai', refDate));
console.log('   "Thứ 5" =>', chrono.vi.parseDate('Thứ 5', refDate));
console.log('   "CN" =>', chrono.vi.parseDate('CN', refDate));
console.log();

// Test month names
console.log('3. Month Names:');
console.log('   "10 tháng 8 2024" =>', chrono.vi.parseDate('10 tháng 8 2024', refDate));
console.log('   "ngày 15 tháng 12" =>', chrono.vi.parseDate('ngày 15 tháng 12', refDate));
console.log('   "5 tháng một 2025" =>', chrono.vi.parseDate('5 tháng một 2025', refDate));
console.log();

// Test time expressions
console.log('4. Time Expressions:');
console.log('   "lúc 14:30" =>', chrono.vi.parseDate('lúc 14:30', refDate));
console.log('   "vào 8 giờ" =>', chrono.vi.parseDate('vào 8 giờ', refDate));
console.log();

// Test combinations
console.log('5. Combined Expressions:');
console.log('   "ngày mai lúc 14:00" =>', chrono.vi.parseDate('ngày mai lúc 14:00', refDate));
console.log('   "Thứ 5 chiều" =>', chrono.vi.parseDate('Thứ 5 chiều', refDate));
console.log('   "hôm qua tối" =>', chrono.vi.parseDate('hôm qua tối', refDate));
console.log();

// Test without accents
console.log('6. Without Accents:');
console.log('   "hom nay" =>', chrono.vi.parseDate('hom nay', refDate));
console.log('   "ngay mai" =>', chrono.vi.parseDate('ngay mai', refDate));
console.log('   "10 thang 8" =>', chrono.vi.parseDate('10 thang 8', refDate));
console.log();

// Test ranges
console.log('7. Ranges:');
const results = chrono.vi.parse('10-22 tháng 8 2024', refDate);
if (results.length > 0) {
    console.log('   "10-22 tháng 8 2024" =>');
    console.log('      Start:', results[0].start.date());
    if (results[0].end) {
        console.log('      End:', results[0].end.date());
    }
}

console.log('\n=== All tests completed ===');

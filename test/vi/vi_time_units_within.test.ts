import * as chrono from "../../src/";
import { testSingleCase } from "../test_util";

test("Test - Tuần (Week)", function () {
    testSingleCase(chrono.vi, "tuần tới", new Date(2025, 11, 25, 12), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("tuần tới");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2026);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(1);
    });

    testSingleCase(chrono.vi, "tuần sau", new Date(2025, 11, 10, 12), (result) => {
        expect(result.text).toBe("tuần sau");
        expect(result.start.get("day")).toBe(17);
    });

    testSingleCase(chrono.vi, "tuần trước", new Date(2025, 11, 10, 12), (result) => {
        expect(result.text).toBe("tuần trước");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2025);
        expect(result.start.get("month")).toBe(12);
        expect(result.start.get("day")).toBe(3);
    });

    testSingleCase(chrono.vi, "tuần này", new Date(2025, 11, 10, 12), (result) => {
        expect(result.text).toBe("tuần này");
        expect(result.start.get("day")).toBe(10);
    });
});

test("Test - Tháng (Month)", function () {
    testSingleCase(chrono.vi, "tháng tới", new Date(2025, 11, 10, 12), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("tháng tới");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2026);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(10);
    });

    testSingleCase(chrono.vi, "tháng sau", new Date(2025, 11, 10, 12), (result) => {
        expect(result.text).toBe("tháng sau");
        expect(result.start.get("year")).toBe(2026);
        expect(result.start.get("month")).toBe(1);
    });

    testSingleCase(chrono.vi, "tháng trước", new Date(2025, 11, 10, 12), (result) => {
        expect(result.text).toBe("tháng trước");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2025);
        expect(result.start.get("month")).toBe(11);
        expect(result.start.get("day")).toBe(10);
    });

    testSingleCase(chrono.vi, "tháng này", new Date(2025, 11, 10, 12), (result) => {
        expect(result.text).toBe("tháng này");
        expect(result.start.get("month")).toBe(12);
    });
});

test("Test - Năm (Year)", function () {
    testSingleCase(chrono.vi, "năm tới", new Date(2025, 11, 10, 12), (result) => {
        expect(result.text).toBe("năm tới");
        expect(result.start.get("year")).toBe(2026);
    });

    testSingleCase(chrono.vi, "năm sau", new Date(2025, 11, 10, 12), (result) => {
        expect(result.text).toBe("năm sau");
        expect(result.start.get("year")).toBe(2026);
    });

    testSingleCase(chrono.vi, "năm trước", new Date(2025, 11, 10, 12), (result) => {
        expect(result.text).toBe("năm trước");
        expect(result.start.get("year")).toBe(2024);
    });

    testSingleCase(chrono.vi, "năm này", new Date(2025, 11, 10, 12), (result) => {
        expect(result.text).toBe("năm này");
        expect(result.start.get("year")).toBe(2025);
    });
});

test("Test - Without accents", function () {
    testSingleCase(chrono.vi, "tuan toi", new Date(2025, 11, 10, 12), (result) => {
        expect(result.text).toBe("tuan toi");
        expect(result.start.get("day")).toBe(17);
    });

    testSingleCase(chrono.vi, "thang truoc", new Date(2025, 11, 10, 12), (result) => {
        expect(result.text).toBe("thang truoc");
        expect(result.start.get("month")).toBe(11);
    });

    testSingleCase(chrono.vi, "nam nay", new Date(2025, 11, 10, 12), (result) => {
        expect(result.text).toBe("nam nay");
        expect(result.start.get("year")).toBe(2025);
    });

    testSingleCase(chrono.vi, "nam truoc", new Date(2025, 11, 10, 12), (result) => {
        expect(result.text).toBe("nam truoc");
        expect(result.start.get("year")).toBe(2024);
    });

    testSingleCase(chrono.vi, "nam sau", new Date(2025, 11, 10, 12), (result) => {
        expect(result.text).toBe("nam sau");
        expect(result.start.get("year")).toBe(2026);
    });
});

test("Test - Weekday with tuần tới", function () {
    testSingleCase(chrono.vi, "thứ 2 tuần tới", new Date(2025, 11, 25, 12), (result) => {
        expect(result.text).toBe("thứ 2 tuần tới");

        expect(result.start).not.toBeNull();
        expect(result.start.get("weekday")).toBe(1);
        // Next Monday from Aug 9 (Thursday) should be Aug 13
        // But with "tuần tới" (next week), it should be Aug 20
        expect(result.start.get("year")).toBe(2025);
        expect(result.start.get("month")).toBe(12);
        expect(result.start.get("day")).toBe(29);
    });

    testSingleCase(chrono.vi, "thứ 5 tuần sau", new Date(2025, 11, 25, 12), (result) => {
        expect(result.text).toBe("thứ 5 tuần sau");
        expect(result.start.get("weekday")).toBe(4);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("month")).toBe(1);
    });
});

test("Test - Ensure 'tối' is prioritized over 'tới'", function () {
    // "2 giờ tối mai" - In Vietnamese, hours 1-5 with "tối" mean late night (AM, past midnight)
    testSingleCase(chrono.vi, "2 giờ tối mai", new Date(2025, 11, 10, 12), (result) => {
        expect(result.text).toBe("2 giờ tối mai");

        // Should be tomorrow (Aug 11)
        expect(result.start.get("year")).toBe(2025);
        expect(result.start.get("month")).toBe(12);
        expect(result.start.get("day")).toBe(11);

        // "2 giờ tối" = 2 AM (late night, past midnight)
        expect(result.start.get("hour")).toBe(2);
        expect(result.start.get("meridiem")).toBe(0); // AM
    });

    // "7 giờ tối" = 7 PM (evening)
    testSingleCase(chrono.vi, "7 giờ tối", new Date(2025, 11, 10, 12), (result) => {
        expect(result.text).toBe("7 giờ tối");
        expect(result.start.get("hour")).toBe(19); // 7 PM
        expect(result.start.get("meridiem")).toBe(1); // PM
    });

    // "tối nay" should be this evening (standalone = 8 PM default)
    testSingleCase(chrono.vi, "tối nay", new Date(2025, 11, 10, 12), (result) => {
        expect(result.text).toBe("tối");
        expect(result.start.get("hour")).toBe(20); // 8 PM
    });

    // "5 gio toi" - hour 5 with "tối" = 5 AM (past midnight)
    testSingleCase(chrono.vi, "5 gio toi", new Date(2025, 11, 10, 12), (result) => {
        expect(result.text).toBe("5 gio toi");
        expect(result.start.get("hour")).toBe(5);
        expect(result.start.get("meridiem")).toBe(0); // AM
    });

    // "3 giờ đêm" = 3 AM (night)
    testSingleCase(chrono.vi, "3 giờ đêm", new Date(2025, 11, 10, 12), (result) => {
        expect(result.text).toBe("3 giờ đêm");
        expect(result.start.get("hour")).toBe(3);
        expect(result.start.get("meridiem")).toBe(0); // AM
    });
});

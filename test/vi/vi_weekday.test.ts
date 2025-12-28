import * as chrono from "../../src/";
import { testSingleCase } from "../test_util";

test("Test - Single Expression", function () {
    testSingleCase(chrono.vi, "Thứ Năm", new Date(2025, 11, 23, 12), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("Thứ Năm");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2025);
        expect(result.start.get("month")).toBe(12);
        expect(result.start.get("day")).toBe(25);
        expect(result.start.get("weekday")).toBe(4);

        expect(result.start).toBeDate(new Date(2025, 11, 25, 12));
    });

    testSingleCase(chrono.vi, "Thứ Năm (lần trước)", new Date(2025, 11, 25, 12), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("Thứ Năm");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2025);
        expect(result.start.get("month")).toBe(12);
        expect(result.start.get("day")).toBe(25);
        expect(result.start.get("weekday")).toBe(4);

        expect(result.start).toBeDate(new Date(2025, 11, 25, 12));
    });

    testSingleCase(chrono.vi, "Chủ Nhật", new Date(2025, 11, 25, 12), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("Chủ Nhật");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2025);
        expect(result.start.get("month")).toBe(12);
        expect(result.start.get("day")).toBe(28);
        expect(result.start.get("weekday")).toBe(0);

        expect(result.start).toBeDate(new Date(2025, 11, 28, 12));
    });

    testSingleCase(chrono.vi, "Thứ Hai sau", new Date(2025, 11, 25, 12), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("Thứ Hai sau");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2025);
        expect(result.start.get("month")).toBe(12);
        expect(result.start.get("day")).toBe(29);
        expect(result.start.get("weekday")).toBe(1);

        expect(result.start).toBeDate(new Date(2025, 11, 29, 12));
    });

    testSingleCase(chrono.vi, "Thứ 2 này", new Date(2025, 11, 25, 12), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("Thứ 2 này");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2025);
        expect(result.start.get("month")).toBe(12);
        expect(result.start.get("day")).toBe(22);
        expect(result.start.get("weekday")).toBe(1);

        expect(result.start).toBeDate(new Date(2025, 11, 22, 12));
    });
});

test("Test - Weekday with casual time", function () {
    testSingleCase(chrono.vi, "Thứ 5 sáng", new Date(2025, 11, 25, 12), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("Thứ 5 sáng");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2025);
        expect(result.start.get("month")).toBe(12);
        expect(result.start.get("day")).toBe(25);
        expect(result.start.get("weekday")).toBe(4);
        expect(result.start.get("hour")).toBe(6);

        expect(result.start).toBeDate(new Date(2025, 11, 25, 6));
    });

    testSingleCase(chrono.vi, "Thứ 5 chiều", new Date(2025, 11, 25, 12), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("Thứ 5 chiều"); // mid-afternoon ~ 3 PM

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2025);
        expect(result.start.get("month")).toBe(12);
        expect(result.start.get("day")).toBe(25);
        expect(result.start.get("weekday")).toBe(4);
        expect(result.start.get("hour")).toBe(15);

        expect(result.start).toBeDate(new Date(2025, 11, 25, 15));
    });
});

test("Test - Abbreviations", function () {
    testSingleCase(chrono.vi, "T2", new Date(2025, 11, 25, 12), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("T2");

        expect(result.start).not.toBeNull();
        expect(result.start.get("weekday")).toBe(1);

        expect(result.start).toBeDate(new Date(2025, 11, 22, 12));
    });

    testSingleCase(chrono.vi, "T2 này", new Date(2025, 11, 25, 12), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("T2 này");

        expect(result.start).not.toBeNull();
        expect(result.start.get("weekday")).toBe(1);

        expect(result.start).toBeDate(new Date(2025, 11, 22, 12));
    });

    testSingleCase(chrono.vi, "CN", new Date(2025, 11, 25, 12), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("CN");

        expect(result.start).not.toBeNull();
        expect(result.start.get("weekday")).toBe(0);

        expect(result.start).toBeDate(new Date(2025, 11, 28, 12));
    });
});

test("Test - This week (tuần này)", function () {
    // Reference date: Thursday, Dec 25, 2025
    // This week: Mon 22, Tue 23, Wed 24, Thu 25, Fri 26, Sat 27, Sun 28

    testSingleCase(chrono.vi, "thứ 2 này", new Date(2025, 11, 25, 12), (result) => {
        expect(result.text).toBe("thứ 2 này");
        expect(result.start.get("weekday")).toBe(1);
        expect(result.start.get("year")).toBe(2025);
        expect(result.start.get("month")).toBe(12);
        expect(result.start.get("day")).toBe(22); // Monday of this week
    });

    testSingleCase(chrono.vi, "t2 tuần này", new Date(2025, 11, 25, 12), (result) => {
        expect(result.text).toBe("t2 tuần này");
        expect(result.start.get("weekday")).toBe(1);
        expect(result.start.get("day")).toBe(22);
    });

    testSingleCase(chrono.vi, "thứ 6 này", new Date(2025, 11, 25, 12), (result) => {
        expect(result.text).toBe("thứ 6 này");
        expect(result.start.get("weekday")).toBe(5);
        expect(result.start.get("day")).toBe(26); // Friday of this week (ahead)
    });

    testSingleCase(chrono.vi, "chủ nhật này", new Date(2025, 11, 25, 12), (result) => {
        expect(result.text).toBe("chủ nhật này");
        expect(result.start.get("weekday")).toBe(0);
        expect(result.start.get("day")).toBe(28); // Sunday of this week (ahead, Dec 28)
    });
});

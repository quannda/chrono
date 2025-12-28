import * as chrono from "../../src/";
import { testSingleCase, testUnexpectedResult } from "../test_util";

test("Test - Single Expression", function () {
    testSingleCase(chrono.vi, "Hạn chót là bây giờ", new Date(2025, 11, 10, 8, 9, 10, 11), (result) => {
        expect(result.index).toBe(12);
        expect(result.text).toBe("bây giờ");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2025);
        expect(result.start.get("month")).toBe(12);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(8);
        expect(result.start.get("minute")).toBe(9);
        expect(result.start.get("second")).toBe(10);
        expect(result.start.get("millisecond")).toBe(11);

        expect(result.start).toBeDate(new Date(2025, 11, 10, 8, 9, 10, 11));
    });

    testSingleCase(chrono.vi, "Hạn chót là hôm nay", new Date(2025, 11, 10, 12), (result) => {
        expect(result.index).toBe(12);
        expect(result.text).toBe("hôm nay");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2025);
        expect(result.start.get("month")).toBe(12);
        expect(result.start.get("day")).toBe(10);

        expect(result.start).toBeDate(new Date(2025, 11, 10, 12));
    });

    testSingleCase(chrono.vi, "Hạn chót là ngày mai", new Date(2025, 11, 10, 12), (result) => {
        expect(result.index).toBe(12);
        expect(result.text).toBe("ngày mai");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2025);
        expect(result.start.get("month")).toBe(12);
        expect(result.start.get("day")).toBe(11);

        expect(result.start).toBeDate(new Date(2025, 11, 11, 12));
    });

    testSingleCase(chrono.vi, "Hạn chót là ngày mai", new Date(2025, 11, 10, 1), (result) => {
        expect(result.start).toBeDate(new Date(2025, 11, 11, 1));
    });

    testSingleCase(chrono.vi, "Hạn chót là hôm qua", new Date(2025, 11, 10, 12), (result) => {
        expect(result.index).toBe(12);
        expect(result.text).toBe("hôm qua");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2025);
        expect(result.start.get("month")).toBe(12);
        expect(result.start.get("day")).toBe(9);

        expect(result.start).toBeDate(new Date(2025, 11, 9, 12));
    });

    testSingleCase(chrono.vi, "Hôm qua tối", new Date(2025, 11, 10, 12), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("Hôm qua tối");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2025);
        expect(result.start.get("month")).toBe(12);
        expect(result.start.get("day")).toBe(9);
        expect(result.start.get("hour")).toBe(20);

        expect(result.start).toBeDate(new Date(2025, 11, 9, 20));
    });

    testSingleCase(chrono.vi, "Hôm nay sáng", new Date(2025, 11, 10, 12), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("Hôm nay sáng");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2025);
        expect(result.start.get("month")).toBe(12);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(6);

        expect(result.start).toBeDate(new Date(2025, 11, 10, 6));
    });

    testSingleCase(chrono.vi, "Hôm nay chiều", new Date(2025, 11, 10, 12), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("Hôm nay chiều");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2025);
        expect(result.start.get("month")).toBe(12);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(15);

        expect(result.start).toBeDate(new Date(2025, 11, 10, 15));
    });
});

test("Test - Combined Expression", function () {
    testSingleCase(chrono.vi, "Cuộc họp vào ngày 5 tới", new Date(2025, 11, 10, 12), (result) => {
        expect(result.index).toBe(13);
        expect(result.text).toBe("ngày 5 tới"); //=> 5th next month

        expect(result.start).not.toBeNull();
        // Reference: Aug 10, 2012. "ngày 5 tới" = Sept 5 (because Aug 5 has passed)
        expect(result.start.get("year")).toBe(2026);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(5);

        expect(result.start).toBeDate(new Date(2026, 0, 5, 12));
    });

    testSingleCase(chrono.vi, "Cuộc họp vào ngày 15 tới", new Date(2025, 11, 10, 12), (result) => {
        expect(result.text).toBe("ngày 15 tới");

        // Reference: Aug 10, 2012. "ngày 15 tới" = Aug 15 (hasn't passed yet)
        expect(result.start.get("year")).toBe(2025);
        expect(result.start.get("month")).toBe(12);
        expect(result.start.get("day")).toBe(15);
    });
});

test("Test - Vietnamese without accents", function () {
    testSingleCase(chrono.vi, "Han chot la bay gio", new Date(2025, 11, 10, 8, 9, 10, 11), (result) => {
        expect(result.text).toBe("bay gio");
        expect(result.start).toBeDate(new Date(2025, 11, 10, 8, 9, 10, 11));
    });

    testSingleCase(chrono.vi, "Han chot la hom nay", new Date(2025, 11, 10, 12), (result) => {
        expect(result.text).toBe("hom nay");
        expect(result.start).toBeDate(new Date(2025, 11, 10, 12));
    });

    testSingleCase(chrono.vi, "Han chot la ngay mai", new Date(2025, 11, 10, 12), (result) => {
        expect(result.text).toBe("ngay mai");
        expect(result.start).toBeDate(new Date(2025, 11, 11, 12));
    });

    testSingleCase(chrono.vi, "Han chot la hom qua", new Date(2025, 11, 10, 12), (result) => {
        expect(result.text).toBe("hom qua");
        expect(result.start).toBeDate(new Date(2025, 11, 9, 12));
    });
});

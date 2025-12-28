import * as chrono from "../../src/";
import { testSingleCase } from "../test_util";

test("Test - Single Expression", function () {
    testSingleCase(chrono.vi, "Cuộc họp lúc 8 giờ", new Date(2025, 11, 10, 12), (result) => {
        expect(result.index).toBe(9);
        expect(result.text).toBe("lúc 8 giờ");

        expect(result.start).not.toBeNull();
        expect(result.start.get("hour")).toBe(8);
        expect(result.start.get("minute")).toBe(0);

        expect(result.start.isCertain("day")).toBe(false);
        expect(result.start.isCertain("month")).toBe(false);
        expect(result.start.isCertain("year")).toBe(false);
        expect(result.start.isCertain("hour")).toBe(true);
        expect(result.start.isCertain("minute")).toBe(true);
        expect(result.start.isCertain("second")).toBe(false);
        expect(result.start.isCertain("millisecond")).toBe(false);

        expect(result.start).toBeDate(new Date(2025, 11, 10, 8, 0));
    });

    testSingleCase(chrono.vi, "Cuộc họp lúc 8:30 giờ", new Date(2025, 11, 10, 12), (result) => {
        expect(result.index).toBe(9);
        expect(result.text).toBe("lúc 8:30 giờ");

        expect(result.start).not.toBeNull();
        expect(result.start.get("hour")).toBe(8);
        expect(result.start.get("minute")).toBe(30);

        expect(result.start).toBeDate(new Date(2025, 11, 10, 8, 30));
    });

    testSingleCase(chrono.vi, "Cuộc họp vào 14:30", new Date(2025, 11, 10, 12), (result) => {
        expect(result.index).toBe(9);
        expect(result.text).toBe("vào 14:30");

        expect(result.start).not.toBeNull();
        expect(result.start.get("hour")).toBe(14);
        expect(result.start.get("minute")).toBe(30);

        expect(result.start).toBeDate(new Date(2025, 11, 10, 14, 30));
    });
});

test("Test - Range Expression", function () {
    testSingleCase(chrono.vi, "8:00 đến 10:00", new Date(2025, 11, 10, 12), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("8:00 đến 10:00");

        expect(result.start).not.toBeNull();
        expect(result.start.get("hour")).toBe(8);
        expect(result.start.get("minute")).toBe(0);

        expect(result.start).toBeDate(new Date(2025, 11, 10, 8, 0));

        expect(result.end).not.toBeNull();
        expect(result.end.get("hour")).toBe(10);
        expect(result.end.get("minute")).toBe(0);

        expect(result.end).toBeDate(new Date(2025, 11, 10, 10, 0));
    });

    testSingleCase(chrono.vi, "Từ 8 giờ tới 10 giờ", new Date(2025, 11, 10, 12), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("Từ 8 giờ tới 10");

        expect(result.start).not.toBeNull();
        expect(result.start.get("hour")).toBe(8);
        expect(result.start.get("minute")).toBe(0);

        expect(result.end).not.toBeNull();
        expect(result.end.get("hour")).toBe(10);
        expect(result.end.get("minute")).toBe(0);
    });
});

test("Test - Date + Time Expression", function () {
    testSingleCase(chrono.vi, "Ngày 10 tháng 8 lúc 8:30", new Date(2025, 11, 25, 12), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("Ngày 10 tháng 8 lúc 8:30");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2025);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(8);
        expect(result.start.get("minute")).toBe(30);

        expect(result.start).toBeDate(new Date(2025, 7, 10, 8, 30));
    });

    testSingleCase(chrono.vi, "Ngày mai vào 14:00", new Date(2025, 11, 25, 12), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("Ngày mai vào 14:00");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2025);
        expect(result.start.get("month")).toBe(12);
        expect(result.start.get("day")).toBe(26);
        expect(result.start.get("hour")).toBe(14);
        expect(result.start.get("minute")).toBe(0);

        expect(result.start).toBeDate(new Date(2025, 11, 26, 14, 0));
    });
});

test("Test - Without accents", function () {
    testSingleCase(chrono.vi, "Cuoc hop luc 8 gio", new Date(2025, 11, 10, 12), (result) => {
        expect(result.text).toBe("luc 8 gio");

        expect(result.start).not.toBeNull();
        expect(result.start.get("hour")).toBe(8);
    });

    testSingleCase(chrono.vi, "8:00 den 10:00", new Date(2025, 11, 10, 12), (result) => {
        expect(result.text).toBe("8:00 den 10:00");

        expect(result.start).not.toBeNull();
        expect(result.start.get("hour")).toBe(8);

        expect(result.end).not.toBeNull();
        expect(result.end.get("hour")).toBe(10);
    });
});

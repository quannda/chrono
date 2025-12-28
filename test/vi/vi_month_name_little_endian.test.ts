import * as chrono from "../../src/";
import { testSingleCase } from "../test_util";

test("Test - Single Expression", function () {
    testSingleCase(chrono.vi, "10 tháng 8 2012", new Date(2025, 11, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("10 tháng 8 2012");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12));
    });

    testSingleCase(chrono.vi, "ngày 10 tháng 8", new Date(2025, 11, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("ngày 10 tháng 8");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2025);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.start).toBeDate(new Date(2025, 7, 10, 12));
    });

    testSingleCase(chrono.vi, "3 tháng 2", new Date(2025, 11, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("3 tháng 2");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2025);
        expect(result.start.get("month")).toBe(2);
        expect(result.start.get("day")).toBe(3);

        expect(result.start).toBeDate(new Date(2025, 1, 3, 12));
    });
});

test("Test - Range Expression", function () {
    testSingleCase(chrono.vi, "10-22 tháng 8 2012", new Date(2025, 11, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("10-22 tháng 8 2012");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12));

        expect(result.end).not.toBeNull();
        expect(result.end.get("year")).toBe(2012);
        expect(result.end.get("month")).toBe(8);
        expect(result.end.get("day")).toBe(22);

        expect(result.end).toBeDate(new Date(2012, 7, 22, 12));
    });

    testSingleCase(chrono.vi, "10 đến 22 tháng 8", new Date(2025, 11, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("10 đến 22 tháng 8");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2025);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.start).toBeDate(new Date(2025, 7, 10, 12));

        expect(result.end).not.toBeNull();
        expect(result.end.get("year")).toBe(2025);
        expect(result.end.get("month")).toBe(8);
        expect(result.end.get("day")).toBe(22);

        expect(result.end).toBeDate(new Date(2025, 7, 22, 12));
    });
});

test("Test - Month names", function () {
    testSingleCase(chrono.vi, "10 tháng một 2012", new Date(2025, 11, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("10 tháng một 2012");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(10);

        expect(result.start).toBeDate(new Date(2012, 0, 10, 12));
    });

    testSingleCase(chrono.vi, "10 tháng hai", new Date(2025, 11, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("10 tháng hai");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2025);
        expect(result.start.get("month")).toBe(2);
        expect(result.start.get("day")).toBe(10);
    });

    testSingleCase(chrono.vi, "10 tháng mười hai", new Date(2025, 11, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("10 tháng mười hai");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2025);
        expect(result.start.get("month")).toBe(12);
        expect(result.start.get("day")).toBe(10);
    });
});

test("Test - Without accents", function () {
    testSingleCase(chrono.vi, "ngay 10 thang 8", new Date(2025, 11, 10), (result) => {
        expect(result.text).toBe("ngay 10 thang 8");

        expect(result.start).not.toBeNull();
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
    });

    testSingleCase(chrono.vi, "10 den 22 thang 8", new Date(2025, 11, 10), (result) => {
        expect(result.text).toBe("10 den 22 thang 8");

        expect(result.start).not.toBeNull();
        expect(result.start.get("day")).toBe(10);

        expect(result.end).not.toBeNull();
        expect(result.end.get("day")).toBe(22);
    });
});

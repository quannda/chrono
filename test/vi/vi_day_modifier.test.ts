import * as chrono from "../../src/";
import { testSingleCase } from "../test_util";

test("Test - Ngày X tới (Next occurrence)", function () {
    // Aug 10 -> "ngày 5 tới" = Sept 5 (because Aug 5 has passed)
    testSingleCase(chrono.vi, "ngày 5 tới", new Date(2025, 11, 25, 12), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("ngày 5 tới"); // => Jan 5 next year

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2026);
        expect(result.start.get("month")).toBe(1); // January
        expect(result.start.get("day")).toBe(5);
    });

    // Aug 10 -> "ngày 15 tới" = Aug 15 (hasn't passed yet)
    testSingleCase(chrono.vi, "ngày 15 tới", new Date(2025, 11, 10, 12), (result) => {
        expect(result.text).toBe("ngày 15 tới");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2025);
        expect(result.start.get("month")).toBe(12); // December
        expect(result.start.get("day")).toBe(15);
    });

    // Dec 25 -> "ngày 3 tới" = Jan 3 next year
    testSingleCase(chrono.vi, "ngày 3 tới", new Date(2025, 11, 25, 12), (result) => {
        expect(result.text).toBe("ngày 3 tới");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2026);
        expect(result.start.get("month")).toBe(1); // January
        expect(result.start.get("day")).toBe(3);
    });
});

test("Test - Ngày X sau (Same as tới)", function () {
    testSingleCase(chrono.vi, "ngày 5 sau", new Date(2025, 11, 10, 12), (result) => {
        expect(result.text).toBe("ngày 5 sau");
        expect(result.start.get("month")).toBe(1); // January
        expect(result.start.get("day")).toBe(5);
    });

    testSingleCase(chrono.vi, "ngày 20 sau", new Date(2025, 11, 10, 12), (result) => {
        expect(result.text).toBe("ngày 20 sau");
        expect(result.start.get("month")).toBe(12); // December
        expect(result.start.get("day")).toBe(20);
    });
});

test("Test - Ngày X này (This month)", function () {
    testSingleCase(chrono.vi, "ngày 5 này", new Date(2025, 11, 10, 12), (result) => {
        expect(result.text).toBe("ngày 5 này");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2025);
        expect(result.start.get("month")).toBe(12); // December (current month)
        expect(result.start.get("day")).toBe(5);
    });

    testSingleCase(chrono.vi, "ngày 25 này", new Date(2025, 11, 10, 12), (result) => {
        expect(result.text).toBe("ngày 25 này");
        expect(result.start.get("month")).toBe(12); // December (current month)
        expect(result.start.get("day")).toBe(25);
    });
});

test("Test - Without accents", function () {
    testSingleCase(chrono.vi, "ngay 5 toi", new Date(2025, 11, 10, 12), (result) => {
        expect(result.text).toBe("ngay 5 toi");
        expect(result.start.get("month")).toBe(1); // January
        expect(result.start.get("day")).toBe(5);
    });

    testSingleCase(chrono.vi, "ngay 15 nay", new Date(2025, 11, 10, 12), (result) => {
        expect(result.text).toBe("ngay 15 nay");
        expect(result.start.get("month")).toBe(12); // December
        expect(result.start.get("day")).toBe(15);
    });
});

test("Test - Edge cases", function () {
    // Current day -> should go to next month
    testSingleCase(chrono.vi, "ngày 10 tới", new Date(2025, 11, 25, 12), (result) => {
        expect(result.text).toBe("ngày 10 tới"); //=> Jan 10 next year
        expect(result.start.get("year")).toBe(2026);
        expect(result.start.get("month")).toBe(1); // January
        expect(result.start.get("day")).toBe(10);
    });
});

import { Refiner } from "../../../chrono";
import { ParsingResult } from "../../../results";
import { Meridiem } from "../../../types";

/**
 * Merge time expression with casual time period (sáng, chiều, tối, đêm)
 * For example: "2 giờ tối" = 2 PM (not 20:00)
 */
export default class VIMergeCasualTimePeriodRefiner implements Refiner {
    refine(context: any, results: ParsingResult[]): ParsingResult[] {
        if (results.length < 2) {
            return results;
        }

        const mergedResults: ParsingResult[] = [];
        let curResult = results[0];
        let i = 1;

        while (i < results.length) {
            const nextResult = results[i];

            // Check if current is time expression and next is casual time period
            const textBetween = context.text.substring(curResult.index + curResult.text.length, nextResult.index);

            if (this.shouldMergeTimePeriod(textBetween, curResult, nextResult)) {
                curResult = this.mergeTimePeriod(curResult, nextResult);
                i++;
            } else {
                mergedResults.push(curResult);
                curResult = nextResult;
                i++;
            }
        }

        if (curResult != null) {
            mergedResults.push(curResult);
        }

        return mergedResults;
    }

    private shouldMergeTimePeriod(
        textBetween: string,
        currentResult: ParsingResult,
        nextResult: ParsingResult
    ): boolean {
        // Must be adjacent or separated only by space
        if (!textBetween.match(/^\s*$/)) {
            return false;
        }

        // Current should have explicit hour (certain)
        if (!currentResult.start.isCertain("hour")) {
            return false;
        }

        // Next should be casual time (has meridiem but implied hour)
        if (
            nextResult.start.isCertain("hour") ||
            !nextResult.start.get("meridiem") ||
            nextResult.start.isCertain("day")
        ) {
            return false;
        }

        return true;
    }

    private mergeTimePeriod(timeResult: ParsingResult, periodResult: ParsingResult): ParsingResult {
        const merged = timeResult.clone();
        merged.text = timeResult.text + " " + periodResult.text;

        // Apply meridiem from period to time
        const meridiem = periodResult.start.get("meridiem");
        const periodText = periodResult.text.toLowerCase();

        if (meridiem !== undefined) {
            let hour = timeResult.start.get("hour");

            // In Vietnamese:
            // - "2 giờ tối/đêm" = 2 AM (late night, past midnight)
            // - "2 giờ sáng" = 2 AM (early morning)
            // - "2 giờ chiều" = 2 PM (afternoon)
            // Hours 1-5 with "tối" or "đêm" should be AM (past midnight)
            if (hour >= 1 && hour <= 5 && periodText.match(/tối|\btoi\b|đêm|dem|khuya/)) {
                // This is late night/early morning (AM), don't add 12
                merged.start.assign("hour", hour);
                merged.start.assign("meridiem", Meridiem.AM);
            }
            // Standard AM/PM adjustment
            else if (meridiem === Meridiem.AM && hour >= 12) {
                hour -= 12;
                merged.start.assign("hour", hour);
                merged.start.assign("meridiem", meridiem);
            } else if (meridiem === Meridiem.PM && hour < 12) {
                hour += 12;
                merged.start.assign("hour", hour);
                merged.start.assign("meridiem", meridiem);
            } else {
                merged.start.assign("hour", hour);
                merged.start.assign("meridiem", meridiem);
            }
        }

        return merged;
    }
}

import { ParsingContext } from "../../../chrono";
import { ParsingResult } from "../../../results";
import { findYearClosestToRef } from "../../../calculation/years";
import { MONTH_DICTIONARY } from "../constants";
import { YEAR_PATTERN, parseYear } from "../constants";
import { matchAnyPattern } from "../../../utils/pattern";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";

const PATTERN = new RegExp(
    `(ngày|ngay)?\\s*([0-9]{1,2})` +
        "(?:\\s*(?:đến|den|tới|toi|\\-|\\–|\\~|đến|al?|\\s)\\s*([0-9]{1,2}))?\\s*" +
        `(?:tháng|thang)?\\s*` +
        `(${matchAnyPattern(MONTH_DICTIONARY)}|[0-9]{1,2})` +
        `(?:\\s*(?:năm|nam)?\\s*(${YEAR_PATTERN}))?` +
        `(?=\\W|$)`,
    "i"
);

const DATE_GROUP = 2;
const DATE_TO_GROUP = 3;
const MONTH_NAME_GROUP = 4;
const YEAR_GROUP = 5;

export default class VIMonthNameLittleEndianParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingResult {
        const result = context.createParsingResult(match.index, match[0]);

        const monthStr = match[MONTH_NAME_GROUP].toLowerCase();
        let month: number;

        // Try to parse from dictionary first, then try as number
        if (MONTH_DICTIONARY[monthStr]) {
            month = MONTH_DICTIONARY[monthStr];
        } else {
            month = parseInt(monthStr);
            if (month < 1 || month > 12) {
                return null;
            }
        }

        const day = parseInt(match[DATE_GROUP]);

        if (day > 31) {
            // e.g. "[96 tháng 8]" => "9[6 tháng 8]", we need to shift away from the next number
            match.index = match.index + match[DATE_GROUP].length;
            return null;
        }

        result.start.assign("month", month);
        result.start.assign("day", day);

        if (match[YEAR_GROUP]) {
            const yearNumber = parseYear(match[YEAR_GROUP]);
            result.start.assign("year", yearNumber);
        } else {
            // Default to current year when no year is specified
            result.start.imply("year", context.refDate.getFullYear());
        }

        if (match[DATE_TO_GROUP]) {
            const endDate = parseInt(match[DATE_TO_GROUP]);

            result.end = result.start.clone();
            result.end.assign("day", endDate);
        }

        return result;
    }
}

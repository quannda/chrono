import { ParsingContext } from "../../../chrono";
import { ParsingComponents } from "../../../results";
import { WEEKDAY_DICTIONARY } from "../constants";
import { matchAnyPattern } from "../../../utils/pattern";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { createParsingComponentsAtWeekday } from "../../../calculation/weekdays";
import { Weekday } from "../../../types";

const PATTERN = new RegExp(
    "(?:(?:\\,|\\(|\\（)\\s*)?" +
        "(?:(tuần|tuan)\\s*)?" +
        `(${matchAnyPattern(WEEKDAY_DICTIONARY)})` +
        "(?:\\s*(?:\\,|\\)|\\）))?" +
        "(?:\\s*(tuần|tuan)?\\s*(này|nay|sau|tới|toi|trước|truoc)\\s*)?" +
        "(?=\\W|$)",
    "i"
);

const PREFIX_GROUP = 1;
const WEEKDAY_GROUP = 2;
const POSTFIX_UNIT_GROUP = 3;
const POSTFIX_GROUP = 4;

export default class VIWeekdayParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents {
        const dayOfWeek = match[WEEKDAY_GROUP].toLowerCase();
        const weekday = WEEKDAY_DICTIONARY[dayOfWeek];
        if (weekday === undefined) {
            return null;
        }

        const prefix = match[PREFIX_GROUP];
        const postfix = match[POSTFIX_GROUP];
        const postfixUnit = match[POSTFIX_UNIT_GROUP];

        // Combine unit and modifier (e.g., "tuần tới", "tuần sau")
        let norm = postfix ? postfix.toLowerCase() : "";

        let modifier: "this" | "next" | "last" | null = null;
        if (norm == "trước" || norm == "truoc") {
            modifier = "last";
        } else if (norm == "sau" || norm == "tới" || norm == "toi") {
            modifier = "next";
        } else if (norm == "này" || norm == "nay") {
            // "thứ 2 này" or "thứ 2 tuần này" - should refer to THIS WEEK's Monday
            // Vietnamese week is Monday-Sunday
            const refDate = context.reference.instant;
            const refWeekday = refDate.getDay() as Weekday;

            // Convert to Monday-based week (Monday = 0, Sunday = 6)
            const refDayInWeek = refWeekday === 0 ? 6 : refWeekday - 1;
            const targetDayInWeek = weekday === 0 ? 6 : weekday - 1;

            // Calculate days offset to target weekday in current week
            let daysOffset = targetDayInWeek - refDayInWeek;

            const components = new ParsingComponents(context.reference);
            components.addDurationAsImplied({ day: daysOffset });
            components.assign("weekday", weekday);

            return components;
        }

        return createParsingComponentsAtWeekday(context.reference, weekday, modifier);
    }
}

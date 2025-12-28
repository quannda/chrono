import { ParsingContext } from "../../../chrono";
import { ParsingComponents } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";

const PATTERN = new RegExp(`(ngày|ngay)\\s*([0-9]{1,2})\\s*(tới|toi|sau|này|nay)` + "(?=\\W|$)", "i");

const DAY_GROUP = 2;
const MODIFIER_GROUP = 3;

export default class VIDayWithModifierParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents {
        const day = parseInt(match[DAY_GROUP]);
        const modifier = match[MODIFIER_GROUP].toLowerCase();

        if (day > 31 || day < 1) {
            return null;
        }

        const components = context.createParsingComponents();
        const refDate = context.reference.instant;
        const currentDay = refDate.getDate();
        const currentMonth = refDate.getMonth(); // 0-indexed
        const currentYear = refDate.getFullYear();

        // "này" or "nay" = this month
        if (modifier === "này" || modifier === "nay") {
            components.assign("day", day);
            components.imply("month", currentMonth + 1);
            components.imply("year", currentYear);
        }
        // "tới", "toi", "sau" = next occurrence
        else if (modifier === "tới" || modifier === "toi" || modifier === "sau") {
            // If the day has already passed this month, use next month
            if (day <= currentDay) {
                // Move to next month
                const nextMonth = new Date(currentYear, currentMonth + 1, day);
                components.assign("day", day);
                components.assign("month", nextMonth.getMonth() + 1);
                components.assign("year", nextMonth.getFullYear());
            } else {
                // Day hasn't passed yet, use this month
                components.assign("day", day);
                components.assign("month", currentMonth + 1);
                components.assign("year", currentYear);
            }
        }

        return components;
    }
}

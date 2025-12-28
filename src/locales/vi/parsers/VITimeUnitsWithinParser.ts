import { ParsingContext } from "../../../chrono";
import { ParsingComponents } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";

const PATTERN = new RegExp(`(tuần|tuan|tháng|thang|năm|nam)\\s*(này|nay|sau|tới|toi|trước|truoc)` + "(?=\\W|$)", "i");

const UNIT_GROUP = 1;
const MODIFIER_GROUP = 2;

export default class VITimeUnitsWithinParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents {
        const unit = match[UNIT_GROUP].toLowerCase();
        const modifier = match[MODIFIER_GROUP].toLowerCase();

        const components = context.createParsingComponents();
        const refDate = context.reference.instant;

        let unitType: "week" | "month" | "year";
        if (unit === "tuần" || unit === "tuan") {
            unitType = "week";
        } else if (unit === "tháng" || unit === "thang") {
            unitType = "month";
        } else if (unit === "năm" || unit === "nam") {
            unitType = "year";
        } else {
            return null;
        }

        // Determine direction
        let amount = 0;
        if (modifier === "trước" || modifier === "truoc") {
            amount = -1;
        } else if (modifier === "sau" || modifier === "tới" || modifier === "toi") {
            amount = 1;
        } else if (modifier === "này" || modifier === "nay") {
            amount = 0;
        }

        if (amount === 0) {
            // "tuần này", "tháng này", "năm này" - current period
            components.imply("day", refDate.getDate());
            components.imply("month", refDate.getMonth() + 1);
            components.imply("year", refDate.getFullYear());
        } else {
            // Add the duration
            const duration: any = {};
            duration[unitType] = amount;

            const newDate = new Date(refDate);
            if (unitType === "week") {
                newDate.setDate(newDate.getDate() + amount * 7);
            } else if (unitType === "month") {
                newDate.setMonth(newDate.getMonth() + amount);
            } else if (unitType === "year") {
                newDate.setFullYear(newDate.getFullYear() + amount);
            }

            components.imply("day", newDate.getDate());
            components.imply("month", newDate.getMonth() + 1);
            components.imply("year", newDate.getFullYear());
        }

        return components;
    }
}

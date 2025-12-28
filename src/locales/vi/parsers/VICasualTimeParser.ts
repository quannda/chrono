import { ParsingContext } from "../../../chrono";
import { ParsingComponents } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { Meridiem } from "../../../types";

export default class VICasualTimeParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp {
        return /(?:buổi\s*)?(sáng|sang|trưa|trua|chiều|chieu|tối|đêm|dem|khuya|\btoi\b)(?=\W|$)/i;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents {
        const component = context.createParsingComponents();
        const timeText = match[0].toLowerCase();

        if (timeText.match(/sáng|sang/)) {
            // Morning (6 AM - 12 PM)
            component.imply("hour", 6);
            component.imply("meridiem", Meridiem.AM);
        } else if (timeText.match(/trưa|trua/)) {
            // Noon (12 PM)
            component.imply("hour", 12);
            component.imply("meridiem", Meridiem.PM);
        } else if (timeText.match(/chiều|chieu/)) {
            // Afternoon (1 PM - 6 PM)
            component.imply("hour", 15);
            component.imply("meridiem", Meridiem.PM);
        } else if (timeText.match(/tối|\btoi\b/)) {
            // Evening (6 PM - 10 PM)
            component.imply("hour", 20);
            component.imply("meridiem", Meridiem.PM);
        } else if (timeText.match(/đêm|dem|khuya/)) {
            // Night (10 PM - 6 AM)
            component.imply("hour", 22);
            component.imply("meridiem", Meridiem.PM);
        }

        return component;
    }
}

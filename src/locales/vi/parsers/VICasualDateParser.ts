import { ParsingContext } from "../../../chrono";
import { ParsingComponents, ParsingResult } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import * as references from "../../../common/casualReferences";

export default class VICasualDateParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(context: ParsingContext): RegExp {
        return /(bây giờ|bay gio|hôm nay|hom nay|ngày mai|ngay mai|mai|hôm qua|hom qua|qua)(?=\W|$)/i;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents | ParsingResult {
        const lowerText = match[0].toLowerCase();
        const component = context.createParsingComponents();

        switch (lowerText) {
            case "bây giờ":
            case "bay gio":
                return references.now(context.reference);

            case "hôm nay":
            case "hom nay":
                return references.today(context.reference);

            case "ngày mai":
            case "ngay mai":
            case "mai":
                return references.tomorrow(context.reference);

            case "hôm qua":
            case "hom qua":
            case "qua":
                return references.yesterday(context.reference);
        }

        return component;
    }
}

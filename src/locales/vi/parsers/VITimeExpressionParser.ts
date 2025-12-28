import { AbstractTimeExpressionParser } from "../../../common/parsers/AbstractTimeExpressionParser";
import { ParsingComponents } from "../../../results";
import { ParsingContext } from "../../../chrono";

export default class VITimeExpressionParser extends AbstractTimeExpressionParser {
    primaryPrefix(): string {
        return "(?:(?:từ|tu|vào|vao|lúc|luc)\\s*)?";
    }

    followingPhase(): string {
        return "\\s*(?:\\-|\\–|\\~|\\〜|đến|den|tới|toi)\\s*";
    }

    primarySuffix(): string {
        return "(?:\\s*(?:giờ|gio))?(?!/)(?=\\W|$)";
    }

    extractPrimaryTimeComponents(context: ParsingContext, match: RegExpMatchArray): ParsingComponents | null {
        // This looks more like a year e.g. 2020
        if (match[0].match(/^\\s*\\d{4}\\s*$/)) {
            return null;
        }

        return super.extractPrimaryTimeComponents(context, match);
    }
}

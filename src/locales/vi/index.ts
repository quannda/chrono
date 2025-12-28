/**
 * Chrono components for Vietnamese support (*parsers*, *refiners*, and *configuration*)
 *
 * @module
 */

import { includeCommonConfiguration } from "../../configurations";
import { Chrono, Configuration, Parser, Refiner } from "../../chrono";
import { ParsingResult, ParsingComponents, ReferenceWithTimezone } from "../../results";
import { Component, ParsedResult, ParsingOption, ParsingReference, Meridiem, Weekday } from "../../types";
import SlashDateFormatParser from "../../common/parsers/SlashDateFormatParser";
import VIWeekdayParser from "./parsers/VIWeekdayParser";
import VITimeExpressionParser from "./parsers/VITimeExpressionParser";
import VIMergeDateTimeRefiner from "./refiners/VIMergeDateTimeRefiner";
import VIMergeDateRangeRefiner from "./refiners/VIMergeDateRangeRefiner";
import VIMergeCasualTimePeriodRefiner from "./refiners/VIMergeCasualTimePeriodRefiner";
import VIMonthNameLittleEndianParser from "./parsers/VIMonthNameLittleEndianParser";
import VICasualDateParser from "./parsers/VICasualDateParser";
import VICasualTimeParser from "./parsers/VICasualTimeParser";
import VITimeUnitsWithinParser from "./parsers/VITimeUnitsWithinParser";
import VIDayWithModifierParser from "./parsers/VIDayWithModifierParser";

export { Chrono, Parser, Refiner, ParsingResult, ParsingComponents, ReferenceWithTimezone };
export { Component, ParsedResult, ParsingOption, ParsingReference, Meridiem, Weekday };

// Shortcuts
export const casual = new Chrono(createCasualConfiguration());
export const strict = new Chrono(createConfiguration(true));

export function parse(text: string, ref?: ParsingReference | Date, option?: ParsingOption): ParsedResult[] {
    return casual.parse(text, ref, option);
}

export function parseDate(text: string, ref?: ParsingReference | Date, option?: ParsingOption): Date {
    return casual.parseDate(text, ref, option);
}

/**
 * @ignore (to be documented later)
 */
export function createCasualConfiguration(littleEndian = true): Configuration {
    const option = createConfiguration(false, littleEndian);
    option.parsers.push(new VICasualDateParser());
    option.parsers.push(new VICasualTimeParser());
    option.parsers.push(new VIDayWithModifierParser());
    return option;
}

/**
 * @ignore (to be documented later)
 */
export function createConfiguration(strictMode = true, littleEndian = true): Configuration {
    return includeCommonConfiguration(
        {
            parsers: [
                new SlashDateFormatParser(littleEndian),
                new VIWeekdayParser(),
                new VITimeExpressionParser(),
                new VIMonthNameLittleEndianParser(),
                new VITimeUnitsWithinParser(),
            ],
            refiners: [
                new VIMergeCasualTimePeriodRefiner(),
                new VIMergeDateTimeRefiner(),
                new VIMergeDateRangeRefiner(),
            ],
        },
        strictMode
    );
}

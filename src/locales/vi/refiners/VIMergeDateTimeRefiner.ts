import AbstractMergeDateTimeRefiner from "../../../common/refiners/AbstractMergeDateTimeRefiner";

/**
 * Merging date-only result and time-only result (see. AbstractMergeDateTimeRefiner).
 */
export default class VIMergeDateTimeRefiner extends AbstractMergeDateTimeRefiner {
    patternBetween(): RegExp {
        return new RegExp("^\\s*(?:,|vào|vao|lúc|luc)?\\s*$");
    }
}

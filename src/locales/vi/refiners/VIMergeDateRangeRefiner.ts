import AbstractMergeDateRangeRefiner from "../../../common/refiners/AbstractMergeDateRangeRefiner";

/**
 * Merging before and after results (see. AbstractMergeDateRangeRefiner)
 */
export default class VIMergeDateRangeRefiner extends AbstractMergeDateRangeRefiner {
    patternBetween(): RegExp {
        return /^\s*(?:-|đến|den|tới|toi)\s*$/i;
    }
}

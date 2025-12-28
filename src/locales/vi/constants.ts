export const WEEKDAY_DICTIONARY: { [word: string]: number } = {
    "chủ nhật": 0,
    "cn": 0,
    "thứ hai": 1,
    "thứ 2": 1,
    "t2": 1,
    "thứ ba": 2,
    "thứ 3": 2,
    "t3": 2,
    "thứ tư": 3,
    "thứ 4": 3,
    "t4": 3,
    "thứ năm": 4,
    "thứ 5": 4,
    "t5": 4,
    "thứ sáu": 5,
    "thứ 6": 5,
    "t6": 5,
    "thứ bảy": 6,
    "thứ bẩy": 6,
    "thứ 7": 6,
    "t7": 6,
};

export const MONTH_DICTIONARY: { [word: string]: number } = {
    "tháng 1": 1,
    "tháng 01": 1,
    "tháng một": 1,
    "tháng giêng": 1,
    "tháng 2": 2,
    "tháng 02": 2,
    "tháng hai": 2,
    "tháng 3": 3,
    "tháng 03": 3,
    "tháng ba": 3,
    "tháng 4": 4,
    "tháng 04": 4,
    "tháng bốn": 4,
    "tháng tư": 4,
    "tháng 5": 5,
    "tháng 05": 5,
    "tháng năm": 5,
    "tháng 6": 6,
    "tháng 06": 6,
    "tháng sáu": 6,
    "tháng 7": 7,
    "tháng 07": 7,
    "tháng bảy": 7,
    "tháng bẩy": 7,
    "tháng 8": 8,
    "tháng 08": 8,
    "tháng tám": 8,
    "tháng 9": 9,
    "tháng 09": 9,
    "tháng chín": 9,
    "tháng 10": 10,
    "tháng mười": 10,
    "tháng 11": 11,
    "tháng mười một": 11,
    "tháng 12": 12,
    "tháng mười hai": 12,
};

export const INTEGER_WORD_DICTIONARY: { [word: string]: number } = {
    "một": 1,
    "hai": 2,
    "ba": 3,
    "bốn": 4,
    "năm": 5,
    "sáu": 6,
    "bảy": 7,
    "bẩy": 7,
    "tám": 8,
    "chín": 9,
    "mười": 10,
    "mười một": 11,
    "mười hai": 12,
};

export const YEAR_PATTERN = "[0-9]{1,4}(?![^\\s]\\d)";

export function parseYear(match: string): number {
    if (match.match(/^[0-9]{1,4}$/)) {
        let yearNumber = parseInt(match);
        if (yearNumber < 100) {
            if (yearNumber > 50) {
                yearNumber = yearNumber + 1900;
            } else {
                yearNumber = yearNumber + 2000;
            }
        }
        return yearNumber;
    }

    return parseInt(match);
}

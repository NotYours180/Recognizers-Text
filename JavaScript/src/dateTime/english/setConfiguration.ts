import { ISetExtractorConfiguration, ISetParserConfiguration } from "../baseSet"
import { BaseDateExtractor, BaseDateParser } from "../baseDate";
import { BaseTimeExtractor, BaseTimeParser } from "../baseTime";
import { BaseDatePeriodExtractor, BaseDatePeriodParser } from "../baseDatePeriod";
import { BaseTimePeriodExtractor, BaseTimePeriodParser } from "../baseTimePeriod";
import { BaseDateTimeExtractor, BaseDateTimeParser } from "../baseDateTime";
import { BaseDateTimePeriodExtractor, BaseDateTimePeriodParser } from "../baseDateTimePeriod";
import { BaseDurationExtractor, BaseDurationParser } from "../baseDuration"
import { RegExpUtility } from "../../utilities";
import { EnglishDateTime } from "../../resources/englishDateTime";
import { ICommonDateTimeParserConfiguration } from "../parsers"
import { EnglishDurationExtractorConfiguration } from "./durationConfiguration"
import { EnglishTimeExtractorConfiguration } from "./timeConfiguration"
import { EnglishDateExtractorConfiguration } from "./dateConfiguration"
import { EnglishDateTimeExtractorConfiguration } from "./dateTimeConfiguration"
import { EnglishTimePeriodExtractorConfiguration } from "./timePeriodConfiguration"
import { EnglishDatePeriodExtractorConfiguration } from "./datePeriodConfiguration"
import { EnglishDateTimePeriodExtractorConfiguration } from "./dateTimePeriodConfiguration"

export class EnglishSetExtractorConfiguration implements ISetExtractorConfiguration {
    readonly lastRegex: RegExp;
    readonly eachPrefixRegex: RegExp;
    readonly periodicRegex: RegExp;
    readonly eachUnitRegex: RegExp;
    readonly eachDayRegex: RegExp;
    readonly beforeEachDayRegex: RegExp;
    readonly setWeekDayRegex: RegExp;
    readonly setEachRegex: RegExp;
    readonly durationExtractor: BaseDurationExtractor;
    readonly timeExtractor: BaseTimeExtractor;
    readonly dateExtractor: BaseDateExtractor;
    readonly dateTimeExtractor: BaseDateTimeExtractor;
    readonly datePeriodExtractor: BaseDatePeriodExtractor;
    readonly timePeriodExtractor: BaseTimePeriodExtractor;
    readonly dateTimePeriodExtractor: BaseDateTimePeriodExtractor;

    constructor() {
        this.durationExtractor = new BaseDurationExtractor(new EnglishDurationExtractorConfiguration());
        this.timeExtractor = new BaseTimeExtractor(new EnglishTimeExtractorConfiguration());
        this.dateExtractor = new BaseDateExtractor(new EnglishDateExtractorConfiguration());
        this.dateTimeExtractor = new BaseDateTimeExtractor(new EnglishDateTimeExtractorConfiguration());
        this.datePeriodExtractor = new BaseDatePeriodExtractor(new EnglishDatePeriodExtractorConfiguration());
        this.timePeriodExtractor = new BaseTimePeriodExtractor(new EnglishTimePeriodExtractorConfiguration());
        this.dateTimePeriodExtractor = new BaseDateTimePeriodExtractor(new EnglishDateTimePeriodExtractorConfiguration());
        this.lastRegex = RegExpUtility.getSafeRegExp(EnglishDateTime.SetLastRegex)
        this.eachPrefixRegex = RegExpUtility.getSafeRegExp(EnglishDateTime.EachPrefixRegex)
        this.periodicRegex = RegExpUtility.getSafeRegExp(EnglishDateTime.PeriodicRegex)
        this.eachUnitRegex = RegExpUtility.getSafeRegExp(EnglishDateTime.EachUnitRegex)
        this.eachDayRegex = RegExpUtility.getSafeRegExp(EnglishDateTime.EachDayRegex)
        this.setWeekDayRegex = RegExpUtility.getSafeRegExp(EnglishDateTime.SetWeekDayRegex)
        this.setEachRegex = RegExpUtility.getSafeRegExp(EnglishDateTime.SetEachRegex)
        this.beforeEachDayRegex = null;
    }
}

export class EnglishSetParserConfiguration implements ISetParserConfiguration {
    readonly durationExtractor: BaseDurationExtractor;
    readonly durationParser: BaseDurationParser;
    readonly timeExtractor: BaseTimeExtractor;
    readonly timeParser: BaseTimeParser;
    readonly dateExtractor: BaseDateExtractor;
    readonly dateParser: BaseDateParser;
    readonly dateTimeExtractor: BaseDateTimeExtractor;
    readonly dateTimeParser: BaseDateTimeParser;
    readonly datePeriodExtractor: BaseDatePeriodExtractor;
    readonly datePeriodParser: BaseDatePeriodParser;
    readonly timePeriodExtractor: BaseTimePeriodExtractor;
    readonly timePeriodParser: BaseTimePeriodParser;
    readonly dateTimePeriodExtractor: BaseDateTimePeriodExtractor;
    readonly dateTimePeriodParser: BaseDateTimePeriodParser;
    readonly unitMap: ReadonlyMap<string, string>;
    readonly eachPrefixRegex: RegExp;
    readonly periodicRegex: RegExp;
    readonly eachUnitRegex: RegExp;
    readonly eachDayRegex: RegExp;
    readonly setWeekDayRegex: RegExp;
    readonly setEachRegex: RegExp;

    constructor(config: ICommonDateTimeParserConfiguration) {
        this.durationExtractor = config.durationExtractor;
        this.timeExtractor = config.timeExtractor;
        this.dateExtractor = config.dateExtractor;
        this.dateTimeExtractor = config.dateTimeExtractor;
        this.datePeriodExtractor = config.datePeriodExtractor;
        this.timePeriodExtractor = config.timePeriodExtractor;
        this.dateTimePeriodExtractor = config.dateTimePeriodExtractor;

        this.durationParser = config.durationParser;
        this.timeParser = config.timeParser;
        this.dateParser = config.dateParser;
        this.dateTimeParser = config.dateTimeParser;
        this.datePeriodParser = config.datePeriodParser;
        this.timePeriodParser = config.timePeriodParser;
        this.dateTimePeriodParser = config.dateTimePeriodParser;
        this.unitMap = config.unitMap;

        this.eachPrefixRegex = RegExpUtility.getSafeRegExp(EnglishDateTime.EachPrefixRegex);
        this.periodicRegex = RegExpUtility.getSafeRegExp(EnglishDateTime.PeriodicRegex);
        this.eachUnitRegex = RegExpUtility.getSafeRegExp(EnglishDateTime.EachUnitRegex);
        this.eachDayRegex = RegExpUtility.getSafeRegExp(EnglishDateTime.EachDayRegex);
        this.setWeekDayRegex = RegExpUtility.getSafeRegExp(EnglishDateTime.SetWeekDayRegex);
        this.setEachRegex = RegExpUtility.getSafeRegExp(EnglishDateTime.SetEachRegex);
    }

    public getMatchedDailyTimex(text: string): { matched: boolean, timex: string } {
        let timex = "";
        let trimmedText = text.trim().toLowerCase();
        if (trimmedText === "daily") {
            timex = "P1D";
        }
        else if (trimmedText === "weekly") {
            timex = "P1W";
        }
        else if (trimmedText === "biweekly") {
            timex = "P2W";
        }
        else if (trimmedText === "monthly") {
            timex = "P1M";
        }
        else if (trimmedText === "yearly" || trimmedText === "annually" || trimmedText === "annual") {
            timex = "P1Y";
        }
        else {
            timex = null;
            return { matched: false, timex: timex };
        }
        return { matched: true, timex: timex };
    }

    public getMatchedUnitTimex(text: string): { matched: boolean, timex: string } {
        let timex = "";
        let trimmedText = text.trim().toLowerCase();
        if (trimmedText === "day") {
            timex = "P1D";
        }
        else if (trimmedText === "week") {
            timex = "P1W";
        }
        else if (trimmedText === "month") {
            timex = "P1M";
        }
        else if (trimmedText === "year") {
            timex = "P1Y";
        }
        else {
            timex = null;
            return { matched: false, timex: timex };
        }

        return { matched: true, timex: timex };
    }
}

export type Config = {
  site_title: string;
  avalanche_message: string;
  lessons: Lesson[];
};

export type Lesson = {
  name: string;
  start: string;
  end: string;
};

export function cleanConfig(prefs: Record<string, any>): Config {
  return {
    site_title: prefs.site_title ?? "",
    avalanche_message: prefs.avalanche_message ?? "",
    lessons: prefs.weeks.map((week: Record<string, any>) => ({
      name: week.topic ?? "",
      start: week.start.$date ?? "",
      end: week.end.$date ?? "",
    })),
  };
}

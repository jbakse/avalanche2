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
  let prefs0 = prefs[0];

  return {
    site_title: prefs0.site_title ?? "",
    avalanche_message: prefs0.avalanche_message ?? "",
    lessons: prefs0.weeks.map((week: Record<string, any>) => ({
      name: week.topic ?? "",
      start: week.start.$date ?? "",
      end: week.end.$date ?? "",
    })),
  };
}

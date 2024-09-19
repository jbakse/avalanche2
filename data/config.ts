import { Post, getPosts } from "./posts";

export type Config = {
  site_title: string;
  avalanche_message: string;
  weeks: Week[];
};

export type Week = {
  lesson: string;
  sketchCount: number;
  start: string;
  end: string;
};

export function cleanConfig(prefs: Record<string, any>, posts: Post[]): Config {
  return {
    site_title: prefs.site_title ?? "",
    avalanche_message: prefs.avalanche_message ?? "",
    weeks: prefs.weeks.map((week: Record<string, any>) => ({
      lesson: week.topic ?? "",
      sketchCount: getPosts(posts, undefined, week.topic).length,
      start: week.start.$date ?? "",
      end: week.end.$date ?? "",
    })),
  };
}
// export const prefsClean: Prefs = {
//   site_title: prefs.site_title ?? "",
//   avalanche_message: prefs.avalanche_message ?? "",
//   weeks: prefs.weeks.map((week: Record<string, any>) => ({
//     lesson: week.topic ?? "",
//     sketchCount: cleanPosts.filter((post) => post.lesson === week.topic).length,
//     start: week.start.$date ?? "",
//     end: week.end.$date ?? "",
//   })),
// };

this is kind of a mess right now
i'm learning storybook as i'm making this and figuring out
where to put types, examples, stories, etc

i'm also making code that converts the raw mongo dump to
a better more usable format.

Right now i'm focusing on posts.

I want to

1. define PostData type and subtypes
2. create a canonical example
3. crate code that converts the mongo into the new format
4. decide if that should run realtime or preprocess
5. create a storybook story that uses the converted data
6. clean it all up

Proably User and Post types should live in /data and be imported
by components that need them (rather than current viceversa)

Probably should move cloudinary specific lookups to /data like User getHeadshot

import z from "zod";

export const createMovieSchema = z.object({
  body: z.object({
    title: z
      .string({
        message: "Title is required and it should be a string",
      })
      .min(1, "Title cannot be empty")
      .trim(),

    genre: z
      .string({
        message: "Title is required and it should be a string",
      })
      .min(2, "Genre should be atleast 2 characters long")
      .trim(),

    releasedYear: z
      .number({
        message: "Released year is required and should be a number",
      })
      .int("Released year should be an integer")
      .min(1888, "Released year should be a valid year")
      .max(
        new Date().getFullYear() + 5,
        "Released year should not be in the future",
      ),
  }),
});
export type createMoviInput = z.infer<typeof createMovieSchema>;

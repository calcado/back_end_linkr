import joi from "joi";

export const timeline_post_schema = joi.object({
    userid: joi.number().required(),
    url: joi.string().required().min(6),
    description: joi.string()
});

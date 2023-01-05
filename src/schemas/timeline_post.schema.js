import joi from "joi";

export const timeline_post_schema = joi.object({
    user: joi.string().required().min(3),
    url: joi.string().required().min(6),
    text: joi.string().min(2)
});

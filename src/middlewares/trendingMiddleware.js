import trendRepository from "../repositories/trendingRepository.js";

export async function trendingValidation(req, res, next) {
    const { hashtag } = req.params;

    const { id } =
        (await trendRepository.findHashtag(hashtag)) !== undefined &&
        trendRepository.findHashtag(hashtag);

    if (!id) {
        return res.status(404).send({ message: "Hashtag não encontrada!" });
    }

    req.hashtagId = id;

    next();
}

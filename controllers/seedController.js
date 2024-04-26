const {Seed, validate} = require('../models/seed');

const addSeed = async (req, res, next) => {
    const {error} = validate(req.body);
    if(error) return res.status(422).send(error.details[0].message);

    let seed = new Seed({
        _id: req.body._id,
        Seed_RepDate: req.body.Seed_RepDate,
        Seed_Year: req.body.Seed_Year,
        Seeds_YearWeek: req.body.Seeds_YearWeek,
        Seed_Varity: req.body.Seed_Varity,
        Seed_RDCSD: req.body.Seed_RDCSD,
        Seed_Stock2Sale: req.body.Seed_Stock2Sale,
        Seed_Season: req.body.Seed_Season,
        Seed_Crop_Year: req.body.Seed_Crop_Year
    });

    seed = await seed.save();
    res.send(seed);
}

const getSeeds = async (req, res, next) => {
    const seeds = await Seed.find().sort('_id').exec();
    res.send(seeds);
}

const getSeed = async (req, res, next) => {
    try {
        const seed = await Seed.findById(req.params._id);
        if (!seed) return res.status(404).send('The Seed with the given id was not found');
        res.send(seed);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}

const updateSeed = async (req, res, next) => {
    const { error } = validate(req.body);
    if (error) return res.status(422).send(error.detials[0].message);

    let seed = await Seed.findByIdAndUpdate(
        req.params._id,
        {
            $set: {
                Seed_RepDate: req.body.Seed_RepDate,
                Seed_Year: req.body.Seed_Year,
                Seeds_YearWeek: req.body.Seeds_YearWeek,
                Seed_Varity: req.body.Seed_Varity,
                Seed_RDCSD: req.body.Seed_RDCSD,
                Seed_Stock2Sale: req.body.Seed_Stock2Sale,
                Seed_Season: req.body.Seed_Season,
                Seed_Crop_Year: req.body.Seed_Crop_Year
            }
        },
        { new: true }
    );

    if (!seed) return res.status(404).send('The Seed with the given id was not found');
    res.send(seed);
}

const deleteSeed = async (req, res, next) => {
    try {
        const seed = await Seed.findByIdAndDelete(req.params._id);
        if (!seed) return res.status(404).send('The Seed with the given id was not found');
        res.send(seed);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    addSeed,
    getSeeds,
    getSeed,
    updateSeed,
    deleteSeed
}
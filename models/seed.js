const mongoose = require('mongoose');
const Joi = require('joi');

const seedSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    }, 
    Seed_RepDate: {
        type: String,
        required: true
    },
    Seed_Year: {
        type: String,
        required: true
    },
    Seeds_YearWeek: {
        type: String,
        required: true
    },
    Seed_Varity: {
        type: String,
        required: true
    },
    Seed_RDCSD: {
        type: String,
        required: true
    },
    Seed_Stock2Sale: {
        type: String,
        required: true
    },
    Seed_Season: {
        type: String,
        required: true
    },
    Seed_Crop_Year: {
        type: String,
        required: true
    }
});

const Seed = mongoose.model('Seed', seedSchema);

const validate = (seed) => {
    const schema = {
        _id: Joi.string().required(),
        Seed_RepDate: Joi.string().required(),
        Seed_Year: Joi.string().required(),
        Seeds_YearWeek: Joi.string().required(),
        Seed_Varity: Joi.string().required(),
        Seed_RDCSD: Joi.string().required(),
        Seed_Stock2Sale: Joi.string().required(),
        Seed_Season: Joi.string().required(),
        Seed_Crop_Year: Joi.string().required()
    }

    return Joi.object(schema).validate(seed);
}

exports.Seed = Seed;
exports.validate = validate;

const instruments = require("../storage/instrument-storage.js")

exports.getPercussions = async () => {
    let _instr = await instruments.getInstrumentInfo();
    return _instr.filter(instrument => instrument.category == 'percussion')
    .map(instrument => [instrument.name, instrument.cost, instrument.creatorId, instrument.instrumentId]);
}

exports.getWinds = async () => {
    let _instr = await instruments.getInstrumentInfo();
    return _instr.filter(instrument => instrument.category == 'wind')
    .map(instrument => [instrument.name, instrument.cost, instrument.creatorId, instrument.instrumentId]);
}

exports.getStrings = async () => {
    let _instr = await instruments.getInstrumentInfo();
    return _instr.filter(instrument => instrument.category == 'string')
    .map(instrument => [instrument.name, instrument.cost, instrument.creatorId, instrument.instrumentId]);
}

exports.getKeyboards = async () => {
    let _instr = await instruments.getInstrumentInfo();
    return _instr.filter(instrument => instrument.category == 'keyboard')
    .map(instrument => [instrument.name, instrument.cost, instrument.creatorId, instrument.instrumentId]);
}

exports.getALL =  async() =>{
    return{
        percussions : await this.getPercussions(),
        winds: await this.getWinds(),
        strings: await this.getStrings(),
        keyboards : await this.getKeyboards(),
    };
}
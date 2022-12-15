const instruments = require("../storage/instrument-storage.js");

// 각 악기 정보 제공.
exports.getClassification = async () => {
    let getPercussions = await instruments.getInstrumentInfo();
    let getWinds = await instruments.getInstrumentInfo();
    let getStrings = await instruments.getInstrumentInfo();
    let getKeyboards = await instruments.getInstrumentInfo();

    return {
        percussions: await getPercussions.filter(instrument => instrument.category == 'percussion')
            .map(instrument => [instrument.name, instrument.cost, instrument.creatorId, instrument.instrumentId]),
        winds: await getWinds.filter(instrument => instrument.category == 'wind')
            .map(instrument => [instrument.name, instrument.cost, instrument.creatorId, instrument.instrumentId]),
        strings: await getStrings.filter(instrument => instrument.category == 'string')
            .map(instrument => [instrument.name, instrument.cost, instrument.creatorId, instrument.instrumentId]),
        keyboards: await getKeyboards.filter(instrument => instrument.category == 'keyboard')
            .map(instrument => [instrument.name, instrument.cost, instrument.creatorId, instrument.instrumentId]),
    };
};

// 모든 악기 제공.
exports.getAll = async () => {
    return await instruments.getAllInstrumentInfo();
}

// 해당 아이디 악기 제공.
exports.getTartget = async (instrumentId) => {
    return await instruments.getTargetInstrumentInfo(instrumentId);
}

// 악기 모든 정보 업데이트 제공
exports.updateAll = async (updateCount, instrumentId) => {
    return await instruments.updateInstrumentInfo(updateCount, instrumentId);
}

// 악기 개수 업데이트 제공.
exports.updateCount = async (count, instrumentId) => {
    await instruments.updateCount(count, instrumentId)
};

// 악기 정보 (중복 확인)
exports.duplicateCheck = async (name, cost, userId) => {
    return instruments.getInstrumentInfoForDuplicateCheck(name, cost, userId)
};

// 악기 생성
exports.createInstrument = async (name, cost, category, count, content, userId) => {
    await instruments.createInstrument(name, cost, category, count, content, userId);
};

// 악기 삭제
exports.destroyInstrument = async (instrumentId) => {
    return await instruments.destroyInstrument(instrumentId);
}
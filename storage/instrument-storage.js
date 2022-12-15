const { Instrument } = require('../models');                                            // mainPage로 접근하는 경로가
// 일반권한 , 로그인, 관리가 각각이므로 이들을 위한 함수를 제공한다.

// 모든 악기 정보 가져오기
exports.getAllInstrumentInfo = () => Instrument.findAll({});

// 악기 정보 가져오기 
exports.getInstrumentInfo = () => Instrument.findAll({
    attributes: ['instrumentId', 'name', 'cost', 'category', 'creatorId']
});

// 해당 아이디 악기 정보 가져오기
exports.getTargetInstrumentInfo = (instrumentId) => Instrument.findOne({
    where: { instrumentId: instrumentId || null }
});

// 악기 정보 가져오기 (중복 체크)
exports.getInstrumentInfoForDuplicateCheck = (name, cost, userId) => Instrument.findOne({
    where: {
        name: name,
        cost: cost,
        creatorId: userId,
    }
});

// 악기 정보 업데이트 (수정된 정보만)
exports.updateInstrumentInfo = (updateContext, instrumentId) => Instrument.update(
    updateContext,
    {
        where: { instrumentId: instrumentId }
    });

// 악기 정보 업데이트 (count만)
exports.updateCount = (increase, instrumentId) => Instrument.update(
    {
        count: increase
    },
    {
        where:
        {
            instrumentId: instrumentId
        }
    });

// 악기 생성
exports.createInstrument = (name, cost, category, count, content, userId) => Instrument.create({
    name: name,
    cost: cost,
    category: category,
    count: count,
    description: content,
    creatorId: userId,
});

// 악기 삭제
exports.destroyInstrument = (instrumentId) => Instrument.destroy({
    where: { instrumentId: instrumentId }
});

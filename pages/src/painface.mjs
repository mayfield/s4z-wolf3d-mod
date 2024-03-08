import * as common from '/pages/src/common.mjs';

common.settingsStore.setDefault({
    painSource: 'wbal',
});
const settings = common.settingsStore.get();

const faces = [
    ['0-a'],
    ['1-a', '1-b', '1-c'],
    ['2-a', '2-b', '2-c'],
    ['3-a', '3-b', '3-c'],
    ['4-a', '4-b', '4-c'],
    ['5-a', '5-b', '5-c'],
    ['6-a', '6-b', '6-c'],
    ['7-a', '7-b', '7-c'],
    ['8-a']
];


function faceImage(painLevel) {
    const level = faces[Math.min(faces.length - 1, Math.round(faces.length * painLevel))];
    return `images/sprite/${level[level.length * Math.random() | 0]}.webp`;
    
}

export async function main() {
    common.initInteractionListeners();
    const face = document.querySelector('img#painface');
    face.src = faceImage(0);
    let maxHR = 140;
    common.subscribe('athlete/watching', ad => {
        let level;
        const painSource = settings.painSource;
        if (painSource === 'wbal') {
            level = 1 - (ad.wBal / ad.athlete.wPrime);
        } else if (painSource === 'hr') {
            maxHR = Math.max(maxHR, ad.state.heartrate);
            level = ad.state.heartrate / maxHR;
        } else if (painSource === 'power') {
            level = ad.state.power / 1000;
        }
        console.log({painSource, level});
        face.src = faceImage(level || 0);
    });
}


export async function settingsMain() {
    common.initInteractionListeners();
    await common.initSettingsForm('form')();
}

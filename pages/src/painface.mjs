import * as common from '/pages/src/common.mjs';

common.settingsStore.setDefault({
    painSource: 'wbal',
});
const settings = common.settingsStore.get();
const H = sauce.locale.human;

const ext = 'webp';
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

export async function main() {
    common.initInteractionListeners();
    console.log("Sauce Version:", await common.rpc.getVersion());
}


export async function settingsMain() {
    common.initInteractionListeners();
    await common.initSettingsForm('form')();
}

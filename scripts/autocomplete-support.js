export class AutocompleteSupport{
    static initialize(){
        Hooks.on("aipSetup", (packageConfig) => {
            const api = game.modules.get("autocomplete-inline-properties").API;
            const DATA_MODE = api.CONST.DATA_MODE;
            let config = {
                packageName: "osric",
                sheetClasses: [
                    AutocompleteSupport.createActiveEffectConfigSheetInfo(DATA_MODE),
                    AutocompleteSupport.createActionSheetInfo(DATA_MODE)
                ]
            };
        
            // Add our config
            packageConfig.push(config);
        });
    }

    static createActionSheetInfo(DATA_MODE){
        return {
            name: "ActionSheet", 
            fieldConfigs: [
                {
                    selector: `input[type="text"]`, // TODO: narrow this down
                    showButton: true,
                    allowHotkey: true,
                    dataMode: DATA_MODE.CUSTOM, 
                    customDataGetter: AutocompleteSupport.getEffectFields
                }
            ]
        };
    }

    static createActiveEffectConfigSheetInfo(DATA_MODE){
        return {
            name: "ActiveEffectConfig", 
            fieldConfigs: [
                {
                    selector: `input[type="text"]`, // TODO: narrow this down
                    showButton: true,
                    allowHotkey: true,
                    dataMode: DATA_MODE.CUSTOM, 
                    customDataGetter: AutocompleteSupport.getEffectFields
                }
            ]
        };
    }

    static getEffectFields(sheet){
        let fields = {
            data: {
                mods: {
                    ac:{
                        value: null,
                        base: null,
                        front: { 
                            value: null,
                            melee: null,
                            ranged: null
                        },
                        rear: { 
                            value: null,
                            melee: null,
                            ranged: null
                        },
                        melee: {
                            value: null,
                            base: null
                        },
                        ranged: {
                            value: null,
                            base: null
                        }
                    },
                    saves: AutocompleteSupport.getSaveModFields(),
                    checks: {
                        all: null
                    },
                    attack: {
                        value: null,
                        melee: null,
                        ranged: null
                    },
                    damage: {
                        value: null,
                        melee: null,
                        ranged: null,
                        multiplier: {
                            value: null,
                            melee: null,
                            ranged: null,
                            thrown: null
                        }
                    },
                    heal: {
                        value: null,
                        regen: null,
                        multiplier: null
                    },
                    init: {
                        value: null
                    },
                    turn: {
                        value: null,
                        rank: null
                    },
                    levels: { 
                        arcane: null,
                        divine: null,
                        CLASSNAME: null // TODO: would be cool to be able to figure this out.
                    },
                    resist: null,
                    immune: null,
                    vuln: null,
                    resists: AutocompleteSupport.getResistsFields(),
                    skill:{
                        'SKILL-NAME': null
                    }

                },
                attributes: {
                    hp: {
                        base: null
                    },
                    movement: {
                        value: null
                    }
                },
                abilities: AutocompleteSupport.getAbilitiesFields(),
                spellInfo:{
                    slots: AutocompleteSupport.getSpellSlotFields()
                }
            },
            target: AutocompleteSupport.getTargetSourceFields(),
            source: AutocompleteSupport.getTargetSourceFields(),
            dmg: {
                ongoing: null
            },
            STONESKIN: null,
            MIRRORIMAGE: null,
            ABSORB: null,
            VISION: null,
            LIGHT: null
        };       

        return fields;
    }

    static getTargetSourceFields(){
        return {
            range: {
                attack: {
                    '#': null
                },
                damage: {
                    '#': null
                }
            },
            alignment: {
                attack: AutocompleteSupport.getAlignmentTypeFields(),
                damage: AutocompleteSupport.getAlignmentTypeFields()
            },
            type: {
                attack: {
                    CREATURETYPE: null
                },
                damage: {
                    CREATURETYPE: null
                }
            },
        };
    }

    static getAlignmentTypeFields(){
        let fields = {};
        
        let alignments = Object.keys(CONFIG.OSRIC.alignmentTypes);
        alignments.map(a => {
            fields[a] = null;
        });

        return fields;
    }

    static getResistsFields(){
        let fields = { perdice: {} };

        let damageTypes = Object.keys(CONFIG.OSRIC.weaponDamageTypes);
        damageTypes.map(d => {
            fields.perdice[d] = null;
            fields[d] = null;
        });
        
        return fields;
    }

    static getSaveModFields(){
        let fields = { all: null };
        let saveTypes = Object.keys(CONFIG.OSRIC.saveTypes);
        saveTypes.map(s => {
            fields[s] = null;
        });
        return fields;
    }

    static getAbilitiesFields(){
        let fields = {};

        let abilities = Object.keys(CONFIG.OSRIC.abilities);
        abilities.map(a => {
            fields[a] = {
                value: null,
                percent: null
            }
        });

        return fields;
    }

    static getSpellSlotFields(){
        let fields = {};

        let spellTypes = Object.keys(CONFIG.OSRIC.spellTypes);
        spellTypes.map(t => {
            fields[t] = {
                value: {
                    1: null,
                    2: null,
                    3: null,
                    4: null, 
                    5: null,
                    6: null,
                    7: null,
                    8: null,
                    9: null
                }
            }
        });

        return fields;
    }
}
const fs = require('fs');

const fragments = require("../functions/fragments.json");
const path = require('path');

const PRISM_COUNT = 20;

function main() {
    const tokens = [];
    fragments.forEach(frag => {
        const runeText = (frag.name === "Nebula Portal Fragment")
            ? [{
                "trait_type": "Arcane Rune",
                "value": frag.rune
            }]
            : []; 
        const nftData = {
            "token_id": frag.id,
            "name": frag.name,
            // "description": frag.rune,
            "image": `https://raw.githubusercontent.com/CryptishApps/tokens/main/metadata/${frag.id}.png`,
            "external_url": "https://nebula-portal.ethlizards.io",
            "animation_url": "",
            "youtube_url": "",
            "attributes": [
                ...runeText,
                {
                    "trait_type": "Rarity",
                    "value": frag.rarity
                },
                {
                    "trait_type": "Type",
                    "value": frag.type
                },
                {
                    "trait_type": "Product",
                    "value": frag.product
                }
            ]
        }
        tokens.push(nftData);
        fs.writeFile(path.join(__dirname, `metadata/${frag.id}.json`), JSON.stringify(nftData), (err) => err && console.error(err))
    });

    Array.from(Array(PRISM_COUNT).keys()).map(() => {
        const nftData = {
            "token_id": String(tokens.length),
            "name": "Ionium Prism",
            // "description": frag.rune,
            "image": `https://raw.githubusercontent.com/CryptishApps/tokens/main/metadata/prism.png`,
            "external_url": "https://nebula-portal.ethlizards.io",
            "animation_url": "",
            "youtube_url": "",
            "attributes": [
                {
                    "trait_type": "Rarity",
                    "value": `1/${PRISM_COUNT} Rare`
                },
                {
                    "trait_type": "Type",
                    "value": "Lizard Labs Artifacts"
                },
                {
                    "trait_type": "Product",
                    "value": "Battle In The Beyond Season 0"
                }
            ]
        }
        fs.writeFile(path.join(__dirname, `metadata/${String(tokens.length)}.json`), JSON.stringify(nftData), (err) => err && console.error(err))
        tokens.push(nftData);
    });

    fs.writeFile(path.join(__dirname, `tokens.json`), JSON.stringify(tokens), (err) => err && console.error(err))
}

main();
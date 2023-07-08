fx_version "adamant"

description "EYES Store"
author "! Raider#0101"
version '1.0.0'
repository 'https://discord.gg/EkwWvFS'

game "gta5"

client_script { 
"main/client.lua"
}

shared_script "main/shared.lua"

loadscreen 'index.html'
loadscreen_manual_shutdown 'yes'

files {
    'index.html',
    'vue.js',
    'assets/**/*.*',
    'assets/font/*.otf',  
    './sound/*.mp3',
    'dmx.jpg',
    'rte.jpg',
    'underground.jpg'
}


escrow_ignore { 'main/shared.lua' }

lua54 'yes'
-- dependency '/assetpacks'
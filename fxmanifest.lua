fx_version 'cerulean'
game 'gta5'
lua54 'yes'
use_experimental_fxv2_oal 'yes'

author 'Mirow'
description 'Choose a payment method!'
version '2.0.0'

client_scripts {
    'config.lua',
    'client.lua',
    'example.lua'
}

ui_page 'web/dist/index.html'
files {
    'web/dist/**'
}

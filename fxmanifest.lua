fx_version 'cerulean'
game 'gta5'
lua54 'yes'
use_experimental_fxv2_oal 'yes'

author 'Mirow'
description 'Choose a payment method!'
version '1.0.0'

client_scripts {
    'config.lua',
    'client.lua'
}

ui_page 'web/build/index.html'
files {
    'web/build/**'
}

local currentPaymentMethod
local function requestPaymentMethod(price)
    if currentPaymentMethod then return warn('Payment method window is already open!') end

    currentPaymentMethod = promise.new()

    SetNuiFocus(true, true)
    SendNUIMessage({
        action = 'paymentMethod:setPrice',
        data = price
    })

    return Citizen.Await(currentPaymentMethod)
end

RegisterNUICallback('init', function(_, cb)
    cb('ok')

    SendNUIMessage({
        action = 'setLocale',
        data = {
            ui = Config.locales
        }
    })
end)

RegisterNUICallback('paymentMethod:close', function(_, cb)
    cb('ok')
    if not currentPaymentMethod then return warn('Payment method window is not open!') end

    SetNuiFocus(false, false)
    SendNUIMessage({
        action = 'paymentMethod:setPrice',
        data = nil
    })

    currentPaymentMethod:resolve(false)
    currentPaymentMethod = nil
end)

RegisterNUICallback('paymentMethod:select', function(method, cb)
    cb('ok')
    if not currentPaymentMethod then return warn('Payment method window is not open!') end

    SetNuiFocus(false, false)
    SendNUIMessage({
        action = 'paymentMethod:setPrice',
        data = nil
    })

    currentPaymentMethod:resolve(method)
    currentPaymentMethod = nil
end)

exports('requestPaymentMethod', requestPaymentMethod)

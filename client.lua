local currentPaymentMethod
local function requestPaymentMethod(price)
    if currentPaymentMethod then return warn('Payment method window is already open!') end

    currentPaymentMethod = promise.new()

    SetNuiFocus(true, true)
    SendNUIMessage({
        action = 'setPaymentPrice',
        data = price
    })

    return Citizen.Await(currentPaymentMethod)
end

RegisterNUICallback('init', function(_, cb)
    cb('ok')

    SendNUIMessage({
        action = 'setConfiguration',
        data = Config.locales
    })
end)

RegisterNUICallback('cancelPayment', function(_, cb)
    cb('ok')
    if not currentPaymentMethod then return warn('Payment method window is not open!') end

    SetNuiFocus(false, false)

    currentPaymentMethod:resolve(false)
    currentPaymentMethod = nil
end)

RegisterNUICallback('selectPaymentMethod', function(method, cb)
    cb('ok')
    if not currentPaymentMethod then return warn('Payment method window is not open!') end

    SetNuiFocus(false, false)

    currentPaymentMethod:resolve(method)
    currentPaymentMethod = nil
end)

exports('requestPaymentMethod', requestPaymentMethod)

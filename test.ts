MP3.EM_MP3_pin_set(SerialPin.P1, SerialPin.P15)
MP3.EM_MP3_volume_set(50)
basic.forever(function () {
    MP3.EM_MP3_play_control(
    MP3.playType.Play
    )
    basic.pause(2000)
})

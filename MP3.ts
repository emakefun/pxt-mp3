/**
 *Obloq implementation method.
 */
//% weight=10 color=#7fcbcd icon="\uf001" block="MP3"
namespace MP3 {

    export enum playType {
        //% block="Play"
        Play = 0x01,
        //% block="Pause"
        Pause = 0x02,
        //% block="Next"
        Next = 0x03,
        //% block="Prev"
        Prev = 0x04,
        //% block="Stop"
        Stop = 0x0E,
        //% block="Add"
        Add = 0x05,
        //% block="Sub"
        Sub = 0x06
    }

    export enum EM_PlayMode {
        //% block="AllLoop"
        AllLoop = 0x00,
        //% block="FolderLoop"
        FolderLoop = 0x01,
        //% block="SingleLoop"
        SingleLoop = 0x02,
        //% block="RandomLoop"
        RandomLoop = 0x03,
        //% block="SinglePlay"
        SinglePlay = 0x04
    }
    
    export enum EM_PlayEQ {
        //% block="None"
        None = 0x00,
        //% block="Pop"
        Pop = 0x01,
        //% block="Rock"
        Rock = 0x02,
        //% block="Jazz"
        Jazz = 0x03,
        //% block="Classic"
        Classic = 0x04,
        //% block="Bass"
        Bass = 0x05
    }


    /**
     * Disconnect the serial port.
     * @param rx to rx ,eg: SerialPin.P1
     * @param tx to tx ,eg: SerialPin.P2
    */
    //% weight=100
    //% rx.fieldEditor="gridpicker" rx.fieldOptions.columns=3
    //% tx.fieldEditor="gridpicker" tx.fieldOptions.columns=3
    //% blockId="MP3_pin_set"
    //% blockGap=20
    //% block="MP3 pin set | receive data(rx): %rx | send data(tx): %tx"
    //% blockExternalInputs=true
    //% inlineInputMode=inline
    export function EM_MP3_pin_set(rx: SerialPin, tx: SerialPin): void {
        serial.redirect(
            tx,
            rx,
            BaudRate.BaudRate9600
        )
    } 

    /**
     * Disconnect the serial port.
     * @param type to type ,eg: playType.Play
    */
    //% weight=90
    //% type.fieldEditor="gridpicker" type.fieldOptions.columns=1
    //% blockId="MP3_play_control"
    //% blockGap=20
    //% block="MP3 play control %type"
    //% blockExternalInputs=true
    export function EM_MP3_play_control(type: playType): void {
        let buffer = pins.createBuffer(4);
        buffer.setNumber(NumberFormat.UInt8BE, 0, 0x7e)
        buffer.setNumber(NumberFormat.UInt8BE, 1, 0x02)
        buffer.setNumber(NumberFormat.UInt8BE, 2, type)
        buffer.setNumber(NumberFormat.UInt8BE, 3, 0xef)
        serial.writeBuffer(buffer)
    } 

    /**
     * Disconnect the serial port.
     * @param num to num ,eg: 1
    */
    //% weight=80
    //% num.min=1 num.max=65535
    //% blockGap=20
    //% blockId="MP3_assign_song"
    //% block="MP3 play list %num"
    export function EM_MP3_assign_song(num: number): void {
        num = num < 1 ? 1 : (num > 65535 ? 65535 : num)
        let buffer = pins.createBuffer(6);
        let num_h = (num>>8) & 0xFF
        let num_l = num & 0xFF

        buffer.setNumber(NumberFormat.UInt8BE, 0, 0x7e)
        buffer.setNumber(NumberFormat.UInt8BE, 1, 0x04)
        buffer.setNumber(NumberFormat.UInt8BE, 2, 0x41)
        buffer.setNumber(NumberFormat.UInt8BE, 3, num_h)
        buffer.setNumber(NumberFormat.UInt8BE, 4, num_l)
        buffer.setNumber(NumberFormat.UInt8BE, 5, 0xef)
        serial.writeBuffer(buffer)
    } 

    /**
     * Disconnect the serial port.
     * @param type to type ,eg: EM_PlayMode.AllLoop
    */
    //% weight=70
    //% type.fieldEditor="gridpicker" type.fieldOptions.columns=1
    //% blockGap=20
    //% blockId="MP3_play_type"
    //% block="MP3 play type %type"
    export function EM_MP3_play_type(type: EM_PlayMode): void {
        let buffer = pins.createBuffer(5);
        buffer.setNumber(NumberFormat.UInt8BE, 0, 0x7e)
        buffer.setNumber(NumberFormat.UInt8BE, 1, 0x03)
        buffer.setNumber(NumberFormat.UInt8BE, 2, 0x33)
        buffer.setNumber(NumberFormat.UInt8BE, 3, <number>type)
        buffer.setNumber(NumberFormat.UInt8BE, 4, 0xef)
        serial.writeBuffer(buffer)
    } 

    /**
     * Disconnect the serial port.
     * @param vol to vol ,eg: 70
    */
    //% weight=60
    //% vol.min=0 vol.max=100
    //% blockGap=20
    //% blockId="MP3_volume_set"
    //% block="MP3 set volume %vol"
    export function EM_MP3_volume_set(vol: number): void {
        vol = vol < 0 ? 0 : (vol > 100 ? 100 : vol)
        vol = (30 * vol) / 100

        let buffer = pins.createBuffer(5);
        buffer.setNumber(NumberFormat.UInt8BE, 0, 0x7e)
        buffer.setNumber(NumberFormat.UInt8BE, 1, 0x03)
        buffer.setNumber(NumberFormat.UInt8BE, 2, 0x31)
        buffer.setNumber(NumberFormat.UInt8BE, 3, <number>vol)
        buffer.setNumber(NumberFormat.UInt8BE, 4, 0xef)
        serial.writeBuffer(buffer)
    } 

    
    /**
     * Disconnect the serial port.
     * @param eq to eq ,eg: EM_PlayEQ.None
    */
    //% weight=30
    //% eq.fieldEditor="gridpicker" eq.fieldOptions.columns=1
    //% blockGap=20
    //% blockId="MP3_eq_set"
    //% block="MP3 set EQ %eq"
    export function EM_MP3_eq_set(eq: EM_PlayEQ): void {
        let buffer = pins.createBuffer(5);
        buffer.setNumber(NumberFormat.UInt8BE, 0, 0x7e)
        buffer.setNumber(NumberFormat.UInt8BE, 1, 0x03)
        buffer.setNumber(NumberFormat.UInt8BE, 2, 0x32)
        buffer.setNumber(NumberFormat.UInt8BE, 3, <number>eq)
        buffer.setNumber(NumberFormat.UInt8BE, 4, 0xef)
        serial.writeBuffer(buffer)
    } 

}
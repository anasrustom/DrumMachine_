import './index.css';
import React, { useState, useEffect, useCallback } from 'react'
import $ from 'jquery'

export default function App() {
  
  const [value, setValue] = useState('')

  let localBank = JSON.parse(localStorage.getItem('BANK'))
  if (localBank == null) {localBank = false}
  const [bank, setBank] = useState(localBank)

  let localPower = JSON.parse(localStorage.getItem('POWER'))
  if (localPower == null) {localPower = true}
  const [power, setPower] = useState(localPower)

  let localVolume = JSON.parse(localStorage.getItem('VOLUME'))
  if (localVolume == null) {localVolume = 0.7}
  const [volume, setVolume] = useState(localVolume)


  useEffect(()=>{localStorage.setItem('BANK', JSON.stringify(bank))}, [bank])
  useEffect(()=>{localStorage.setItem('POWER', JSON.stringify(power))}, [power])
  useEffect(()=>{localStorage.setItem('VOLUME', JSON.stringify(volume))}, [volume])

  const audios = [{
    keyCode: 81,
    text:'Q',
    name: 'Heater 1',
    src:'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    text:'W',
    name: 'Heater 2',
    src:'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    text:'E',
    name: 'Heater 3',
    src:'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    text:'A',
    name: 'Heater 4',
    src:'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    text:'S',
    name: 'Heater 6',
    src:'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    text:'D',
    name: 'Disco',
    src:'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    text:'Z',
    name: 'Kick n Hat',
    src:'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    text:'X',
    name: 'RP4',
    src:'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    text:'C',
    name: 'Cev',
    src:'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  },

]
const audiosBank = [{
  keyCode: 81,
  text:'Q',
  name: 'Chord 1',
  src:'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
},
{
  keyCode: 87,
  text:'W',
  name: 'Chord 2',
  src:'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
},
{
  keyCode: 69,
  text:'E',
  name: 'Chord 3',
  src:'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
},
{
  keyCode: 65,
  text:'A',
  name: 'Shaker',
  src:'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
},
{
  keyCode: 83,
  text:'S',
  name: 'Open HH',
  src:'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
},
{
  keyCode: 68,
  text:'D',
  name: 'Closed HH',
  src:'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
},
{
  keyCode: 90,
  text:'Z',
  name: 'Punchy Kick',
  src:'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
},
{
  keyCode: 88,
  text:'X',
  name: 'Side Stick',
  src:'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
},
{
  keyCode: 67,
  text:'C',
  name: 'Snare',
  src:'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
},

]
  function play(sound, name){
    if (power) {
      let csound = new Audio(sound)
      csound.volume = volume
      csound.play()
      setValue(prev => prev = name)
    
      if (bank === true && power === true){const clip = audiosBank.find((clip) => clip.name === name);
        $('#'+clip.keyCode).removeClass('drum-pad')
        $('#'+clip.keyCode).addClass('pressed')
        setTimeout(()=> {$('#'+clip.keyCode).removeClass('pressed')}, 100)
        setTimeout(()=> {$('#'+clip.keyCode).addClass('drum-pad')}, 100)
        }
      else if (bank === false && power === true) {const clip = audios.find((clip) => clip.name === name);
        $('#'+clip.keyCode).removeClass('drum-pad')
        $('#'+clip.keyCode).addClass('pressed')
        setTimeout(()=> {$('#'+clip.keyCode).removeClass('pressed')}, 100)
        setTimeout(()=> {$('#'+clip.keyCode).addClass('drum-pad')}, 100)}
      }
    if (!power) return;
  }

  function handlePower() {
    setPower(prev => prev = !power)
    setValue('')

  }

  function handleBank() {
    setBank(prev => prev = !bank)
    if(bank) {
      setValue(prev => prev = 'Heater Kit')
    }
    else {
      setValue(prev => prev = 'Smooth Piano Kit')
    }  

  }
 
  
  
  function handleVolume(e){
    if (power) {setVolume(e.target.value)
      setValue("Volume: " + Math.round(100 * e.target.value));
      setTimeout(() => {
        setValue('')
      }, 1000);
      }
  }

  
  const handleKey = useCallback((e)=>{
    const letter = e.which  // Gets key code
    if (power){               // if the drum machine is on 
      if(bank === true) {const clip = audiosBank.find((clip) => clip.keyCode === letter); // bank is the second audio set
        if (!clip) return;    // clip eg: {keycode: x, letter: x, name: x, src: x}
        let csound = new Audio(clip.src)
        csound.volume = volume  // Volume is a useState connected to a input element with type range
        csound.play()
        setValue(prev => prev = clip.name)  // Displays the audio name
        $('#'+clip.keyCode).removeClass('drum-pad')
        $('#'+clip.keyCode).addClass('pressed')
        setTimeout(()=> {$('#'+clip.keyCode).removeClass('pressed')}, 100)
        setTimeout(()=> {$('#'+clip.keyCode).addClass('drum-pad')}, 100)}
      
      if(bank === false) {const clip = audios.find((clip) => clip.keyCode === letter); // bank is the second audio set
        if (!clip) return;    // clip eg: {keycode: x, letter: x, name: x, src: x}
        let csound = new Audio(clip.src)
        csound.volume = volume  // Volume is a useState connected to a input element with type range
        csound.play()
        setValue(prev => prev = clip.name)  // Displays the audio name
        $('#'+clip.keyCode).removeClass('drum-pad')
        $('#'+clip.keyCode).addClass('pressed')
        setTimeout(()=> {$('#'+clip.keyCode).removeClass('pressed')}, 100)
        setTimeout(()=> {$('#'+clip.keyCode).addClass('drum-pad')}, 100)}
}
  },[audios, audiosBank, bank, power, volume])

  useEffect(()=>{
    document.addEventListener('keydown',handleKey)
    return () => document.removeEventListener('keydown', handleKey);
  }, [bank, power, volume, handleKey])



    
  return (
    <div className='bop' >
      <div id='drum-machine'>
      <div className='keys-container'>
      {bank ?<div className='drum-pads'> {audiosBank.map((drum) => <div className='drum-pad' id={drum.keyCode} key={drum.src} onClick={() => play(drum.src, drum.name)}>{drum.text} <audio className='audioclip' src={drum.src} id={drum.text}></audio></div>)}</div>
:  <div className='drum-pads'> {audios.map((drum) => <div className='drum-pad' id={drum.keyCode}  key={drum.src} onClick={() => play(drum.src, drum.name)}>{drum.text} <audio className='audioclip' src={drum.src} id={drum.text}></audio></div>)}</div>}
      
      </div>
      <div className='controls-container'>
      <h1>Drum Machine</h1>
      <div className="control">
        <p>Power</p>
        <div className="select">
          {power ? <div className="inner" onClick={() => handlePower()} style={{float: 'right', backgroundColor: 'rgb(42, 245, 42)'}}></div> : <div className="inner" onClick={() => handlePower()} style={{float: 'left', backgroundColor: 'red'}}></div>}
        </div></div>
        <div id='display'>{value}</div>
        <div className='volume'>
          <input className='slider' max="1" min="0" step="0.01" type="range"  value={volume} onChange={(e)=>handleVolume(e)}/>
        </div>
        <div className="control">
        <p>Bank</p>
        <div className="select">
          {power ? bank ? <div className="inner" onClick={() => handleBank()} style={{float: 'right', backgroundColor: 'rgb(42, 245, 42)'}}></div> : <div className="inner" onClick={() => handleBank()} style={{float: 'left', backgroundColor: 'red'}}></div> : <div className="inner" style={{backgroundColor: 'gray', float: 'middle', transition: 'ease-in-out 0.3s'}}></div>}
        </div></div>
      </div>
      </div>
    </div>
  )
}
import {useEffect,useState} from 'react';
import {of,interval,concat,Subject} from 'rxjs';
import {take,repeatWhen,filter,startWith,scan,takeWhile,repeat,retryWhen,takeUntil} from 'rxjs/operators';
import logo from './logo.svg';
import './App.css';

 const unsubscribe$ = new Subject();

  const timerSeconds$ = interval(1000).pipe(
    startWith(0),
    takeUntil(unsubscribe$)
    );


const App = (props)=> {

  const [second,setSecond] = useState(0);
  const [secondWait,setSecondWait] = useState(0);

  const start = ()=>{
    timerSeconds$.subscribe(setSecond);
  }

  const stop = ()=>{
    setSecond(0);
    setSecondWait(0);
    unsubscribe$.next();
  }

  const wait = ()=>{
    setSecondWait(secondWait+second);
    setSecond(0);
    unsubscribe$.next();
  }

  const reset = ()=>{
    setSecond(0);
    setSecondWait(0);
    unsubscribe$.next();
    timerSeconds$.subscribe(setSecond);
  }


  const setTime = (time)=>{
    let timeHour = '00';
    let timeMinute = '00';
    let timeSecond = '00';
    time += secondWait;
    if(time>=3600){
      timeHour = Math.floor(time/3600);
      if(timeHour<10)timeHour='0'+timeHour;
    }
    else if(time>=60){
      timeMinute = Math.floor(time/60);
      if(timeMinute<10)timeMinute='0'+timeMinute;
    }
    timeSecond = time-timeHour*3600-timeMinute*60;
    if(timeSecond<10)timeSecond='0'+timeSecond;
    return [timeHour,timeMinute,timeSecond]
  }

  

  return (
    <div className="App">
       <div className='timer'> {setTime(second)[0]+':'+setTime(second)[1]+':'+setTime(second)[2]}</div>
       <div className='buttons'>
         <button className='start' onClick={start}>Start</button>
         <button className='stop' onClick={stop}>Stop</button>
         <button className='wait' onDoubleClick={wait}>Wait</button>
         <button className='reset' onClick={reset}>Reset</button>
       </div>
    </div>
  );
}

export default App;

"use client";
import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [play, setPlay] = useState(false);
  const [speed, setSpeed] = useState("50");
  const [displayText, setDisplayText] = useState("");
  const [noOfWords, setNoOfWord] = useState("1");

  const textArr = useMemo(() => {
    const arr = text.split(" ");
    if (noOfWords === "1") {
      return arr;
    } else {
      const tempArr: string[] = [];
      for (let index = 0; index < arr.length; index++) {
        let str = "";
        for (let i = 0; i < parseInt(noOfWords); i++) {
          if (index + i < arr.length) {
            str += arr[index + i] + " ";
          } else {
            str += arr[index];
          }
        }
        tempArr.push(str.trim());
      }
      return tempArr;
    }
  }, [text, noOfWords]);

  useEffect(() => {
    let intervalId: NodeJS.Timer;
    if (play) {
      const timeInterval = (60 * 1000) / parseInt(speed);
      let index = 0;
      if (textArr) {
        intervalId = setInterval(() => {
          setDisplayText(textArr[index]);
          if (index < textArr.length) {
            index++;
          } else {
            index = 0;
          }
        }, timeInterval);
      }
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [speed, play, text, noOfWords, textArr]);

  const handlePlay = () => {
    setPlay(!play);
  };

  return (
    <main className='flex min-h-screen items-center justify-between p-24 space-x-8'>
      <div className='flex flex-col space-y-10 grow'>
        <div className='border h-60 w-full bg-slate-300 p-5 rounded-md flex justify-center items-center font-semibold tracking-wider text-lg'>
          {displayText}
        </div>
        <div className='flex items-center justify-around'>
          <button
            className='border rounded-full p-4 border-gray-500'
            onClick={handlePlay}
          >
            {!play && (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z'
                />
              </svg>
            )}
            {play && (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15.75 5.25v13.5m-7.5-13.5v13.5'
                />
              </svg>
            )}
          </button>
          <div>
            <select onChange={(e) => setSpeed(e.target.value)}>
              <option value='50'>50</option>
              <option value='100'>100</option>
              <option value='150'>150</option>
              <option value='200'>200</option>
              <option value='250'>250</option>
              <option value='300'>300</option>
              <option value='350'>350</option>
              <option value='400'>400</option>
              <option value='450'>450</option>
              <option value='500'>500</option>
            </select>
          </div>
          <div>
            <select onChange={(e) => setNoOfWord(e.target.value)}>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
              <option value='6'>6</option>
              <option value='7'>7</option>
              <option value='8'>8</option>
              <option value='9'>9</option>
            </select>
          </div>
        </div>
      </div>
      <div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className='border h-full w-full p-4'
          cols={50}
          rows={35}
        />
      </div>
    </main>
  );
}

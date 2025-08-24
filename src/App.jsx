import { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  const passwordRef = useRef(null);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    navigator.clipboard.writeText(password);
  }, [password]);



  //password generator function...
  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm';

    if (numAllowed) {
      str += '0123456789';
    }
    if (charAllowed) {
      str += '~!@#$%^&*';
    }
    
    //iterating through string to generate password of l = length..
    for (let i = 1; i <= length; i++) {
      let ind = Math.floor(Math.random() * str.length+1);
      pass += str.charAt(ind);
    }

    setPassword(pass);
  }, [length, numAllowed, charAllowed]);


  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed, passwordGenerator]);





  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-lg rounded-lg px-6 py-8 my-20 text-gray-100 bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-500">
        <h1 className="text-white text-center text-3xl font-bold mb-8">
          Password Generator
        </h1>

        <div className="flex shadow-md rounded-lg overflow-hidden mb-6 bg-gray-800">
          <input
            type="text"
            className="outline-none w-full py-3 px-4 bg-gray-700 text-white placeholder-gray-400 rounded-l-lg"
            placeholder="Generated password"
            readOnly
            ref={passwordRef}
            value={password}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="outline-none bg-green-500 text-white px-4 py-3 rounded-r-lg hover:bg-green-600 transition"
          >
            Copy
          </button>
        </div>

        <div className="flex flex-col gap-y-6 text-sm">
          <div className="flex items-center gap-x-4">
            <input
              type="range"
              className="cursor-pointer w-full accent-purple-500"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              min="4"
              max="20"
            />
            <label className="text-white font-medium">Length: {length}</label>
          </div>

          <div className="flex items-center gap-x-3">
            <input
              type="checkbox"
              defaultChecked={numAllowed}
              id="numberInput"
              onChange={() => {
                setNumAllowed((numAllowed) => !numAllowed);
              }}
              className="cursor-pointer accent-green-500"
            />
            <label htmlFor="numberInput" className="text-white font-medium">
              Include Numbers
            </label>
          </div>

          <div className="flex items-center gap-x-3">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={() => {
                setCharAllowed((charAllowed) => !charAllowed);
              }}
              className="cursor-pointer accent-pink-500"
            />
            <label htmlFor="charInput" className="text-white font-medium">
              Include Special Characters
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

import { useEffect, useState, useRef } from 'react';
import MarkTickIcon from './assets/tick.svg';
import './App.scss';

function App() {
  const [data, setData] = useState(() => {
    return JSON.parse(localStorage.getItem('data')) || [];
  });
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.value = '';
    localStorage.setItem('data', JSON.stringify(data));
  }, [data]);

  const hancleClick = () => {
    const newData = [
      ...data,
      { value: inputRef.current.value, checked: false },
    ];
    setData(newData);
  };

  const handleDelete = (index) => {
    const newItem = [...data];
    newItem.splice(index, 1);
    setData(newItem);
  };

  const handleDone = (index) => {
    const markDone = [...data];
    markDone[index].checked = !markDone[index].checked;
    setData(markDone);
  };

  return (
    <div className="App">
      <div className="input__wrapper">
        <input type="text" ref={inputRef} />
        <button onClick={hancleClick}>Save</button>
      </div>
      <div>
        {data.map((item, index) => {
          return (
            <div
              key={item.value}
              className={item.checked ? 'markdone' : 'content__wrapper'}>
              <img
                onClick={() => handleDone(index)}
                src={MarkTickIcon}
                alt="Mark tick"
              />
              <p>{item.value}</p>
              <button type="submit" onClick={() => handleDelete(index)}>
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;

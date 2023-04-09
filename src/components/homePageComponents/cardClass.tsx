import React, { useState, useEffect, useRef } from 'react';
import './home.css';
import { ICardHero } from '../../interface';
import { Items } from '../homePageComponents/items';
import { ModalWindow } from '../homePageComponents/modalWindow';
import { LoadData } from '../homePageComponents/loadMassage';

export const SearchCard = () => {
  function setDefaultValue() {
    const userInput = localStorage.getItem('inputValue');
    return userInput ? userInput : '';
  }
  function setDefaultSearchParam() {
    const userInput = localStorage.getItem('inputValue');
    return userInput ? `name=${userInput}` : 'page=1';
  }
  const [inputValue, setinputValue] = useState(setDefaultValue());
  const [chartersData, setChartersData] = useState([] as ICardHero[]);
  const [searchValue, setSearchValue] = useState(setDefaultSearchParam());
  const [errorRequest, setErrorRequest] = useState(false);
  const [isActiv, setIsActive] = useState(false);
  const [charterInfo, setCharterInfo] = useState({} as ICardHero);

  const inputValueRef = useRef<string>();

  const search = (event: React.FormEvent) => {
    event.preventDefault();
    setSearchValue(`name=${inputValue}`);
    localStorage.setItem('inputValue', inputValueRef.current as string);
  };

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setinputValue(event.currentTarget.value);
  };

  useEffect(() => {
    inputValueRef.current = inputValue;
  }, [inputValue]);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/?${searchValue}`)
      .then((response) => response.json())
      .then((data) => {
        setChartersData([...data.results]);
        setErrorRequest(false);
      })
      .catch(() => {
        setErrorRequest(true);
        localStorage.setItem('inputValue', '');
      });
  }, [searchValue]);

  return (
    <main className="home_page">
      {chartersData.length !== 0 ? (
        <div className="home_page_wrapper">
          <form className="wrapper_searchBar">
            <input
              className="input_search"
              type="text"
              placeholder="Search card..."
              onChange={handleChange}
              value={inputValue}
            />
            <button className="search_button" onClick={search} type="submit">
              Go Search
            </button>
          </form>
          {errorRequest && <div className="incorrectValue">Nothing found.</div>}

          <Items
            charters={chartersData}
            setIsActive={setIsActive}
            setCharterInfo={setCharterInfo}
          />
          {charterInfo && (
            <ModalWindow setIsActive={setIsActive} isActiv={isActiv} charterInfo={charterInfo} />
          )}
        </div>
      ) : (
        <LoadData />
      )}
    </main>
  );
};
export default SearchCard;

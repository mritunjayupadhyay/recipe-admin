import React, { useState, useEffect, useRef } from "react";
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import Button from "../button/Button";
import './dropdown.scss';

function DropdownComponent({title, list, onClickFunc}) {
    const [open, setOpen] = useState(false);
    const onClick = (listItem) => {
        setOpen(!open);
        onClickFunc(listItem);
    }
    function useClickOutside(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setOpen(false);
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            }
        }, [ref])
    }
    const wrapperRef = useRef(null);
    const renderList = () => {
        if (!open) {
            return null;
          }
          return list.map((listItem, index) => {
            
            const buttonType = listItem.toLowerCase() === 'delete' ? 'danger' : 'primary';
            return (
            //   <button key={index} className={'dropdownListItem'} onClick={() => onClick(listItem)}>
            //     <span>{listItem}</span>
            //   </button>
            <div className="dropdown-item-container" key={listItem}>
                <Button
                    buttonText={listItem}
                    size="small"
                    buttonType={buttonType}
                    onClickFunc={() => onClick(listItem)}
                />
            </div>
            
            );
          });
    }
    useClickOutside(wrapperRef);
    return (
        <div ref={wrapperRef} className={'dropdownContainer'}>
        <div className={'dropdownTitle'} onClick={() => setOpen(!open)}>
          <span className="dropdownText">{title}</span>
          {open ? <MdArrowDropUp size={16}/> : <MdArrowDropDown size={16}/>}
        </div>
        <div className={'dropdownList'}>
          {renderList()}
        </div>
      </div>
    );
}

export default DropdownComponent;
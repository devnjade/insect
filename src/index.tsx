import * as React from "react";
import useInsect from "./hooks";
import "./styles.scss";
import { InsectProps } from "./types";

export const Insect = ({
  name,
  type = "text",
  options,
  prefixIcon,
  suffixIcon,
  dropdownIcon,
  checkmarkIcon,
  label,
  placeholder = "Input or select an option",
  onChange,
  onBlur,
  onFocus,
  allowMultiple,
  className,
  inputWrapperClass,
  inputClass,
  labelClass,
  iconsClass,
  dropdownClass,
  checkerClass,
  rows,
}: InsectProps) => {

  const {
    iosDevice,
    showSearch,
    filteredDropdown,
    containerRef,
    showDD,
    inputValue,
    textareaRef,
    searchRef,
    inputRef,
    ddRef,
    selected,
    setShowDD,
    handleSearch,
    formatFilterText,
    isSelected,
    totalSelected
  } = useInsect();

  return (
    <div className={`insect test ${className}`}>
      {!!label && (
        <label
          data-iosdevice={iosDevice}
          className={`insect_label ${labelClass}`}
          htmlFor={name}
        >
          {label}
        </label>
      )}

      <div
        ref={containerRef}
        className={`insect_wrapper ${inputWrapperClass}`}
        data-type={type}
        data-icon={prefixIcon ? "prefix" : "suffix"}
        data-focused={type === "select" ? showDD : null}
        onClick={() => {
          type === "select" && !showSearch && setShowDD(!showDD);
        }}
      >
        {!!prefixIcon && (
          <figure className={`insect_icon ${iconsClass}`}>
            {typeof prefixIcon === "string" ? (
              <img className="insect_image" src={prefixIcon} />
            ) : (
              prefixIcon
            )}
          </figure>
        )}

        {type === "textarea" ? (
          <textarea
            name={name}
            rows={rows}
            placeholder={placeholder}
            className={`insect_input ${inputClass}`}
            onBlur={onBlur}
            onFocus={onFocus}
            value={inputValue}
            onChange={onChange || (() => null)}
            ref={textareaRef}
            autoComplete={"true"}
            data-iosdevice={iosDevice}
          ></textarea>
        ) : showSearch ? (
          <input
            className={`insect_input ${inputClass}`}
            value={formatFilterText()}
            onChange={handleSearch}
            ref={searchRef}
            data-search
            data-iosdevice={iosDevice}
          />
        ) : (
          <input
            name={name}
            className={`insect_input ${inputClass}`}
            type={type}
            placeholder={placeholder}
            onChange={onChange || (() => null)}
            onBlur={onBlur}
            onFocus={onFocus}
            value={inputValue}
            ref={inputRef}
            autoComplete={type === "select" ? "off" : "true"}
            data-iosdevice={iosDevice}
          />
        )}

        {!!suffixIcon && (
          <figure className={`insect_icon ${iconsClass}`}>
            {typeof suffixIcon === "string" ? (
              <img className="insect_image" src={suffixIcon} />
            ) : (
              suffixIcon
            )}
          </figure>
        )}

        {type === "select" && (
          <figure
            className={`insect_icon ${iconsClass}`}
            data-icon-type="caret"
          >
            {!dropdownIcon ? (
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="#000000"
                xmlns="http://www.w3.org/2000/svg"
                className="insect_svg"
              >
                <path
                  d="M5.88822 11.207L11.4742 16.793C11.8652 17.184 12.4982 17.184 12.8882 16.793L18.4742 11.207C19.1042 10.577 18.6582 9.5 17.7672 9.5H6.59522C5.70422 9.5 5.25822 10.577 5.88822 11.207Z"
                  fill=""
                />
              </svg>
            ) : dropdownIcon && typeof dropdownIcon === "string" ? (
              <img className="insect_image" src={dropdownIcon} />
            ) : (
              dropdownIcon
            )}
          </figure>
        )}

        {type === "select" && (
          <div
            ref={ddRef}
            data-open={showDD}
            className={`insect_dd ${dropdownClass}`}
            onClick={(e) => !!allowMultiple && e.stopPropagation()}
          >
            <ul className="insect_dd-menu">
              {(!options ||
                options.length === 0 ||
                filteredDropdown?.length === 0) && (
                <li className="insect_dd-item" data-empty>
                  <svg
                    width="35px"
                    height="35px"
                    viewBox="0 0 256 256"
                    id="Flat"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="#e0e0e0"
                      d="M108,116a8,8,0,1,1-8-8A7.99993,7.99993,0,0,1,108,116Zm48-8a8,8,0,1,0,8,8A7.99993,7.99993,0,0,0,156,108Zm64,12v96a4.00007,4.00007,0,0,1-6.5332,3.0957L186.667,197.168,159.86621,219.0957a4.00069,4.00069,0,0,1-5.06641,0L128,197.168,101.2002,219.0957a4.00069,4.00069,0,0,1-5.06641,0L69.333,197.168,42.5332,219.0957A4,4,0,0,1,36,216V120a92,92,0,0,1,184,0Zm-8,0a84,84,0,0,0-168,0v87.55908L66.7998,188.9043a4.00069,4.00069,0,0,1,5.06641,0L98.667,210.832,125.4668,188.9043a4.00025,4.00025,0,0,1,5.0664,0L157.333,210.832l26.80078-21.92773a4.00069,4.00069,0,0,1,5.06641,0L212,207.55908Z"
                    />
                  </svg>
                  No Items
                </li>
              )}

              {filteredDropdown?.map(({ title, value }, index) => (
                <li
                  key={index}
                  className="insect_dd-item"
                  onClick={() => handleSelect(title, value)}
                  data-disabled={
                    !isSelected(title) && totalSelected() === allowMultiple
                  }
                >
                  {title}

                  {selected === title && (
                    <figure className={`insect_dd-item_icon ${checkerClass}`}>
                      {!checkmarkIcon ? (
                        <svg
                          width="33"
                          height="33"
                          viewBox="0 0 33 33"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="insect_svg"
                        >
                          <path
                            d="M29.8049 16.4994C29.8049 23.8327 23.8049 29.8327 16.4715 29.8327C9.13818 29.8327 3.13818 23.8327 3.13818 16.4994C3.13818 9.16608 9.13818 3.16608 16.4715 3.16608C23.8049 3.16608 29.8049 9.16608 29.8049 16.4994Z"
                            fill="#C8E6C9"
                          />
                          <path
                            d="M9.80469 16.5002L14.4714 21.1669L24.4714 11.1669"
                            stroke="#4CAF50"
                            strokeWidth="1.95162"
                          />
                        </svg>
                      ) : checkmarkIcon && typeof checkmarkIcon === "string" ? (
                        <img className="insect_image" src={checkmarkIcon} />
                      ) : (
                        checkmarkIcon
                      )}
                    </figure>
                  )}

                  {isSelected(title) && (
                    <figure className={`insect_dd-item_icon ${checkerClass}`}>
                      {checkmarkIcon === undefined ? (
                        <svg
                          width="33"
                          height="33"
                          viewBox="0 0 33 33"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="insect_svg"
                        >
                          <path
                            d="M29.8049 16.4994C29.8049 23.8327 23.8049 29.8327 16.4715 29.8327C9.13818 29.8327 3.13818 23.8327 3.13818 16.4994C3.13818 9.16608 9.13818 3.16608 16.4715 3.16608C23.8049 3.16608 29.8049 9.16608 29.8049 16.4994Z"
                            fill="#C8E6C9"
                          />
                          <path
                            d="M9.80469 16.5002L14.4714 21.1669L24.4714 11.1669"
                            stroke="#4CAF50"
                            strokeWidth="1.95162"
                          />
                        </svg>
                      ) : checkmarkIcon && typeof checkmarkIcon === "string" ? (
                        <img className="insect_image" src={checkmarkIcon} />
                      ) : (
                        checkmarkIcon
                      )}
                    </figure>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Insect;

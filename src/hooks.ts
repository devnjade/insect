import * as React from "react";
import {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
  useRef,
} from "react";
import { InsectProps } from "./types";

// const useInsect = ({
//   name,
//   type = "text",
//   value,
//   options,
//   defaultOption,
//   onSelect,
//   closeOnBlur = true,
//   allowMultiple,
//   search,
// }: InsectProps) => {

const useInsect = (types :InsectProps) => {
  const name = types.name;
  const type = types.type || "text";
  const value = types.value;
  const options = types.options;
  const defaultOption = types.defaultOption;
  const onSelect = types.onSelect;
  const closeOnBlur = types.closeOnBlur || true;
  const allowMultiple = types.allowMultiple || false;
  const search = types.search || false;

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const ddRef = useRef<HTMLDivElement>(null);
  const [iosDevice, setIosDevice] = useState<boolean>(false);
  const [showDD, setShowDD] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>("");
  const [selecteds, setSelecteds] = useState<string[]>([]);
  const [selectedsValue, setSelectedsValue] = useState<string[]>([]);
  const [filter, setFilter] = useState<string>("");

  const searchCondiionOne = !allowMultiple && search && showDD;
  const searchConditionTwo =
    search && showDD && allowMultiple && selecteds.length < allowMultiple;
  const showSearch = searchCondiionOne || searchConditionTwo;

  const inputValue =
    type === "select" && allowMultiple
      ? selecteds?.filter((item) => item !== null).join(", ")
      : type === "select"
      ? selected
      : value
      ? value
      : "";

  const filteredDropdown = options?.filter((option) =>
    option.title.toLowerCase().includes(filter.toLowerCase())
  );

  const handleSelect = (title: string, value: string) => {
    if (!onSelect) {
      return;
    }

    // reset filter
    setFilter("");

    // set or unset single value if multiple is off
    if (!allowMultiple) {
      // update state and return value to parent
      selected === name
        ? [onSelect(null, name), setSelected("")]
        : [onSelect(value, name), setSelected(title)];
    }

    if (!!allowMultiple) {
      // check if selected item is already present
      const isPresent = selecteds?.find((item) => item === title);
      const spaceAvailable = selecteds?.length < allowMultiple;

      if (isPresent) {
        const newOptions = selecteds.filter((option) => option !== title);
        const newValues = selectedsValue.filter((option) => option !== value);

        setSelecteds(newOptions);
        setSelectedsValue(newValues);
      } else if (spaceAvailable) {
        const previousOptions = [...selecteds];
        const previousValues = [...selectedsValue];

        previousOptions.push(title);
        previousValues.push(value);

        setSelecteds(previousOptions);
        setSelectedsValue(previousValues);
      }
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    const strippedValue = value.split(", ");
    setFilter(strippedValue[strippedValue.length - 1]);
  };

  const formatFilterText = () => {
    // const allSelectedValues = flattenObj(selectedsValue);
    const selectedItemsPresent = selecteds?.length > 0;
    const previousItemsPresent = !!selected || selectedItemsPresent;

    if (previousItemsPresent && allowMultiple) {
      return `${inputValue}, ${filter}`;
    } else {
      return filter;
    }
  };

  const isSelected = (title: string) => {
    return selecteds.includes(title);
  };

  const totalSelected = useCallback(() => {
    return selecteds.length;
  }, [selectedsValue]);

  useEffect(() => {
    if (onSelect && allowMultiple && selectedsValue.length !== 0) {
      onSelect(selectedsValue, name);
    }
  }, [selectedsValue]);

  useEffect(() => {
    const handleClick = (e: any) => {
      if (!showDD) {
        return;
      } else if (showDD && !!closeOnBlur) {
        let shouldClose = true;
        const target = e.target;
        const componentList = [
          containerRef.current,
          inputRef.current,
          textareaRef.current,
          searchRef.current,
        ];

        componentList.forEach((item) => {
          target === item ? (shouldClose = false) : null;
        });

        shouldClose && setShowDD(false);
      }
    };

    window.addEventListener("click", handleClick);

    return () => window.removeEventListener("click", handleClick);
  }, [showDD]);

  useLayoutEffect(() => {
    const dd = ddRef.current;

    const setPosition = (): void => {
      const { height } = dd?.getBoundingClientRect() || {};

      if (dd && height) {
        dd.style.bottom = `${-height - 6}px`;
      }
    };

    setPosition();
    window.addEventListener("resize", setPosition);

    return () => window.removeEventListener("resize", setPosition);
  }, [showDD, filter]);

  useEffect(() => {
    // get device type in order to set input field size
    const isIOS: boolean = [
      "iPad Simulator",
      "iPhone Simulator",
      "iPod Simulator",
      "iPad",
      "iPhone",
      "iPod",
    ].includes(navigator.platform);

    const isIPAD =
      navigator.userAgent.includes("Mac") && "ontouchend" in document;

    if (isIOS || isIPAD) {
      setIosDevice(true);
    }
  }, []);

  useEffect(() => {
    const shouldUpdate =
      defaultOption && selected === "" && selecteds.length === 0;

    if (shouldUpdate) {
      handleSelect(defaultOption.title, defaultOption.value);
    }
  }, [defaultOption]);

  return {
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
    totalSelected,
    handleSelect,
  }
}

export default useInsect;
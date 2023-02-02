import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import useMeasure from "react-use-measure";

function App() {
  const [ref, bounds] = useMeasure();
  const [isOpen, setIsOpen] = React.useState(false);

  const [inputFocused, setInputFocused] = React.useState("none");
  const [card, setCard] = React.useState({
    card_number: "",
    full_name: "",
    expiry_MM: "",
    expiry_YY: "",
    cvv: "",
  });
  const [groups, setGroups] = React.useState(["####", "####", "####", "####"]);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let years = [];

  for (let i = 0; i < 10; i++) {
    years.push(new Date().getFullYear() + i);
  }

  React.useEffect(() => {
    console.log(inputFocused);
    // focus the input
    const input = document.querySelector(`#${inputFocused}`);
    if (input) {
      (input as HTMLInputElement).focus();
    }
  }, [inputFocused]);

  const openCardEditor = () => {
    setIsOpen(true);
    setTimeout(() => {
      setInputFocused((prev) => (prev === "none" ? "card_number" : "none"));
    }, 500);
  };

  const closeCardEditor = () => {
    setIsOpen(false);
    setTimeout(() => {
      setInputFocused((prev) => (prev === "none" ? "card_number" : "none"));
    }, 500);
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // remove all non-digit characters from the value
    let card_number = value.replace(/\D/g, "");
    card_number.length > 16 && (card_number = card_number.slice(0, 16));
    // split the card number into groups of 4
    let groups = [];
    for (let i = 0; i < 4; i++) {
      groups.push(card_number.slice(i * 4, (i + 1) * 4));
      if (groups[i].length < 4) {
        groups[i] += "#".repeat(4 - groups[i].length);
      }
    }

    console.log(groups);
    setGroups(groups);
    setCard((prev) => ({ ...prev, card_number }));
  };

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // remove all digit characters from the value, and limit the length to 20
    // remove special characters
    let full_name = value.replace(/\d/g, "").replace(/[^a-zA-Z ]/g, "");
    setCard((prev) => ({
      ...prev,
      full_name: full_name ? full_name.slice(0, 30) : "",
    }));
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // remove all non-digit characters from the value
    let cvv = value.replace(/\D/g, "");
    cvv.length > 3 && (cvv = cvv.slice(0, 3));
    setCard((prev) => ({ ...prev, cvv }));
  };

  const handleExpiryMMChange = (e: any) => {
    // get the value from sleect element
    const value = e.target.value;
    setCard((prev) => ({
      ...prev,
      expiry_MM: value,
    }));
  };

  const handleExpiryYYChange = (e: any) => {
    // get the value from sleect element
    const value = e.target.value;
    setCard((prev) => ({ ...prev, expiry_YY: value }));
  };

  return (
    <div className="bg-slate-800 min-h-screen flex flex-col justify-center items-center">
      <div className="my-16 relative w-full">
        {/* card section */}
        <motion.div
          tabIndex={0}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          whileFocus={{ scale: 1.05 }}
          onKeyPress={(e) => {
            // if press enter or space, open the card editor
            if (e.key === "Enter" || e.key === " ") {
              isOpen ? closeCardEditor() : openCardEditor();
            }
          }}
          onClick={() => {
            isOpen ? closeCardEditor() : openCardEditor();
          }}
          className="relative w-96 h-56 mx-auto bg-red-100 rounded-xl text-white shadow-2xl hover:cursor-pointer hover:shadow-3xl"
        >
          {/* <img
            className="relative object-cover w-full h-full rounded-xl"
            src="https://i.imgur.com/kGkSg1v.png"
          /> */}
          <img
            className="relative object-cover w-full h-full rounded-xl pointer-events-none touch-none"
            src="https://i.imgur.com/Zi6v09P.png"
            alt="bg"
          />

          <div className="w-full px-8 absolute top-8 pointer-events-none touch-none">
            <div className="flex justify-between items-center">
              <img
                src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/chip.png"
                alt="Smart card"
                className="w-12 h-10"
              />
              <img
                className="w-14 h-14"
                src="https://i.imgur.com/bbPHJVe.png"
                alt="mastercard"
              />
            </div>
            <div
              className={
                // (inputFocused === "card_number"
                //   ? " border-2 "
                //   : " border-2 border-transparent ") +
                "p-1 w-full flex justify-between rounded-sm"
              }
            >
              {inputFocused === "card_number" ? (
                <motion.div
                  layoutId="bordered"
                  className={`absolute border-2 w-[320px] -m-[6px] h-[38px]`}
                ></motion.div>
              ) : null}
              {
                // card number, split into groups of 4 and map them. Add # if length is less than 16
                groups.map((group, index1) => (
                  <p className="font-medium text-xl tracking-widest overflow-hidden">
                    {group.split("").map((char: any, index2: number) => (
                      <AnimatePresence exitBeforeEnter>
                        <motion.p
                          className="inline-block w-4 h-6"
                          key={index2 + index1 + char}
                          initial={{
                            y: -20,
                            opacity: 0,
                          }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: 20, opacity: 0 }}
                          transition={{
                            duration: 0.15,
                            delay:
                              (index2 + (1 + index1) * (1 + index1)) * 0.01,
                          }}
                        >
                          {char}
                        </motion.p>
                      </AnimatePresence>
                    ))}
                  </p>
                ))
              }
            </div>
            <div className="pt-6">
              <div className="flex justify-between">
                <div
                  // ref={refFullName}
                  className={
                    // (inputFocused === "full_name"
                    //   ? " border-2 "
                    //   : " border-2 border-transparent ") +
                    "basis-6/12 p-1 rounded-sm relative"
                  }
                >
                  {inputFocused === "full_name" ? (
                    <motion.div
                      layoutId="bordered"
                      className={`absolute border-2 w-[160px] -m-[6px] h-[64px]`}
                    ></motion.div>
                  ) : null}
                  <p className="font-light text-xs">Owner</p>
                  <p className="font-medium tracking-widest text-sm">
                    {card.full_name || "FULL NAME"}
                  </p>
                </div>
                <div
                  className={
                    // (inputFocused === "expiry_MM" ||
                    // inputFocused === "expiry_YY"
                    //   ? " border-2 "
                    //   : " border-2 border-transparent ") +
                    "basis-2/12 p-1 rounded-sm text-left h-12"
                  }
                >
                  {inputFocused === "expiry_MM" ||
                  inputFocused === "expiry_YY" ? (
                    <motion.div
                      layoutId="bordered"
                      className="absolute border-2 h-12 -m-[6px] w-[61px]"
                    ></motion.div>
                  ) : null}
                  <p className="font-light text-xs ">Expiry</p>
                  <p className="font-medium tracking-wider text-sm">
                    {card.expiry_MM
                      ? (
                          months.findIndex((m) => m === card.expiry_MM) + 1
                        ).toString().length === 1
                        ? "0" +
                          (months.findIndex((m) => m === card.expiry_MM) + 1)
                        : months.findIndex((m) => m === card.expiry_MM) + 1
                      : "MM"}
                    /{card.expiry_YY ? card.expiry_YY.slice(-2) : "YY"}
                  </p>
                </div>

                <div
                  className={
                    // (inputFocused === "cvv"
                    //   ? " border-2 "
                    //   : " border-2 border-transparent ") +
                    "basis-2/12 p-1 rounded-sm text-center h-12 relative"
                  }
                >
                  {inputFocused === "cvv" ? (
                    <motion.div
                      layoutId="bordered"
                      className="absolute border-2 h-12 -m-[6px] w-[53px]"
                    ></motion.div>
                  ) : null}
                  <p className="font-light text-xs">CVV</p>
                  <p className="font-bold tracking-more-wider text-sm">
                    {card.cvv ? card.cvv : "***"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* form section */}
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                className="-mt-32 mx-auto overflow-hidden sm:rounded-md w-full md:w-8/12 lg:w-5/12"
                initial={{ height: 0, width: 0 }}
                animate={{ height: bounds.height, width: "100%" }}
                exit={{
                  height: 0,
                  width: 0,
                  transition: {
                    duration: 0.4,
                    height: { duration: 0.3 },
                    width: { duration: 0.1, delay: 0.3 },
                  },
                }}
                transition={{ duration: 0.5 }}
              >
                <div
                  ref={ref}
                  className="overflow-hidden shadow sm:rounded-md w-full md:w-8/12 lg:w-5/12 mx-auto"
                >
                  <div className="bg-white px-4 py-5 sm:p-6">
                    <div className="pt-32 flex flex-col gap-4">
                      <div className="col-span-6 sm:col-span-6">
                        <label
                          htmlFor="card_number"
                          className="block text-xs font-medium text-gray-700"
                        >
                          Card numbers
                        </label>
                        <input
                          onFocus={() => {
                            setInputFocused("card_number");
                          }}
                          onChange={(e) => {
                            handleCardNumberChange(e);
                          }}
                          value={card.card_number}
                          type="text"
                          name="card_number"
                          id="card_number"
                          autoComplete="card_number"
                          className="mt-1 p-2 block w-full rounded-sm border-2 border-gray-200 sm:text-sm focus:border-gray-500 focus:outline-none focus:shadow-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-6">
                        <label
                          htmlFor="full_name"
                          className="block text-xs font-medium text-gray-700"
                        >
                          Full name
                        </label>
                        <input
                          onFocus={() => {
                            setInputFocused("full_name");
                          }}
                          onChange={(e) => {
                            handleFullNameChange(e);
                          }}
                          value={card.full_name}
                          type="text"
                          name="full_name"
                          id="full_name"
                          autoComplete="full_name"
                          className="mt-1 p-2 block w-full rounded-sm border-2 border-gray-200 sm:text-sm focus:border-gray-500 focus:outline-none focus:shadow-md"
                        />
                      </div>
                      <div className="basis-full flex flex-col sm:flex-row justify-between gap-2 sm:gap-6">
                        <div className="basis-4/12 relative ">
                          <label
                            htmlFor="expiry_MM"
                            className="block text-xs font-medium text-gray-700"
                          >
                            Expiration date
                          </label>
                          <select
                            onFocus={() => {
                              setInputFocused("expiry_MM");
                            }}
                            onChange={handleExpiryMMChange}
                            value={card.expiry_MM}
                            name="expiry_MM"
                            id="expiry_MM"
                            autoComplete="expiry_MM"
                            className="mt-1 p-2 block w-full rounded-sm border-2 border-gray-200 sm:text-sm focus:border-gray-500 focus:outline-none focus:shadow-md"
                          >
                            <option>Month</option>
                            {months.map((month, index) => {
                              return (
                                <option key={index} value={month}>
                                  {month}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        <div className="basis-4/12">
                          <label
                            htmlFor="expiry_YY"
                            className="block h-4 text-xs font-medium text-gray-700"
                          ></label>
                          <select
                            onFocus={() => {
                              setInputFocused("expiry_YY");
                            }}
                            onChange={handleExpiryYYChange}
                            value={card.expiry_YY}
                            name="expiry_YY"
                            id="expiry_YY"
                            autoComplete="expiry_YY"
                            className="mt-1 p-2 block w-full rounded-sm border-2 border-gray-200 sm:text-sm focus:border-gray-500 focus:outline-none focus:shadow-md"
                          >
                            <option>Year</option>
                            {years.map((year, index) => {
                              return (
                                <option key={index} value={year}>
                                  {year}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        <div className="basis-4/12">
                          <label
                            htmlFor="cvv"
                            className="block text-xs font-medium text-gray-700"
                          >
                            CVV
                          </label>
                          <input
                            onFocus={() => {
                              setInputFocused("cvv");
                            }}
                            onChange={(e) => {
                              handleCvvChange(e);
                            }}
                            value={card.cvv}
                            type="text"
                            name="cvv"
                            id="cvv"
                            autoComplete="cvv"
                            className="mt-1 p-2 block w-full rounded-sm border-2 border-gray-200 sm:text-sm focus:border-gray-500 focus:outline-none focus:shadow-md"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 text-right sm:px-6 flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => {
                        closeCardEditor();
                      }}
                      className="w-full inline-flex justify-center rounded-md border border-transparent bg-gray-300 py-2 px-4 text-sm font-medium text-gray-400 shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        closeCardEditor();
                      }}
                      className="w-full inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Save Card
                    </button>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ height: 128, opacity: 0 }}
                animate={{ height: 0 }}
                exit={{ height: 128, transition: { duration: 0.1 } }}
                transition={{ duration: 1 }}
              ></motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-col gap-4 m-32 p-16 text-white">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quae
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quae
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quae
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quae
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quae
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quae
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quae
        </p>
      </div>
    </div>
  );
}

export default App;

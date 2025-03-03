import { useState, useMemo } from "react";
import TipButton from "./UI/TipButton";

export default function Card() {
  const [selectedTip, setSelectedTip] = useState(null);
  const [bill, setBill] = useState("");
  const [people, setPeople] = useState("");
  const [customTip, setCustomTip] = useState("");
  const [errors, setErrors] = useState({ bill: "", people: "", customTip: "" });

  const billValue = parseFloat(bill) || 0;
  const peopleCount = parseInt(people) || 0;
  const tipPercentage = selectedTip ?? (parseFloat(customTip) || 0);

  // Função para validar os inputs
  const validateInput = (name, value) => {
    if (value === "") return "";
    if (value.includes("-")) return "Can't be a negative number";
    if (parseFloat(value) === 0) return "Can't be zero";
    if (isNaN(value)) return "Must be a valid number";
    return "";
  };

  // Cálculo otimizado usando useMemo para evitar re-renderizações desnecessárias
  const { tipAmount, totalPerPerson } = useMemo(() => {
    if (
      errors.bill ||
      errors.people ||
      errors.customTip ||
      billValue <= 0 ||
      peopleCount <= 0
    ) {
      return { tipAmount: 0, totalPerPerson: 0 };
    }

    const tipValue = (billValue * tipPercentage) / 100;
    const total = billValue + tipValue;
    return {
      tipAmount: tipValue / peopleCount,
      totalPerPerson: total / peopleCount,
    };
  }, [billValue, peopleCount, tipPercentage, errors]);

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    if (field === "bill") setBill(value);
    if (field === "people") setPeople(value);
    if (field === "customTip") {
      setCustomTip(value);
      setSelectedTip(null); // Desmarca os botões ao digitar no custom
    }
    setErrors((prev) => ({ ...prev, [field]: validateInput(field, value) }));
  };

  const handleTipSelect = (tip) => {
    setSelectedTip(tip);
    setCustomTip("");
    setErrors((prev) => ({ ...prev, customTip: "" }));
  };

  const handleReset = () => {
    setBill("");
    setPeople("");
    setSelectedTip(null);
    setCustomTip("");
    setErrors({ bill: "", people: "", customTip: "" });
  };

  const isResetDisabled =
    bill === "" &&
    people === "" &&
    selectedTip === null &&
    customTip === "" &&
    tipAmount === 0 &&
    totalPerPerson === 0;

  const tipOptions = [5, 10, 15, 25, 50];
  return (
    <>
      <div
        className={` rounded-t-[1.25rem] p-[2rem] sm:w-[500px] sm:mx-auto sm:rounded-[1.25rem] lg:rounded-[25px] lg:flex lg:w-[920px] lg:w-gap-[3rem] gap-[3rem] 
           bg-white
        `}
      >
        <div className="lg:w-[45.80%] lg:mt-[13px]">
          <label htmlFor="bill" className="block mb-[0.375rem]">
            Bill
          </label>
          {errors.bill && <span className="text-[#E17457]">{errors.bill}</span>}
          <input
            onChange={(e) => handleInputChange(e, "bill")}
            type="text"
            id="bill"
            value={bill}
            placeholder={0}
            className={`w-full text-right bg-[hsl(189,41%,97%)] bg-[url(/icon-dollar.svg)] bg-no-repeat px-[1rem] py-[0.4rem] bg-[1rem] rounded-[8px] text-[1.5rem] text-[hsl(183,100%,15%)] mb-[2rem] ${
              errors.bill === ""
                ? "outline-[hsl(172,67%,45%)]"
                : "outline-[#E17457] border-2 border-[#E17457]"
            }`}
          />
          <p className="mb-[1rem]">Selecet Tip %</p>
          <div className="grid grid-cols-2 grid-rows-3 gap-[1rem] lg:grid-cols-3 lg:grid-rows-2 ">
            {tipOptions.map((tip) => (
              <TipButton
                key={tip}
                value={tip}
                onClick={handleTipSelect}
                isSelected={selectedTip === tip}
              />
            ))}

            <input
              onChange={(e) => handleInputChange(e, "customTip")}
              value={customTip}
              type="text"
              placeholder="Custom"
              className={`bg-[hsl(189,41%,97%)] text-[hsl(183,100%,15%)] text-right pr-4 text-2xl placeholder-[hsl(186,14%,43%)] ${
                errors.customTip === ""
                  ? "outline-[hsl(172,67%,45%)]"
                  : "outline-[#E17457] border-2 border-[#E17457]"
              } rounded-lg`}
            />
          </div>
          {errors.customTip && (
            <span className="mt-1.5 right block text-[#E17457]">
              {errors.customTip}
            </span>
          )}
          <label htmlFor="numPeople" className="block mb-[0.375rem] mt-8">
            Number of People
          </label>
          {errors.people && (
            <span className="text-[#E17457] mb-[0.375rem] block">
              {errors.people}
            </span>
          )}
          <input
            onChange={(e) => handleInputChange(e, "people")}
            type="text"
            value={people}
            id="numPeople"
            placeholder={0}
            className={`w-full text-right bg-[hsl(189,41%,97%)] bg-[url(/icon-person.svg)] bg-no-repeat px-[1rem] py-[0.4rem] bg-[1rem] rounded-[8px] text-[1.5rem] text-[hsl(183,100%,15%)] mb-[2rem] ${
              errors.people === ""
                ? "outline-[hsl(172,67%,45%)]"
                : "outline-[#E17457] border-2 border-[#E17457]"
            } `}
          />
        </div>
        <div className="bg-[hsl(183,100%,15%)] text-white p-6 rounded-lg lg:w-[50%] lg:rounded-[15px] lg:flex lg:flex-col lg:justify-between lg:flex-1 lg:p-[2.5rem]">
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm">Tip Amount</p>
                <p className="text-gray-400 text-xs">/ person</p>
              </div>
              <p className="text-3xl font-bold text-[hsl(172,67%,45%)] lg:text-[3rem]">
                ${tipAmount.toFixed(2)}
              </p>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm">Total</p>
                <p className="text-gray-400 text-xs">/ person</p>
              </div>
              <p className="text-3xl font-bold text-[hsl(172,67%,45%)] lg:text-[3rem]">
                ${totalPerPerson.toFixed(2)}
              </p>
            </div>
          </div>

          {
            <button
              disabled={isResetDisabled}
              onClick={handleReset}
              className={`w-full py-2 mt-6 rounded-md uppercase cursor-pointer transition-colors text-[20px]
              ${
                isResetDisabled
                  ? "bg-[#0D686D] text-[hsl(183,100%,15%)] cursor-not-allowed"
                  : "bg-[hsl(172,67%,45%)] text-green-900 hover:bg-[#9FE8DF]"
              }`}
            >
              Reset
            </button>
          }
        </div>
      </div>
    </>
  );
}

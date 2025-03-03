import PropTypes from "prop-types";

export default function TipButton({ value, onClick, isSelected }) {
  return (
    <button
      className={`px-4 py-2 rounded-lg font-bold text-2xl cursor-pointer
        ${
          isSelected
            ? "bg-[hsl(172,67%,45%)] text-[hsl(183,100%,15%)]"
            : "bg-[hsl(183,100%,15%)] text-white"
        } 
        hover:bg-[#9FE8DF] hover:text-[hsl(183,100%,15%)] transition`}
      onClick={() => onClick(value)}
    >
      {value}%
    </button>
  );
}

TipButton.propTypes = {
  value: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

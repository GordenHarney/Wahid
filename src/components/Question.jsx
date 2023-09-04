import { useState } from "react";

const Question = ({ question, onAnswer, goBack, notFirst, disabled }) => {
  const [selectedOption, setSelectedOption] = useState(question.answer[0]);

  const handleSubmit = () => {
    onAnswer(selectedOption);
  };

  return (
    <div>
      <div className={"chat chat-start"}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img src="https://www.siteminder.com/wp-content/uploads/2020/07/08SMMK_changing-traveller-report_resource-centre-tile_thailand.jpg" />
          </div>
        </div>
        <div className="chat-header">TravelBot</div>
        <div className="chat-bubble">
          <div className="p-2">{question.question}</div>
          <select
            disabled={disabled}
            className="select select-bordered w-full max-w-xs mb-2 text-black"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            {question.answer.map((option, index) => (
              <option key={index}>{option}</option>
            ))}
          </select>
          {!disabled && (
            <>
              {notFirst && (
                <button
                  onClick={goBack}
                  className="w-auto bg-gray-500 text-white rounded-r-lg px-5 text-sm"
                >
                  Back
                </button>
              )}
              <button
                onClick={handleSubmit}
                className="w-auto bg-gray-500 text-white rounded-r-lg px-5 text-sm"
              >
                Submit
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Question;

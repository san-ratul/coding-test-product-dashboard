import {MouseEvent} from "react";

interface IUserFeedbackType {
    handleOnClick: (e: MouseEvent<HTMLButtonElement>) => void
}

const feedbackOptions: {id: string, iconClass: string, iconText:string}[] = [
    {
        id: "feedback-very-satisfied",
        iconClass: "material-symbols-outlined",
        iconText: "sentiment_very_satisfied"
    },
    {
        id: "feedback-satisfied",
        iconClass: "material-symbols-outlined",
        iconText: "sentiment_satisfied"
    },
    {
        id: "feedback-dissatisfied",
        iconClass: "material-symbols-outlined",
        iconText: "sentiment_dissatisfied"
    },
    {
        id: "feedback-very-dissatisfied",
        iconClass: "material-symbols-outlined",
        iconText: "sentiment_very_dissatisfied"
    }
]

export const UserFeedback = ({handleOnClick}: IUserFeedbackType) => {
    const handleRadioChange = (optionId: string) => {
        // Get the label associated with the optionId
        const label = document.querySelector(`label[for="${optionId}"]`) as HTMLLabelElement;

        // Get all elements with the class 'feedback-label'
        const feedbackLabels = document.querySelectorAll('.feedback-label');

        // Loop through the feedback labels and remove the specified class
        feedbackLabels.forEach((label) => {
            label.classList.remove('text-zinc-950');
        });

        // Get the radio input element
        const radioInput = document.getElementById(optionId) as HTMLInputElement;

        if (radioInput?.checked) {
            // Apply a Tailwind CSS class for the checked state
            label.classList.add('text-zinc-950'); // Change to your desired color class
        }
    }

    return (
        <div>
            <div className="p-4">
                <textarea
                    name="feedback"
                    id="feedback-message"
                    className="w-full border-2 border-zinc-200 rounded-lg p-2 resize-none focus:border-zinc-400 focus:outline-0"
                    placeholder="Ideas to improve this page..."
                    rows={5}
                />
            </div>
            <div className="bg-zinc-50 p-4 border-t-2 border-gray-200">
                <div className="flex justify-between align-middle">
                    <div className="flex gap-2 justify-center align-middle">
                        {
                            feedbackOptions.map((option, index) => {
                                return (
                                    <label
                                        key={index}
                                        htmlFor={option.id}
                                        className="feedback-label cursor-pointer text-zinc-500"
                                    >
                                        <span className={`${option.iconClass} text-3xl`}>{option.iconText}</span>
                                        <input
                                            className="hidden"
                                            type="radio"
                                            name="feedback"
                                            id={option.id}
                                            onChange={() => handleRadioChange(option.id)}
                                        />
                                    </label>
                                )
                            })
                        }
                    </div>
                    <button
                        type="button"
                        className="bg-zinc-950 text-white py-2 px-4 rounded-lg"
                        onClick={handleOnClick}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    )
}
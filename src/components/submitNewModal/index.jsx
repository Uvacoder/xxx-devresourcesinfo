import { eventAvailable } from "@/data/commonData";
import React, { useState } from "react";
import { addNewEvent } from "@/services/api/mutationApi";
import { getCurrentDate } from "@/utils/utils";

const SubmitNewModal = ({ setShowForm }) => {
  const [formData, setFormData] = useState({
    eventType: "Conference",
    name: "",
    url: "",
    startDate: "",
    messageToModerator: "",
  });

  const handleApiCall = async (obj) => {
    const response = await addNewEvent(obj);
  };

  const submitHandler = () => {
    if (
      formData?.eventType === "Conference" ||
      formData?.eventType === "Hackathon"
    ) {
      if (
        formData?.name &&
        formData?.url &&
        formData?.startDate &&
        formData?.messageToModerator
      ) {
        setShowForm(false);
        handleApiCall(formData);
      }
    } else {
      if (formData?.name && formData?.url && formData?.messageToModerator) {
        console.log({ formData });
        setShowForm(false);
        handleApiCall(formData);
      }
    }
  };

  const cancelHandler = () => {
    setShowForm(false);
    setFormData({
      eventType: "Conference",
      name: "",
      url: "",
      startDate: "",
      messageToModerator: "",
    });
  };

  const currentDate = getCurrentDate();

  return (
    <div className="fixed w-screen h-screen left-0 top-0 bg-[#2a29681f] backdrop-blur-sm">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-black backdrop-blur-none p-4 lg:p-6 lg:px-8 rounded-md w-[300px] lg:w-[430px] shadow">
        <h3 className="font-bold text-center text-[20px] lg:text-[24px]">
          Add new {formData?.eventType.toLowerCase()}
        </h3>

        <p className="flex text-[11px] lg:text-[12px] py-2 lg:mb-3 text-center text-gray-600">
          We value and acknowledge your contribution! The event will undergo a
          manual review before publication.
        </p>
        <form
          className="text-[12px] lg:text-[14px]"
          onSubmit={(e) => e.preventDefault()}
        >
          <label htmlFor="eventType" className="block font-medium mb-[6px]">
            Event type
          </label>
          <select
            id="eventType"
            className="p-2 w-full border border-gray-300 rounded-md mb-2 lg:mb-3 accent-primary-end"
            value={formData?.eventType}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, eventType: e.target.value }))
            }
            required
          >
            {eventAvailable?.map(({ id, name }) => (
              <option key={id} value={name}>
                {name}
              </option>
            ))}
          </select>

          <label htmlFor="name" className="block font-medium mb-[6px]">
            Event name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter event name"
            value={formData?.name}
            className="p-2 w-full border border-gray-300 rounded-md accent-primary-end mb-2 lg:mb-3"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            required
          />

          {(formData?.eventType === "Conference" ||
            formData?.eventType === "Hackathon") && (
            <>
              <label htmlFor="date" className="block font-medium mb-[6px]">
                Date
              </label>
              <input
                type="date"
                id="date"
                min={currentDate}
                value={formData?.startDate}
                className="p-2 w-full border border-gray-300 rounded-md accent-primary-end mb-2 lg:mb-3"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    startDate: e.target.value,
                  }))
                }
                required
              />
            </>
          )}

          <label htmlFor="websiteUrl" className="block font-medium mb-[6px]">
            Event URL
          </label>
          <input
            type="url"
            id="websiteUrl"
            placeholder="Enter event link"
            value={formData?.url}
            className="p-2 w-full border border-gray-300 rounded-md accent-primary-end mb-2 lg:mb-3"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, url: e.target.value }))
            }
            required
          />

          <label htmlFor="moderatorMsg" className="block font-medium mb-[6px]">
            Message to Moderator
          </label>
          <textarea
            id="moderatorMsg"
            rows="2"
            value={formData?.messageToModerator}
            placeholder="Enter your message to moderator"
            className="p-2 w-full border border-gray-300 rounded-md accent-primary-end mb-2 lg:mb-3"
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                messageToModerator: e.target.value,
              }))
            }
            required
          ></textarea>

          <div className="flex justify-end gap-3">
            <button
              className="py-[6px] px-5 text-primary-end font-medium text-[14px] bg-indigos-op-100 hover:bg-indigos-op-200 hover:border-gray-700 rounded-[40px]"
              onClick={cancelHandler}
            >
              Cancel
            </button>
            <button
              className="py-[6px] px-5 text-[14px] text-white font-medium bg-primary-end rounded-[40px] opacity-80 hover:opacity-95"
              onClick={submitHandler}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitNewModal;
